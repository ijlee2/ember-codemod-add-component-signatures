import { assert, loadFixture, test } from '@codemod-utils/tests';

import { analyzeProject } from '../../../src/steps/index.js';
import { inputProject } from '../../fixtures/my-v1-app-template-tag/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/my-v1-app-template-tag.js';

test('steps | analyze-project > my-v1-app-template-tag', async function () {
  loadFixture(inputProject, codemodOptions);

  assert.deepStrictEqual(await analyzeProject(options), context);
});
