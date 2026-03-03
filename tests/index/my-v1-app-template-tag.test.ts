import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../fixtures/my-v1-app-template-tag/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v1-app-template-tag.js';

test('index > my-v1-app-template-tag', async function () {
  loadFixture(inputProject, codemodOptions);

  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // TODO: Guarantee idempotence
  // await runCodemod(codemodOptions);

  // assertFixture(outputProject, codemodOptions);
});
