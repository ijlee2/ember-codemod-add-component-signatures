import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import { getExtensionMap } from '../../../../src/utils/components.js';

test('utils | components | get-extension-map > base case', function () {
  const filePaths = [
    'navigation-menu.css',
    'navigation-menu.hbs',
    'navigation-menu.ts',
    'ui/form/information.css',
    'ui/form/information.hbs',
    'widgets/widget-5.hbs',
  ].map(normalize);

  assert.deepStrictEqual(
    getExtensionMap(filePaths),
    new Map([
      ['navigation-menu', new Set(['.css', '.hbs', '.ts'])],
      ['ui/form/information', new Set(['.css', '.hbs'])],
      ['widgets/widget-5', new Set(['.hbs'])],
    ]),
  );
});
