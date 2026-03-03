import { join } from 'node:path';

import type {
  ComponentExtension,
  ComponentName,
  Options,
} from '../../types/index.js';

export function getClassPath(
  componentName: ComponentName,
  extensions: Set<ComponentExtension>,
  options: Options,
): string {
  const { componentStructure, src } = options;

  const filePath =
    componentStructure === 'nested'
      ? join(src, 'components', componentName, 'index')
      : join(src, 'components', componentName);

  if (extensions.has('.gts')) {
    return `${filePath}.gts`;
  }

  if (extensions.has('.ts')) {
    return `${filePath}.ts`;
  }

  // hbs file only. The blueprint for template-only component is in `*.ts`.
  return `${filePath}.ts`;
}
