import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { findTemplateTags, toEcma } from '@codemod-utils/ast-template-tag';

import type {
  ComponentExtension,
  ComponentName,
  Options,
  Signature,
} from '../../../types/index.js';
import {
  findArguments,
  findBlocks,
  findElement,
} from '../../../utils/analyze-project/index.js';
import {
  getClassPath,
  getTemplatePath,
} from '../../../utils/components/index.js';

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

export function task(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): [componentName: ComponentName, signature: Signature] | undefined {
  const hasTemplate = extensions.has('.hbs') || extensions.has('.gts');
  const signature: Signature = {
    Args: undefined,
    Blocks: undefined,
    Element: undefined,
  };

  if (!hasTemplate) {
    return [componentName, signature];
  }

  const { classFile, templateFile } = getFiles(
    componentName,
    extensions,
    options,
  );

  try {
    signature.Args = findArguments(templateFile, classFile);
    signature.Blocks = findBlocks(templateFile);
    signature.Element = findElement(templateFile);

    return [componentName, signature];
  } catch (error) {
    let message = `WARNING: analyzeComponents could not parse \`${componentName}\`. Please update the file manually.`;

    if (error instanceof Error) {
      message += ` (${error.message})`;
    }

    console.warn(message);

    return undefined;
  }
}
