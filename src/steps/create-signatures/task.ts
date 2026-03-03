import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { updateJavaScript } from '@codemod-utils/ast-template-tag';
import { pascalize } from '@codemod-utils/ember';
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
import { createSignature } from '../../utils/create-signatures/index.js';

export function task(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): void {
  const { projectRoot } = options;

  const filePath = getClassPath(componentName, extensions, options);
  let file = readFileSync(join(projectRoot, filePath), 'utf8');

  const data = {
    entity: {
      pascalizedName: pascalize(componentName),
    },
  };

  try {
    if (extensions.has('.gts')) {
      file = updateJavaScript(file, (code) => {
        return createSignature(code, data);
      });
    } else {
      file = createSignature(file, data);
    }

    const fileMap = new Map<FilePath, FileContent>([[filePath, file]]);

    createFiles(fileMap, options);
  } catch (error) {
    let message = `WARNING: createSignatures could not update \`${filePath}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(message);
  }
}
