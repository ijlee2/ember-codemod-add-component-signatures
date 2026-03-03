import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toEcma } from '@codemod-utils/ast-template-tag';

import type {
  ComponentExtension,
  ComponentName,
  Options,
  UnfilteredComponentExtension,
} from '../../../types/index.js';
import {
  getBaseComponent,
  getClassPath,
} from '../../../utils/components/index.js';

function isSupported(file: string): boolean {
  const { importPath } = getBaseComponent(file);

  const isComponent = importPath !== undefined;
  const isClassicComponent = importPath === '@ember/component';

  return isComponent && !isClassicComponent;
}

export function task(
  componentName: ComponentName,
  extensions: Set<UnfilteredComponentExtension>,
  options: Options,
):
  | [componentName: ComponentName, extensions: Set<ComponentExtension>]
  | undefined {
  const { projectRoot } = options;

  const hasClassJavaScript = extensions.has('.gjs') || extensions.has('.js');

  if (hasClassJavaScript) {
    return undefined;
  }

  const filteredExtensions = extensions as Set<ComponentExtension>;
  const hasClassTypeScript =
    filteredExtensions.has('.gts') || filteredExtensions.has('.ts');

  // hbs file only
  if (!hasClassTypeScript) {
    return [componentName, filteredExtensions];
  }

  const filePath = getClassPath(componentName, filteredExtensions, options);
  const file = readFileSync(join(projectRoot, filePath), 'utf8');

  if (!isSupported(toEcma(file))) {
    return undefined;
  }

  return [componentName, filteredExtensions];
}
