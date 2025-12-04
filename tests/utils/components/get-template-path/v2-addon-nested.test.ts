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
    projectRoot: normalize('tmp/my-v2-addon'),
    src: 'src/components',
  };

  return getTemplatePath(componentName, extensions, options);
}

test('utils | components | get-template-path > v2 addon (nested)', function () {
  assert.strictEqual(
    getPath('index'),
    normalize('src/components/index/index.hbs'),
  );

  assert.strictEqual(
    getPath('navigation-menu'),
    normalize('src/components/navigation-menu/index.hbs'),
  );

  assert.strictEqual(
    getPath('widgets/widget-3'),
    normalize('src/components/widgets/widget-3/index.hbs'),
  );
});
