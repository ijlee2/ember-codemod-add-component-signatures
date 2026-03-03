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
} from '../../helpers/shared-test-setups/has-no-args.js';

test('steps | create-registries > has-no-args', async function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-no-args/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-no-args/output',
  );

  loadFixture(inputProject, codemodOptions);

  await createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
