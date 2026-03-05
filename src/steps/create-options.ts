import { getPackageType, readPackageJson } from '@codemod-utils/package-json';

import type { CodemodOptions, Options } from '../types/index.js';
import { SOURCE_DIRECTORY } from '../utils/ember.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const {
    componentStructure,
    convertJavaScript,
    createRegistries,
    entity,
    projectRoot,
  } = codemodOptions;

  const packageJson = readPackageJson({ projectRoot });
  const packageType = getPackageType(packageJson);

  if (packageType === 'node') {
    throw new Error('Ember package not found');
  }

  const src = SOURCE_DIRECTORY[packageType];

  return {
    componentStructure,
    convertJavaScript,
    createRegistries,
    entity,
    projectRoot,
    src,
  };
}
