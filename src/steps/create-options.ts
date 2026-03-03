import type { CodemodOptions, Options } from '../types/index.js';

function getSrc(
  projectType: CodemodOptions['projectType'],
): 'app' | 'addon' | 'src' {
  switch (projectType) {
    case 'app': {
      return 'app';
    }

    case 'v1-addon': {
      return 'addon';
    }

    case 'v2-addon': {
      return 'src';
    }
  }
}

export function createOptions(codemodOptions: CodemodOptions): Options {
  const { componentStructure, convertJavaScript, projectRoot, projectType } =
    codemodOptions;

  return {
    componentStructure,
    convertJavaScript,
    projectRoot,
    src: getSrc(projectType),
  };
}
