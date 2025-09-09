import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-app/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/my-v1-app.js';

test('steps | analyze-project > my-v1-app', function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(analyzeProject(options), context);
});
