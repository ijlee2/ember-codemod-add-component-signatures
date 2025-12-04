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
    componentStructure: 'nested',
    convertJavaScript: false,
    projectRoot: normalizeFilePath('tmp/my-v2-addon'),
    src: 'src/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > v2 addon (nested)', function () {
  assert.strictEqual(
    getPath('index'),
    normalizeFilePath('src/components/index/index.ts'),
  );

  assert.strictEqual(
    getPath('navigation-menu'),
    normalizeFilePath('src/components/navigation-menu/index.ts'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalizeFilePath('src/components/widgets/widget-3/index.ts'),
  );
});
