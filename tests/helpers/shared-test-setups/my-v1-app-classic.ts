import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convertJavaScript: false,
  createRegistries: false,
  entity: undefined,
  projectRoot: 'tmp/my-v1-app-classic',
};

const context: Context = {
  extensionMap: new Map(),
  signatureMap: new Map(),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: false,
  createRegistries: false,
  entity: undefined,
  projectRoot: 'tmp/my-v1-app-classic',
  src: 'app' as const,
};

export { codemodOptions, context, options };
