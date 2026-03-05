import { join, sep } from 'node:path';

import { findFiles, renamePathByDirectory } from '@codemod-utils/files';

import type { Options, UnfilteredExtensionMap } from '../../types/index.js';
import { getExtensionMap } from '../../utils/components/index.js';

function normalizeComponentNames(
  extensionMap: UnfilteredExtensionMap,
): UnfilteredExtensionMap {
  return new Map(
    Array.from(extensionMap.entries()).map(([oldName, extensions]) => {
      const newName = oldName.replace(/\/index$/, '');

      return [newName, extensions];
    }),
  );
}

function normalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}

function getPattern(options: Options): string[] {
  const { entity, src } = options;

  if (entity === undefined) {
    return [`${src}/components/**/*.{gjs,gts,hbs,js,ts}`];
  }

  return [
    normalizedJoin(src, 'components', `${entity}.{gjs,gts,hbs,js,ts}`),
    normalizedJoin(src, 'components', entity, '**/*.{gjs,gts,hbs,js,ts}'),
  ];
}

export function findComponents(options: Options): UnfilteredExtensionMap {
  const { componentStructure, projectRoot, src } = options;

  const filePaths = findFiles(getPattern(options), {
    ignoreList: ['**/*.d.ts'],
    projectRoot,
  }).map((filePath) => {
    return renamePathByDirectory(filePath, {
      from: `${src}/components`,
      to: '',
    });
  });

  const extensionMap = getExtensionMap(filePaths);

  if (componentStructure === 'nested') {
    return normalizeComponentNames(extensionMap);
  }

  return extensionMap;
}
