import { normalize } from 'node:path';

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
  projectRoot: normalize('tmp/my-v2-addon-javascript'),
  projectType: 'v2-addon',
};

const context: Context = {
  extensionMap: new Map<ComponentName, Set<ComponentExtension>>([
    ['navigation-menu', new Set(['.gts'])],
    ['ui/form', new Set(['.gts'])],
    ['ui/form/checkbox', new Set(['.hbs', '.ts'])],
    ['ui/form/field', new Set(['.hbs'])],
    ['ui/form/information', new Set(['.gts'])],
    ['ui/form/input', new Set(['.gts'])],
    ['ui/form/number', new Set(['.gts'])],
    ['ui/form/select', new Set(['.gts'])],
    ['ui/form/textarea', new Set(['.hbs', '.ts'])],
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
  convertJavaScript: true,
  projectRoot: normalize('tmp/my-v2-addon-javascript'),
  src: 'src/components',
};

export { codemodOptions, context, options };
