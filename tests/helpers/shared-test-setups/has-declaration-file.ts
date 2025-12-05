import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: 'tmp/has-declaration-file',
  projectType: 'app',
};

const context: Context = {
  extensionMap: new Map([
    ['tracks', new Set(['.hbs'])],
    ['widgets/widget-3/tour-schedule', new Set(['.hbs'])],
  ]),
  signatureMap: new Map([
    [
      'tracks',
      {
        Args: ['tracks'],
        Blocks: undefined,
        Element: ['HTMLElement'],
      },
    ],
    [
      'widgets/widget-3/tour-schedule',
      {
        Args: ['concert'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: 'tmp/has-declaration-file',
  src: 'app/components',
};

export { codemodOptions, context, options };
