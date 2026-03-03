import { assert, test } from '@codemod-utils/tests';

import { getHtmlInterface } from '../../../../src/utils/components/index.js';

test('utils | components | get-html-interface > edge case (element tag is unknown)', function () {
  assert.strictEqual(getHtmlInterface('address'), 'HTMLElement');
  assert.strictEqual(getHtmlInterface('datalist'), 'HTMLElement');
  assert.strictEqual(getHtmlInterface('menu'), 'HTMLElement');
});
