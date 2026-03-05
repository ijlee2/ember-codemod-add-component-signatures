import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findArguments } from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | find-arguments > template has arguments (2)', function () {
  const templateFile = normalizeFile([
    `<Hello`,
    `  @messages={{hash greeting=@greeting salutation=@salutation}}`,
    `  @user={{@user}}`,
    `/>`,
  ]);

  const classFile = '';

  assert.deepStrictEqual(findArguments(templateFile, classFile), [
    'greeting',
    'salutation',
    'user',
  ]);
});
