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
  projectRoot: 'tmp/my-v1-app-javascript',
  projectType: 'app',
};

const context: Context = {
  extensionMap: new Map<ComponentName, Set<ComponentExtension>>([
    ['products/product/card', new Set(['.gts'])],
    ['products/product/details', new Set(['.gts'])],
    ['products/product/image', new Set(['.gts'])],
    ['tracks', new Set(['.hbs'])],
    ['tracks/list', new Set(['.hbs', '.ts'])],
    ['tracks/table', new Set(['.hbs', '.ts'])],
  ]),
  signatureMap: new Map([
    [
      'products/product/card',
      {
        Args: ['product', 'redirectTo'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'products/product/details',
      {
        Args: ['product'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'products/product/image',
      {
        Args: ['src'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'tracks',
      {
        Args: ['tracks'],
        Blocks: undefined,
        Element: ['HTMLElement'],
      },
    ],
    [
      'tracks/list',
      {
        Args: ['numColumns', 'tracks'],
        Blocks: undefined,
        Element: ['HTMLUListElement'],
      },
    ],
    [
      'tracks/table',
      {
        Args: ['tracks'],
        Blocks: undefined,
        Element: ['HTMLTableElement'],
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: true,
  projectRoot: 'tmp/my-v1-app-javascript',
  src: 'app/components',
};

export { codemodOptions, context, options };
