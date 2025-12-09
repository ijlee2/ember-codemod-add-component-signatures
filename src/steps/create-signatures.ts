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
import { createSignature } from './create-signatures/index.js';

export function createSignatures(context: Context, options: Options): void {
  const { extensionMap } = context;
  const { projectRoot } = options;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [componentName, extensions] of extensionMap) {
    const filePath = getClassPath(componentName, extensions, options);

    const data = {
      entity: {
        pascalizedName: pascalize(componentName),
      },
    };

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');

      if (extensions.has('.gts')) {
        file = updateJavaScript(file, (code) => {
          return createSignature(code, data);
        });
      } else {
        file = createSignature(file, data);
      }

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createSignatures could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(message);
    }
  }

  createFiles(fileMap, options);
}
