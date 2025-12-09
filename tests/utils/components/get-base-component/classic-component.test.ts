import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > classic component', function () {
  let file = `import Component from '@ember/component';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'Component',
    importPath: '@ember/component',
  });

  file = `import Foo from '@ember/component';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'Foo',
    importPath: '@ember/component',
  });
});
