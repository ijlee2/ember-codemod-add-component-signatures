import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > edge case (import is incorrect)', function () {
  const file = `import { foo } from '@glimmer/component';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: undefined,
    importPath: undefined,
  });
});
