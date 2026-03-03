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

  const filteredEntries = Array.from(extensionMap.entries()).filter(
    ([componentName, extensions]) => {
      const hasClassJavaScript =
        extensions.has('.gjs') || extensions.has('.js');

      if (hasClassJavaScript) {
        return false;
      }

      const hasClassTypeScript =
        extensions.has('.gts') || extensions.has('.ts');

      // hbs file only
      if (!hasClassTypeScript) {
        return true;
      }

      const filePath = getClassPath(
        componentName,
        extensions as Set<ComponentExtension>,
        options,
      );

      const file = readFileSync(join(projectRoot, filePath), 'utf8');
      const ecmaFile = toEcma(file);

      return isSupported(ecmaFile);
    },
  );

  return new Map(filteredEntries) as unknown as ExtensionMap;
}
