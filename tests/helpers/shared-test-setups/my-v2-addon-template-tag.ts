import type {
  CodemodOptions,
  Context,
  Options,
} from '../../../src/types/index.js';

const codemodOptions: CodemodOptions = {
  componentStructure: 'flat',
  projectRoot: 'tmp/my-v2-addon-template-tag',
  projectType: 'v2-addon',
};

const context: Context = {
  // @ts-expect-error: Not implemented yet
  extensionMap: new Map([
    ['navigation-menu', new Set(['.gts'])],
    ['ui/form', new Set(['.gts'])],
    ['ui/form/checkbox', new Set(['.gts'])],
    ['ui/form/field', new Set(['.gts'])],
    ['ui/form/information', new Set(['.gts'])],
    ['ui/form/input', new Set(['.gts'])],
    ['ui/form/number', new Set(['.gts'])],
    ['ui/form/select', new Set(['.gts'])],
    ['ui/form/textarea', new Set(['.gts'])],
    ['ui/page', new Set(['.gts'])],
  ]),
  signatureMap: new Map([
    [
      'navigation-menu',
      {
        Args: ['menuItems', 'name'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form',
      {
        Args: ['data', 'instructions', 'onSubmit', 'title'],
        Blocks: new Map([['default', ['unknown']]]),
        Element: undefined,
      },
    ],
    [
      'ui/form/checkbox',
      {
        Args: [
          'data',
          'isDisabled',
          'isInline',
          'isReadOnly',
          'isRequired',
          'isWide',
          'key',
          'label',
          'onUpdate',
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
      'ui/form/information',
      {
        Args: ['formId', 'instructions', 'title'],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/input',
      {
        Args: [
          'data',
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'key',
          'label',
          'onUpdate',
          'placeholder',
          'type',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/number',
      {
        Args: [
          'data',
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'key',
          'label',
          'maxValue',
          'minValue',
          'onUpdate',
          'placeholder',
          'step',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/select',
      {
        Args: [
          'data',
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'key',
          'label',
          'onUpdate',
          'options',
        ],
        Blocks: undefined,
        Element: undefined,
      },
    ],
    [
      'ui/form/textarea',
      {
        Args: [
          'data',
          'isDisabled',
          'isReadOnly',
          'isRequired',
          'isWide',
          'key',
          'label',
          'onUpdate',
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
        Element: undefined,
      },
    ],
  ]),
};

const options: Options = {
  componentStructure: 'flat',
  projectRoot: 'tmp/my-v2-addon-template-tag',
  src: 'src/components',
};

export { codemodOptions, context, options };
