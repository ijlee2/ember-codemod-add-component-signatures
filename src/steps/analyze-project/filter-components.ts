import { readFileSync } from 'node:fs';
import { join } from 'node:path';

import { toEcma } from '@codemod-utils/ast-template-tag';

import type {
  ComponentExtension,
  ExtensionMap,
  Options,
  UnfilteredExtensionMap,
} from '../../types/index.js';
import {
  getBaseComponent,
  getClassPath,
} from '../../utils/components/index.js';

function isSupported(file: string): boolean {
  const { importPath } = getBaseComponent(file);

  const isComponent = importPath !== undefined;
  const isClassicComponent = importPath === '@ember/component';

  return isComponent && !isClassicComponent;
}

export function filterComponents(
  extensionMap: UnfilteredExtensionMap,
  options: Options,
): ExtensionMap {
  const { projectRoot } = options;

  const newExtensionMap: ExtensionMap = new Map();

  for (const [componentName, extensions] of extensionMap) {
    const hasClassJavaScript = extensions.has('.gjs') || extensions.has('.js');

    if (hasClassJavaScript) {
      continue;
    }

    const filteredExtensions = extensions as Set<ComponentExtension>;
    const hasClassTypeScript =
      filteredExtensions.has('.gts') || filteredExtensions.has('.ts');

    // hbs file only
    if (!hasClassTypeScript) {
      newExtensionMap.set(componentName, filteredExtensions);

      continue;
    }

    const filePath = getClassPath(componentName, filteredExtensions, options);
    const file = readFileSync(join(projectRoot, filePath), 'utf8');

    if (isSupported(toEcma(file))) {
      newExtensionMap.set(componentName, filteredExtensions);
    }
  }

  return newExtensionMap;
}
