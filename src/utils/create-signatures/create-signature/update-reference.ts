import { AST } from '@codemod-utils/ast-javascript';

import {
  builderConvertArgsToSignature,
  builderCreateSignature,
} from './builders.js';
import { isSignature } from './is-signature.js';

type Options = {
  data: {
    entity: {
      pascalizedName: string;
    };
  };
  interfaceName: string;
};

export function updateReferences(file: string, options: Options): string {
  const traverse = AST.traverse(true);

  const { interfaceName, data } = options;

  const ast = traverse(file, {
    visitTSInterfaceDeclaration(path) {
      if (
        path.node.id.type !== 'Identifier' ||
        path.node.id.name !== interfaceName
      ) {
        return false;
      }

      const members = isSignature(path.node.body.body)
        ? path.node.body.body
        : builderConvertArgsToSignature(path.node.body.body);

      const identifier = `${data.entity.pascalizedName}Signature`;

      return builderCreateSignature(identifier, members);
    },

    visitTSTypeAliasDeclaration(path) {
      if (
        path.node.id.type !== 'Identifier' ||
        path.node.id.name !== interfaceName ||
        path.node.typeAnnotation.type !== 'TSTypeLiteral'
      ) {
        return false;
      }

      const members = isSignature(path.node.typeAnnotation.members)
        ? path.node.typeAnnotation.members
        : builderConvertArgsToSignature(path.node.typeAnnotation.members);

      const identifier = `${data.entity.pascalizedName}Signature`;

      return builderCreateSignature(identifier, members);
    },

    visitTSTypeReference(path) {
      if (
        path.node.typeName.type !== 'Identifier' ||
        path.node.typeName.name !== interfaceName ||
        path.node.typeName.name.endsWith('Signature')
      ) {
        return false;
      }

      path.node.typeName.name = `${data.entity.pascalizedName}Signature['Args']`;

      return false;
    },
  });

  return AST.print(ast);
}
