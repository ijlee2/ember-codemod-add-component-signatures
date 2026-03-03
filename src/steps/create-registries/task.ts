import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toEcma, updateJavaScript } from '@codemod-utils/ast-template-tag';
import { doubleColonize, pascalize } from '@codemod-utils/ember';
import {
  createFiles,
  type FileContent,
  type FilePath,
} from '@codemod-utils/files';

import type {
  ComponentExtension,
  ComponentName,
  Options,
} from '../../types/index.js';
import { getClassPath } from '../../utils/components/index.js';
import {
  createRegistry,
  hasRegistry,
  renameComponent,
} from '../../utils/create-registries/index.js';

export function task(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): void {
  const { projectRoot } = options;

  const filePath = getClassPath(componentName, extensions, options);
  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  try {
    const ecmaFile = toEcma(file);

    if (hasRegistry(ecmaFile)) {
      return;
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

    const fileMap = new Map<FilePath, FileContent>([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    let message = `WARNING: createRegistries could not update \`${filePath}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(message);
  }
}
