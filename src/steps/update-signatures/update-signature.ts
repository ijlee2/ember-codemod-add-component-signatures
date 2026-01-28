import { AST } from '@codemod-utils/ast-javascript';

import type { Signature } from '../../types/index.js';
import {
  builderCreateArgsNode,
  builderCreateBlocksNode,
  builderCreateElementNode,
} from './builders.js';

type Data = {
  entity: {
    pascalizedName: string;
  };
  signature: Signature;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getBodyNode(node: unknown, key: 'Args' | 'Blocks' | 'Element') {
  // @ts-expect-error: Assume that types from external packages are correct
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return node.body.body.find((node) => {
    if (node.type !== 'TSPropertySignature' || node.key.type !== 'Identifier') {
      return false;
    }

    return node.key.name === key;
  });
}

export function updateSignature(file: string, data: Data): string {
  const traverse = AST.traverse(true);

  const identifier = `${data.entity.pascalizedName}Signature`;

  const ast = traverse(file, {
    visitTSInterfaceDeclaration(path) {
      if (
        path.node.id.type !== 'Identifier' ||
        path.node.id.name !== identifier
      ) {
        return false;
      }

      const argsNode = getBodyNode(path.node, 'Args');

      const isArgsKnown =
        argsNode &&
        argsNode.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral' &&
        argsNode.typeAnnotation.typeAnnotation.members.length > 0;

      const ArgsNode = isArgsKnown
        ? argsNode
        : builderCreateArgsNode(data.signature);

      const BlocksNode =
        getBodyNode(path.node, 'Blocks') ??
        builderCreateBlocksNode(data.signature);

      const ElementNode =
        getBodyNode(path.node, 'Element') ??
        builderCreateElementNode(data.signature);

      return AST.builders.tsInterfaceDeclaration(
        AST.builders.identifier(identifier),
        AST.builders.tsInterfaceBody(
          [ArgsNode, BlocksNode, ElementNode].filter(Boolean),
        ),
      );
    },
  });

  return AST.print(ast);
}
