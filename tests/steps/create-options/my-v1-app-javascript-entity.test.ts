import { assert, loadFixture, test } from '@codemod-utils/tests';

import { createOptions } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-app-javascript-entity/index.js';
import {
  codemodOptions,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-javascript-entity.js';

test('steps | create-options > my-v1-app-javascript-entity', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(createOptions(codemodOptions), options);
});
