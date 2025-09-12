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
    projectRoot: 'tmp/my-v1-addon',
    src: 'addon/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > v1 addon (nested)', function () {
  assert.strictEqual(getPath('index'), 'addon/components/index/index.ts');

  assert.strictEqual(
    getPath('navigation-menu'),
    'addon/components/navigation-menu/index.ts',
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    'addon/components/widgets/widget-3/index.ts',
  );
});
