import { AST } from '@codemod-utils/ast-javascript';

import type { Signature } from '../../types/index.js';
import {
  builderCreateArgsNode,
  builderCreateBlocksNode,
  builderCreateElementNode,
} from './update-signature/builders.js';

type Data = {
  entity: {
    pascalizedName: string;
  };
  signature: Signature;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function getBodyNode(node: unknown, key: 'Args' | 'Blocks' | 'Element') {
  // @ts-expect-error: Incorrect type
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return
  return node.body.body.find((node) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (node.type !== 'TSPropertySignature' || node.key.type !== 'Identifier') {
      return false;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const argsNode = getBodyNode(path.node, 'Args');

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const isArgsKnown =
        argsNode &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        argsNode.typeAnnotation.typeAnnotation.type === 'TSTypeLiteral' &&
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        argsNode.typeAnnotation.typeAnnotation.members.length > 0;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ArgsNode = isArgsKnown
        ? argsNode
        : builderCreateArgsNode(data.signature);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const BlocksNode =
        getBodyNode(path.node, 'Blocks') ??
        builderCreateBlocksNode(data.signature);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const ElementNode =
        getBodyNode(path.node, 'Element') ??
        builderCreateElementNode(data.signature);

      return AST.builders.tsInterfaceDeclaration(
        AST.builders.identifier(identifier),
        AST.builders.tsInterfaceBody(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          [ArgsNode, BlocksNode, ElementNode].filter(Boolean),
        ),
      );
    },
  });

  return AST.print(ast);
}
