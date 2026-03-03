import { AST } from '@codemod-utils/ast-template';

import type { Signature } from '../../../types/index.js';
import {
  getBlockParameterType,
  normalizeBlockName,
} from '../../../utils/components/index.js';

export function findBlocks(templateFile: string): Signature['Blocks'] {
  const traverse = AST.traverse();

  const blocksMap = new Map<string, string[]>();

  traverse(templateFile, {
    MustacheStatement(node) {
      if (
        node.path.type !== 'PathExpression' ||
        node.path.original !== 'yield'
      ) {
        return;
      }

      const toArgument = node.hash.pairs.find(({ key }) => {
        return key === 'to';
      });

      // @ts-expect-error: Assume that types from external packages are correct
      const blockName = normalizeBlockName(toArgument?.value.original);

      const positionalArgumentTypes = node.params.map(
        ({ type: recastType }) => {
          return getBlockParameterType(recastType);
        },
      );

      blocksMap.set(blockName, positionalArgumentTypes);
    },
  });

  if (blocksMap.size === 0) {
    return;
  }

  return new Map(Array.from(blocksMap).sort());
}
