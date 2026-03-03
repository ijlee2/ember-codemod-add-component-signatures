import { parallelize } from '@codemod-utils/threads';

import type { Context, Options } from '../types/index.js';
import { task } from './update-signatures/task.js';

export async function updateSignatures(
  context: Context,
  options: Options,
): Promise<void> {
  const { extensionMap, signatureMap } = context;

  const datasets: Parameters<typeof task>[] = [];

  for (const [componentName, signature] of signatureMap) {
    const extensions = extensionMap.get(componentName)!;

    datasets.push([componentName, extensions, signature, options]);
  }

  await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './update-signatures/worker.js',
  });
}
