import { convertFixtureToJson } from '@codemod-utils/tests';

const inputProject = convertFixtureToJson('my-v1-app-javascript-entity/input');
const outputProject = convertFixtureToJson('my-v1-app-javascript-entity/output');

export { inputProject, outputProject };
