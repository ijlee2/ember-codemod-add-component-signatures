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

export function runCodemod(codemodOptions: CodemodOptions): void {
  const options = createOptions(codemodOptions);

  if (options.convertJavaScript) {
    convertToTypeScript(options);
  }

  const context = analyzeProject(options);

  createTemplateOnlyComponents(context, options);
  createSignatures(context, options);

  if (options.createRegistries) {
    createRegistries(context, options);
  }

  updateSignatures(context, options);
}
