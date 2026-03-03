import { assert, test } from '@codemod-utils/tests';

import { getBlockParameterType } from '../../../../src/utils/components/index.js';

test('utils | components | get-block-parameter-type > edge case (recast type is unknown)', function () {
  assert.strictEqual(getBlockParameterType('BrandNewType'), 'unknown');
});
