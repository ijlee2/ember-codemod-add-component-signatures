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
  projectRoot: 'tmp/has-hbs-file-only',
};

const context: Context = {
  extensionMap: new Map([
    ['ui/form/information', new Set(['.hbs'])],
    ['widgets/widget-5', new Set(['.hbs'])],
  ]),
  signatureMap: new Map([
    [
      'ui/form/information',
      {
        Args: ['formId', 'instructions', 'title'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-5',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: false,
  createRegistries: false,
  entity: undefined,
  projectRoot: 'tmp/has-hbs-file-only',
  src: 'app' as const,
};

export { codemodOptions, context, options };
