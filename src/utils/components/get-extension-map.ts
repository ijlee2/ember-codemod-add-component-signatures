import { join, sep } from 'node:path';

import { parseFilePath } from '@codemod-utils/files';

import type {
  UnfilteredComponentExtension,
  UnfilteredExtensionMap,
} from '../../types/index.js';

export function getExtensionMap(filePaths: string[]): UnfilteredExtensionMap {
  const extensionMap: UnfilteredExtensionMap = new Map();

  filePaths.forEach((filePath) => {
    const { dir, ext, name } = parseFilePath(filePath) as {
      dir: string;
      ext: UnfilteredComponentExtension;
      name: string;
    };

    const componentName = join(dir, name).replaceAll(sep, '/');

    if (extensionMap.has(componentName)) {
      extensionMap.get(componentName)!.add(ext);

      return;
    }

    extensionMap.set(componentName, new Set([ext]));
  });

  return extensionMap;
}
