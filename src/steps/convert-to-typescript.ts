import { join, sep } from 'node:path';

import { findFiles, moveFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';

function normalizedJoin(...folders: string[]): string {
  return join(...folders).replaceAll(sep, '/');
}

function getPattern(options: Options): string[] {
  const { entity, src } = options;

  if (entity === undefined) {
    return [`${src}/components/**/*.{gjs,js}`];
  }

  return [
    normalizedJoin(src, 'components', `${entity}.{gjs,js}`),
    normalizedJoin(src, 'components', entity, '**/*.{gjs,js}'),
  ];
}

export function convertToTypeScript(options: Options): void {
  const { projectRoot } = options;

  const filePaths = findFiles(getPattern(options), {
    projectRoot,
  });

  const filePathMap = filePaths.reduce((accumulator, filePath) => {
    if (filePath.endsWith('.gjs')) {
      accumulator.set(filePath, filePath.replace(/\.gjs$/, '.gts'));
    } else {
      accumulator.set(filePath, filePath.replace(/\.js$/, '.ts'));
    }

    return accumulator;
  }, new Map<string, string>());

  moveFiles(filePathMap, {
    projectRoot,
  });
}
