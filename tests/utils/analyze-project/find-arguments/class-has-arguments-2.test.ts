import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findArguments } from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | find-arguments > class has arguments (2)', function () {
  const templateFile = '';

  const classFile = normalizeFile([
    `class MyComponent extends Component {`,
    `  @tracked dimensions?: Dimensions;`,
    ``,
    `  tagName = this.args.tagName ?? 'div';`,
    ``,
    `  get dataAttributePrefix(): string {`,
    `    const { dataAttributePrefix } = this.args;`,
    ``,
    `    return dataAttributePrefix ?? 'container-query';`,
    `  }`,
    ``,
    `  get width(): number {`,
    `    const { args } = this;`,
    ``,
    `    return this.dimensions.width ?? args.defaultDimensions['width'];`,
    `  }`,
    ``,
    `  @action updateState({ dimentions }: { dimensions: Dimensions }): void {`,
    `    this.dimensions = dimensions;`,
    `  }`,
    `}`,
  ]);

  assert.deepStrictEqual(findArguments(templateFile, classFile), [
    'dataAttributePrefix',
    // 'defaultDimensions',
    'tagName',
  ]);
});
