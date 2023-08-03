import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-backing-class',
  src: 'app/components',
};

const context: Context = {
  extensionMap: new Map([
    ['navigation-menu', new Set(['.hbs', '.ts'])],
    ['products/product/card', new Set(['.hbs', '.ts'])],
    ['products/product/image', new Set(['.hbs', '.ts'])],
    ['tracks/list', new Set(['.hbs', '.ts'])],
    ['ui/form', new Set(['.hbs', '.ts'])],
    ['ui/form/checkbox', new Set(['.hbs', '.ts'])],
    ['ui/form/field', new Set(['.hbs', '.ts'])],
    ['ui/form/input', new Set(['.hbs', '.ts'])],
    ['ui/form/textarea', new Set(['.hbs', '.ts'])],
    ['ui/page', new Set(['.hbs', '.ts'])],
    ['widgets/widget-1', new Set(['.hbs', '.ts'])],
    ['widgets/widget-2', new Set(['.hbs', '.ts'])],
    ['widgets/widget-2/captions', new Set(['.hbs', '.ts'])],
    ['widgets/widget-2/stacked-chart', new Set(['.hbs', '.ts'])],
    ['widgets/widget-3', new Set(['.hbs', '.ts'])],
    [
      'widgets/widget-3/tour-schedule/responsive-image',
      new Set(['.hbs', '.ts']),
    ],
    ['widgets/widget-4', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/actions', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/body', new Set(['.hbs', '.ts'])],
    ['widgets/widget-4/memo/header', new Set(['.hbs', '.ts'])],
  ]),
  signatureMap: new Map([
    [
      'navigation-menu',
      {
        Args: ['menuItems', 'name'],
        Blocks: undefined,
        Element: ['HTMLElement'],
      },
    ],
    [
      'products/product/card',
      {
        Args: ['product', 'redirectTo'],
        Blocks: undefined,
        Element: ['HTMLElement'],
      },
    ],
    [
      'products/product/image',
      {
        Args: ['src'],
        Blocks: undefined,
        Element: ['HTMLDivElement', 'HTMLImageElement'],
      },
    ],
    [
      'tracks/list',
      {
        Args: ['tracks'],
        Blocks: undefined,
        Element: ['HTMLUListElement'],
      },
    ],
    [
      'ui/form',
      {
        Args: ['instructions', 'title'],
        Blocks: new Map([['default', ['unknown']]]),
        Element: ['HTMLFormElement'],
      },
    ],
    [
      'ui/form/checkbox',
      {
        Args: [
          'isDisabled',
          'isInline',
          'isReadOnly',
          'isRequired',
          'isWide',
          'label',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
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
    [
      'ui/form/input',
      {
        Args: [
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'label',
          'placeholder',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/textarea',
      {
        Args: [
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'label',
          'placeholder',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/page',
      {
        Args: ['title'],
        Blocks: new Map([['default', []]]),
        Element: ['HTMLDivElement'],
      },
    ],
    [
      'widgets/widget-1',
      {
        Args: [],
        Blocks: undefined,
        Element: ['HTMLElement'],
      },
    ],
    [
      'widgets/widget-2',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-2/captions',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-2/stacked-chart',
      {
        Args: ['data'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-3',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-3/tour-schedule/responsive-image',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo',
      {
        Args: [],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/actions',
      {
        Args: ['cqFeatures'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/body',
      {
        Args: ['cqFeatures'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'widgets/widget-4/memo/header',
      {
        Args: ['cqFeatures'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/has-backing-class',
  src: 'app/components',
};

export { codemodOptions, context, options };
