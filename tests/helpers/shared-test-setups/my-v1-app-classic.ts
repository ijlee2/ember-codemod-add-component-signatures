import { normalizeFilePath } from '@codemod-utils/files';

import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: normalizeFilePath('tmp/my-v1-app-classic'),
  projectType: 'app',
};

const context: Context = {
  extensionMap: new Map(),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: normalizeFilePath('tmp/my-v1-app-classic'),
  src: 'app/components',
};

export { codemodOptions, context, options };
