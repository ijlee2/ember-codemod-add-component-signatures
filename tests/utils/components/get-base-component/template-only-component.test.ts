import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > template-only component', function () {
  let file = `import templateOnlyComponent from '@ember/component/template-only';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'templateOnlyComponent',
    importPath: '@ember/component/template-only',
  });

  file = `import foo from '@ember/component/template-only';`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'foo',
    importPath: '@ember/component/template-only',
  });
});
