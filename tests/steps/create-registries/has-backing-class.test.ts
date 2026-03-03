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
} from '../../helpers/shared-test-setups/has-backing-class.js';

test('steps | create-registries > has-backing-class', async function () {
  const inputProject = convertFixtureToJson(
    'steps/create-registries/has-backing-class/input',
  );

  const outputProject = convertFixtureToJson(
    'steps/create-registries/has-backing-class/output',
  );

  loadFixture(inputProject, codemodOptions);

  await createRegistries(context, options);

  assertFixture(outputProject, codemodOptions);
});
