import { parallelize } from '@codemod-utils/threads';

import type {
  ExtensionMap,
  Options,
  UnfilteredExtensionMap,
} from '../../types/index.js';
import { task } from './filter-components/task.js';

export async function filterComponents(
  extensionMap: UnfilteredExtensionMap,
  options: Options,
): Promise<ExtensionMap> {
  const datasets: Parameters<typeof task>[] = [];

  for (const [componentName, extensions] of extensionMap) {
    datasets.push([componentName, extensions, options]);
  }

  const entries = await parallelize(task, datasets, {
    importMetaUrl: import.meta.url,
    workerFilePath: './filter-components/worker.js',
  });

  return new Map(
    entries.filter((entry) => entry !== undefined),
  ) as ExtensionMap;
}
