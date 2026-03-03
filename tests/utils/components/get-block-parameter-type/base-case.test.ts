import { assert, test } from '@codemod-utils/tests';

import { getBlockParameterType } from '../../../../src/utils/components/index.js';

test('utils | components | get-block-parameter-type > base case', function () {
  assert.strictEqual(getBlockParameterType('BooleanLiteral'), 'boolean');
  assert.strictEqual(getBlockParameterType('NullLiteral'), 'null');
  assert.strictEqual(getBlockParameterType('NumberLiteral'), 'number');
  assert.strictEqual(getBlockParameterType('PathExpression'), 'unknown');
  assert.strictEqual(getBlockParameterType('StringLiteral'), 'string');
  assert.strictEqual(getBlockParameterType('SubExpression'), 'unknown');
  assert.strictEqual(getBlockParameterType('UndefinedLiteral'), 'undefined');
});
