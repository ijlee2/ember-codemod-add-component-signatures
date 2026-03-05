import { assert, normalizeFile, test } from '@codemod-utils/tests';

import { findArguments } from '../../../../src/utils/analyze-project/index.js';

test('utils | analyze-project | find-arguments > class has arguments (1)', function () {
  const templateFile = '';

  const classFile = normalizeFile([
    `class MyComponent extends Component {`,
    `  @tracked dimensions?: Dimensions;`,
    ``,
    `  tagName = this.args.tagName ?? 'div';`,
    ``,
    `  get dataAttributePrefix(): string {`,
    `    return this.args.dataAttributePrefix ?? 'container-query';`,
    `  }`,
    ``,
    `  get width(): number {`,
    `    return this.dimensions.width ?? this.args.defaultDimensions['width'];`,
    `  }`,
    ``,
    `  @action updateState({ dimentions }: { dimensions: Dimensions }): void {`,
    `    this.dimensions = dimensions;`,
    `  }`,
    `}`,
  ]);

  assert.deepStrictEqual(findArguments(templateFile, classFile), [
    'dataAttributePrefix',
    'defaultDimensions',
    'tagName',
  ]);
});
