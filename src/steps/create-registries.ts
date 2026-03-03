import { parallelize } from '@codemod-utils/threads';

import type { Context, Options } from '../types/index.js';
import { task } from './create-registries/task.js';

export async function createRegistries(
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
    workerFilePath: './create-registries/worker.js',
  });
}
