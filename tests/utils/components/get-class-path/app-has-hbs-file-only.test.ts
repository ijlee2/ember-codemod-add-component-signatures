import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getClassPath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs']);

  const options: Options = {
    componentStructure: 'flat',
    convertJavaScript: false,
    projectRoot: 'tmp/my-v1-app',
    src: 'app/components',
  };

  return getClassPath(componentName, extensions, options);
}

test('utils | components | get-class-path > app (has-hbs-file-only)', function () {
  assert.strictEqual(getPath('index'), normalize('app/components/index.ts'));

  assert.strictEqual(
    getPath('navigation-menu'),
    normalize('app/components/navigation-menu.ts'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalize('app/components/widgets/widget-3.ts'),
  );
});
