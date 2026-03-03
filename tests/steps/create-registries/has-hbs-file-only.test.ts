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
} from '../../helpers/shared-test-setups/has-hbs-file-only.js';

test('steps | create-registries > has-hbs-file-only', async function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-hbs-file-only/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-hbs-file-only/output',
  );

  loadFixture(inputProject, codemodOptions);

  await createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
