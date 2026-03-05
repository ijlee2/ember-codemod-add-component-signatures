import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { convertToTypeScript } from '../../../src/steps/index.js';
import type { Options } from '../../../src/types/index.js';

test('steps | convert-to-typescript > base case', function () {
  const inputProject = {
    app: {
      components: {
        'example-2': {
          'subexample-1.gjs': '',
          'subexample-2.gts': '',
          'subexample-3.js': '',
          'subexample-4.ts': '',
        },
        'example-1.hbs': '',
        'example-2.d.ts': '',
        'example-2.hbs': '',
        'example-2.js': '',
        'example-3.hbs': '',
        'example-3.ts': '',
        'example-4.gjs': '',
        'example-5.gts': '',
      },
    },
  };

  const outputProject = {
    app: {
      components: {
        'example-2': {
          'subexample-1.gts': '',
          'subexample-2.gts': '',
          'subexample-3.ts': '',
          'subexample-4.ts': '',
        },
        'example-1.hbs': '',
        'example-2.d.ts': '',
        'example-2.hbs': '',
        'example-2.ts': '',
        'example-3.hbs': '',
        'example-3.ts': '',
        'example-4.gts': '',
        'example-5.gts': '',
      },
    },
  };

  const projectRoot = 'tmp/my-v1-app-javascript';

  const options: Options = {
    componentStructure: 'flat',
    convertJavaScript: true,
    createRegistries: false,
    entity: undefined,
    projectRoot,
    src: 'app' as const,
  };

  loadFixture(inputProject, { projectRoot });

  convertToTypeScript(options);

  assertFixture(outputProject, { projectRoot });
});
