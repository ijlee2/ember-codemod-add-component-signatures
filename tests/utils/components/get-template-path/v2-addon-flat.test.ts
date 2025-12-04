import { normalizeFilePath } from '@codemod-utils/files';
import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getTemplatePath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs', '.ts']);

  const options: Options = {
    componentStructure: 'flat',
    convertJavaScript: false,
    projectRoot: normalizeFilePath('tmp/my-v2-addon'),
    src: 'src/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-template-path > v2 addon (flat)', function () {
  assert.strictEqual(
    getPath('index'),
    normalizeFilePath('src/components/index.hbs'),
  );

  assert.strictEqual(
    getPath('navigation-menu'),
    normalizeFilePath('src/components/navigation-menu.hbs'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalizeFilePath('src/components/widgets/widget-3.hbs'),
  );
});
