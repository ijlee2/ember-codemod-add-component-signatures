import { assertFixture, loadFixture, test } from '@codemod-utils/tests';

import { runCodemod } from '../../src/index.js';
import {
  inputProject,
  outputProject,
} from '../fixtures/my-v2-addon-javascript/index.js';
import { codemodOptions } from '../helpers/shared-test-setups/my-v2-addon-javascript.js';

test('index > my-v2-addon-javascript', async function () {
  loadFixture(inputProject, codemodOptions);

  await runCodemod(codemodOptions);

  assertFixture(outputProject, codemodOptions);

  // TODO: Guarantee idempotence
  // await runCodemod(codemodOptions);

  // assertFixture(outputProject, codemodOptions);
});
