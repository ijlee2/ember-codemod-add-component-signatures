import { assert, test } from '@codemod-utils/tests';

import { normalizeBlockName } from '../../../../src/utils/components/index.js';

test('utils | components | normalize-block-name > edge case (else block)', function () {
  assert.strictEqual(normalizeBlockName('else'), 'else');
  assert.strictEqual(normalizeBlockName('inverse'), 'else');
});
