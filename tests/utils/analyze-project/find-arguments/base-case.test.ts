import { assert, test } from '@codemod-utils/tests';

import { findArguments } from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | find-arguments > base case', function () {
  const templateFile = '';

  const classFile = '';

  assert.deepStrictEqual(findArguments(templateFile, classFile), []);
});
