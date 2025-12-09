import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > edge case (file is not component class)', function () {
  const file = `import type { Foo } from 'docs-app/types';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: undefined,
    importPath: undefined,
  });
});
