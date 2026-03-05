import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-app-javascript-entity/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-javascript-entity.js';

test('steps | analyze-project > my-v1-app-javascript-entity', async function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(await analyzeProject(options), context);
});
