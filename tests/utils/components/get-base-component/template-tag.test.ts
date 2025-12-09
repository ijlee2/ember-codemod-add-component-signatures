import { assert, test } from '@codemod-utils/tests';

import { getBaseComponent } from '../../../../src/utils/components.js';

test('utils | components | get-base-component > template tag', function () {
  const file = `import { template as template_fd9b2463e5f141cfb5666b64daa1f11a } from "@ember/template-compiler";`;

  assert.deepStrictEqual(getBaseComponent(file), {
    baseComponentName: 'template_fd9b2463e5f141cfb5666b64daa1f11a',
    importPath: '@ember/template-compiler',
  });
});
