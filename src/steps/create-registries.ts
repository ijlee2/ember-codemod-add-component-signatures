import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toEcma, updateJavaScript } from '@codemod-utils/ast-template-tag';
import { doubleColonize, pascalize } from '@codemod-utils/ember';
import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type { Context, Options } from '../types/index.js';
import { getClassPath } from '../utils/components.js';
import {
  createRegistry,
  hasRegistry,
  renameComponent,
} from './create-registries/index.js';

export function createRegistries(context: Context, options: Options): void {
  const { extensionMap } = context;
  const { projectRoot } = options;

  const fileMap = new Map<FilePath, FileContent>();

  for (const [componentName, extensions] of extensionMap) {
    const filePath = getClassPath(componentName, extensions, options);

    try {
      let file = readFileSync(join(projectRoot, filePath), 'utf8');
      const ecmaFile = toEcma(file);

      if (hasRegistry(ecmaFile)) {
        continue;
      }

      const data = {
        entity: {
          doubleColonizedName: doubleColonize(componentName),
          name: componentName,
          pascalizedName: pascalize(componentName),
        },
      };

      if (extensions.has('.gts')) {
        file = updateJavaScript(file, (code) => {
          code = renameComponent(code, data);
          code = createRegistry(code, data);

          return code;
        });
      } else {
        file = renameComponent(file, data);
        file = createRegistry(file, data);
      }

      fileMap.set(filePath, file);
    } catch (error) {
      let message = `WARNING: createRegistries could not update \`${filePath}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(message);
    }
  }

  createFiles(fileMap, options);
}
