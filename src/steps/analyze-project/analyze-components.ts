import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findTemplateTags, toEcma } from '@codemod-utils/ast-template-tag';

import type {
  ComponentExtension,
  ComponentName,
  ExtensionMap,
  Options,
  SignatureMap,
} from '../../types/index.js';
import { getClassPath, getTemplatePath } from '../../utils/components.js';
import {
  findArguments,
  findBlocks,
  findElement,
} from './analyze-components/index.js';

function getFiles(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): {
  classFile: string | undefined;
  templateFile: string;
} {
  const { projectRoot } = options;

  if (extensions.has('.gts')) {
    const gtsFilePath = getClassPath(componentName, extensions, options);
    const gtsFile = readFileSync(join(projectRoot, gtsFilePath), 'utf8');

    const ecmaFile = toEcma(gtsFile);
    const templateTags = findTemplateTags(gtsFile);

    const templateFile = templateTags.reduce((accumulator, templateTag) => {
      accumulator += templateTag.contents;

      return accumulator;
    }, '');

    return {
      classFile: ecmaFile,
      templateFile,
    };
  }

  let classFile: string | undefined;

  if (extensions.has('.ts')) {
    const classFilePath = getClassPath(componentName, extensions, options);
    classFile = readFileSync(join(projectRoot, classFilePath), 'utf8');
  }

  const templateFilePath = getTemplatePath(componentName, extensions, options);
  const templateFile = readFileSync(
    join(projectRoot, templateFilePath),
    'utf8',
  );

  return {
    classFile,
    templateFile,
  };
}

export function analyzeComponents(
  extensionMap: ExtensionMap,
  options: Options,
): SignatureMap {
  const signatureMap: SignatureMap = new Map();

  for (const [componentName, extensions] of extensionMap) {
    const hasTemplate = extensions.has('.hbs') || extensions.has('.gts');

    if (!hasTemplate) {
      signatureMap.set(componentName, {
        Args: undefined,
        Blocks: undefined,
        Element: undefined,
      });

      continue;
    }

    const { classFile, templateFile } = getFiles(
      componentName,
      extensions,
      options,
    );

    try {
      const Args = findArguments(templateFile, classFile);
      const Blocks = findBlocks(templateFile);
      const Element = findElement(templateFile);

      signatureMap.set(componentName, {
        Args,
        Blocks,
        Element,
      });
    } catch (error) {
      let message = `WARNING: analyzeComponents could not parse \`${componentName}\`. Please update the file manually.`;

      if (error instanceof Error) {
        message += ` (${error.message})`;
      }

      console.warn(message);
    }
  }

  return signatureMap;
}
