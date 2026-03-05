import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findArguments } from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | find-arguments > template has arguments (1)', function () {
  const templateFile = normalizeFile([
    `{{@salutation}} {{@user.name}}, {{@greeting}}`,
  ]);

  const classFile = '';

  assert.deepStrictEqual(findArguments(templateFile, classFile), [
    'greeting',
    'salutation',
    'user',
  ]);
});
