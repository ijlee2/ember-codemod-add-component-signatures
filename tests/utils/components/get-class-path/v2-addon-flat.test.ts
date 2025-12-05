import { normalize } from 'node:path';

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
    projectRoot: 'tmp/my-v2-addon',
    src: 'src/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > v2 addon (flat)', function () {
  assert.strictEqual(getPath('index'), normalize('src/components/index.ts'));

  assert.strictEqual(
    getPath('navigation-menu'),
    normalize('src/components/navigation-menu.ts'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalize('src/components/widgets/widget-3.ts'),
  );
});
