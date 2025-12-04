import { normalizeFilePath } from '@codemod-utils/files';
import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getClassPath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs', '.ts']);

  const options: Options = {
    componentStructure: 'flat',
    convertJavaScript: false,
    projectRoot: normalizeFilePath('tmp/my-v1-addon'),
    src: 'addon/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > v1 addon (flat)', function () {
  assert.strictEqual(
    getPath('index'),
    normalizeFilePath('addon/components/index.ts'),
  );

  assert.strictEqual(
    getPath('navigation-menu'),
    normalizeFilePath('addon/components/navigation-menu.ts'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalizeFilePath('addon/components/widgets/widget-3.ts'),
  );
});
