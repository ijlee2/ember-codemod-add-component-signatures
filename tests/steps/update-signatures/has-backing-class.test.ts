import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { updateSignatures } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-backing-class.js';

test('steps | update-signatures > has-backing-class', async function () {
  const inputProject = convertFixtureToJson(
    'steps/update-signatures/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-signatures/has-backing-class/output',
  );

  loadFixture(inputProject, codemodOptions);

  await updateSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
