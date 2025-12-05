import { normalize } from 'node:path';

import { assert, test } from '@codemod-utils/tests';

import type {
  ComponentExtension,
  Options,
} from '../../../../src/types/index.js';
import { getTemplatePath } from '../../../../src/utils/components.js';

function getPath(componentName: string): string {
  const extensions = new Set<ComponentExtension>(['.hbs', '.ts']);

  const options: Options = {
    componentStructure: 'nested',
    convertJavaScript: false,
    projectRoot: 'tmp/my-v1-addon',
    src: 'addon/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-template-path > v1 addon (nested)', function () {
  assert.strictEqual(
    getPath('index'),
    normalize('addon/components/index/index.hbs'),
  );

  assert.strictEqual(
    getPath('navigation-menu'),
    normalize('addon/components/navigation-menu/index.hbs'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalize('addon/components/widgets/widget-3/index.hbs'),
  );
});
