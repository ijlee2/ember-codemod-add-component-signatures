import type { Context, Options } from '../types/index.js';
import {
  analyzeComponents,
  filterComponents,
  findComponents,
} from './analyze-project/index.js';

// eslint-disable-next-line @typescript-eslint/require-await
export async function analyzeProject(options: Options): Promise<Context> {
  const unfilteredExtensionMap = findComponents(options);
  const extensionMap = filterComponents(unfilteredExtensionMap, options);
  const signatureMap = analyzeComponents(extensionMap, options);

  return {
    extensionMap,
    signatureMap,
  };
}
