import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createSignatures } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-backing-class.js';

test('steps | create-signatures > has-backing-class', async function () {
  const inputProject = convertFixtureToJson(
    'steps/create-signatures/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-signatures/has-backing-class/output',
  );

  loadFixture(inputProject, codemodOptions);

  await createSignatures(context, options);

  assertFixture(outputProject, codemodOptions);
});
