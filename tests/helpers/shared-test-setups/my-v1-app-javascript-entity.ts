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
  entity: 'tracks',
  projectRoot: 'tmp/my-v1-app-javascript-entity',
};

const context: Context = {
  extensionMap: new Map<ComponentName, Set<ComponentExtension>>([
    ['tracks', new Set(['.hbs'])],
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
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: true,
  createRegistries: false,
  entity: 'tracks',
  projectRoot: 'tmp/my-v1-app-javascript-entity',
  src: 'app' as const,
};

export { codemodOptions, context, options };
