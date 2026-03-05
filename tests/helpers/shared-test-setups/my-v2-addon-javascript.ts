import type {
  CodemodOptions,
  ComponentExtension,
  ComponentName,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convertJavaScript: true,
  createRegistries: false,
  entity: undefined,
  projectRoot: 'tmp/my-v2-addon-javascript',
};

const context: Context = {
  extensionMap: new Map<ComponentName, Set<ComponentExtension>>([
    ['ui/form/field', new Set(['.hbs'])],
  ]),
  signatureMap: new Map([
    [
      'ui/form/field',
      {
        Args: ['errorMessage', 'isInline', 'isWide'],
        Blocks: new Map([
          ['field', ['unknown']],
          ['label', ['unknown']],
        ]),
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: true,
  createRegistries: false,
  entity: undefined,
  projectRoot: 'tmp/my-v2-addon-javascript',
  src: 'src' as const,
};

export { codemodOptions, context, options };
