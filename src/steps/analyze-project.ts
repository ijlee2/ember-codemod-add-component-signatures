import type { Context, Options } from '../types/index.js';
import {
  analyzeComponents,
  filterComponents,
  findComponents,
} from './analyze-project/index.js';

export async function analyzeProject(options: Options): Promise<Context> {
  const unfilteredExtensionMap = findComponents(options);
  const extensionMap = await filterComponents(unfilteredExtensionMap, options);
  const signatureMap = await analyzeComponents(extensionMap, options);

  return {
    extensionMap,
    signatureMap,
  };
}
