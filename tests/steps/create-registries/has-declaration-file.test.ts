import {
  assertFixture,
  convertFixtureToJson,
  loadFixture,
  test,
} from '@codemod-utils/tests';

import { createRegistries } from '../../../src/steps/index.js';
import {
  codemodOptions,
  context,
  options,
} from '../../helpers/shared-test-setups/has-declaration-file.js';

test('steps | create-registries > has-declaration-file', async function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-declaration-file/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-declaration-file/output',
  );

  loadFixture(inputProject, codemodOptions);

  await createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
