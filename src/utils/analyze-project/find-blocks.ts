import { AST } from '@codemod-utils/ast-template';

import type { Signature } from '../../types/index.js';
import {
  getBlockParameterType,
  normalizeBlockName,
} from '../components/index.js';

export function findBlocks(templateFile: string): Signature['Blocks'] {
  const blocksMap = new Map<string, string[]>();

  AST.traverse(templateFile, {
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

      const blockName = normalizeBlockName(
        // @ts-expect-error: Incorrect type
        toArgument?.value?.original as string | undefined,
      );

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
