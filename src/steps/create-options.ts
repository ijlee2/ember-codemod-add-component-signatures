import type { CodemodOptions, Options } from '../types/index.js';
import { SOURCE_DIRECTORY } from '../utils/ember.js';

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, convertJavaScript, projectRoot, projectType } =
    codemodOptions;

  const src = SOURCE_DIRECTORY[projectType];

  return {
    componentStructure,
    convertJavaScript,
    projectRoot,
    src,
  };
}
