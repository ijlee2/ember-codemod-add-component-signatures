import { assert, test } from '@codemod-utils/tests';

import { getHtmlInterface } from '../../../../src/utils/components/index.js';

test('utils | components | get-html-interface > base case', function () {
  assert.strictEqual(getHtmlInterface('button'), 'HTMLButtonElement');
  assert.strictEqual(getHtmlInterface('div'), 'HTMLDivElement');
  assert.strictEqual(getHtmlInterface('input'), 'HTMLInputElement');
  assert.strictEqual(getHtmlInterface('svg'), 'SVGElement');
  assert.strictEqual(getHtmlInterface('table'), 'HTMLTableElement');
});
