import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > Glimmer component', function () {
  let file = `import Component from '@glimmer/component';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'Component',
    importPath: '@glimmer/component',
  });

  file = `import Foo from '@glimmer/component';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'Foo',
    importPath: '@glimmer/component',
  });
});
