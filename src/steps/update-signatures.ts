import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { pascalize } from '@codemod-utils/ember';
import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getClassPath } from '../utils/components.js';
import { updateSignature } from './update-signatures/index.js';

export function updateSignatures(context: Context, options: Options): void {
  const { extensionMap, signatureMap } = context;
  const { projectRoot } = options;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [componentName, signature] of signatureMap) {
    const extensions = extensionMap.get(componentName)!;
    const filePath = getClassPath(componentName, extensions, options);

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');

      const data = {
        entity: {
          pascalizedName: pascalize(componentName),
        },
        signature,
      };

      if (extensions.has('.gts')) {
        file = updateJavaScript(file, (code) => {
          return updateSignature(code, data);
        });
      } else {
        file = updateSignature(file, data);
      }

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: updateSignatures could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(message);
    }
  }

  createFiles(fileMap, options);
}
