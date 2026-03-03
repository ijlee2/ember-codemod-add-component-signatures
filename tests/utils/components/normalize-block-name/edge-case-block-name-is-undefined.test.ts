import { assert, test } from '@codemod-utils/tests';

import { normalizeBlockName } from '../../../../src/utils/components/index.js';

test('utils | components | normalize-block-name > edge case (block name is undefined)', function () {
  assert.strictEqual(normalizeBlockName(undefined), 'default');
});
