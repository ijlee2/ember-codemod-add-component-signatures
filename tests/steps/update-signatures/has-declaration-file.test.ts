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
} from '../../helpers/shared-test-setups/has-declaration-file.js';

test('steps | update-signatures > has-declaration-file', async function () {
  const inputProject = convertFixtureToJson(
    'steps/update-signatures/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-signatures/has-declaration-file/output',
  );

  loadFixture(inputProject, codemodOptions);

  await updateSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
