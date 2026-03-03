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
} from '../../helpers/shared-test-setups/has-hbs-file-only.js';

test('steps | update-signatures > has-hbs-file-only', async function () {
  const inputProject = convertFixtureToJson(
    'steps/update-signatures/has-hbs-file-only/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/update-signatures/has-hbs-file-only/output',
  );

  loadFixture(inputProject, codemodOptions);

  await updateSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
