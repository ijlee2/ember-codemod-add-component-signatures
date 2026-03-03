import {
  analyzeProject,
  convertToTypeScript,
  createOptions,
  createRegistries,
  createSignatures,
  createTemplateOnlyComponents,
  updateSignatures,
} from './steps/index.js';
import type { CodemodOptions } from './types/index.js';

export async function runCodemod(
  codemodOptions: CodemodOptions,
): Promise<void> {
  const options = createOptions(codemodOptions);

  if (options.convertJavaScript) {
    convertToTypeScript(options);
  }

  const context = await analyzeProject(options);

  createTemplateOnlyComponents(context, options);
  await createSignatures(context, options);

  if (options.createRegistries) {
    await createRegistries(context, options);
  }

  await updateSignatures(context, options);
}
