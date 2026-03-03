import { parallelize } from '@codemod-utils/threads';

import type { ExtensionMap, Options, SignatureMap } from '../../types/index.js';
import { task } from './analyze-components/task.js';

export async function analyzeComponents(
  extensionMap: ExtensionMap,
  options: Options,
): Promise<SignatureMap> {
  const datasets: Parameters<typeof task>[] = [];

  for (const [componentName, extensions] of extensionMap) {
    datasets.push([componentName, extensions, options]);
  }

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './analyze-components/worker.js',
  });

  return new Map(
    entries.filter((entry) => entry !== undefined),
  ) as SignatureMap;
}
