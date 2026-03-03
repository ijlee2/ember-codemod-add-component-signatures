import { findFiles, moveFiles } from '@codemod-utils/files';

import type { Options } from '../types/index.js';

export function convertToTypeScript(options: Options): void {
  const { convertJavaScript, projectRoot, src } = options;

  if (!convertJavaScript) {
    return;
  }

  const filePaths = findFiles(`${src}/components/**/*.{gjs,js}`, {
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
