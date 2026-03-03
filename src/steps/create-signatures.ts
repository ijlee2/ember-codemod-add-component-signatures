import { parallelize } from '@codemod-utils/threads';

import type { Context, Options } from '../types/index.js';
import { task } from './create-signatures/task.js';

export async function createSignatures(
  context: Context,
  options: Options,
): Promise<void> {
  const { extensionMap } = context;

  const datasets: Parameters<typeof task>[] = [];

  for (const [componentName, extensions] of extensionMap) {
    datasets.push([componentName, extensions, options]);
  }

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './create-signatures/worker.js',
  });
}
