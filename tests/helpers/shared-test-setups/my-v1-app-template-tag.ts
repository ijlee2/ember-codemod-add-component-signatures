import { normalize } from 'node:path';

import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: normalize('tmp/my-v1-app-template-tag'),
  projectType: 'app',
};

const context: Context = {
  extensionMap: new Map([
    ['products/product/card', new Set(['.gts'])],
    ['products/product/details', new Set(['.gts'])],
    ['products/product/image', new Set(['.gts'])],
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
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  convertJavaScript: false,
  projectRoot: normalize('tmp/my-v1-app-template-tag'),
  src: 'app/components',
};

export { codemodOptions, context, options };
