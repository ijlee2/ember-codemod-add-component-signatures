import { AST } from '@codemod-utils/ast-javascript';

import {
  builderConvertArgsToSignature,
  builderCreateSignature,
  builderPassSignature,
} from './builders.js';
import { isSignature } from './is-signature.js';

const MARKER = 'template_fd9b2463e5f141cfb5666b64daa1f11a';

type Options = {
  baseComponentName: string;
  data: {
    entity: {
      pascalizedName: string;
    };
  };
};

export function passSignatureToBaseComponent(
  file: string,
  options: Options,
): {
  interfaceName: string | undefined;
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { baseComponentName, data } = options;
  let interfaceName: string | undefined;

  const ast = traverse(file, {
    visitCallExpression(path) {
      if (path.node.callee.type !== 'Identifier') {
        return false;
      }

      let typeParameters;

      switch (path.node.callee.name) {
        case 'templateOnlyComponent': {
          // @ts-expect-error: Assume that types from external packages are correct
          typeParameters = path.node.typeParameters;
          break;
        }

        case MARKER: {
          const type = path.parentPath.value.type;

          if (type === 'TSSatisfiesExpression') {
            typeParameters =
              path.parentPath.value.typeAnnotation.typeParameters;
          } else if (type === 'VariableDeclarator') {
            typeParameters =
              path.parentPath.value.id.typeAnnotation.typeAnnotation
                .typeParameters;
          }

          break;
        }

        // Other cases not supported
        default: {
          return false;
        }
      }

      // When the interface is missing
      if (!typeParameters) {
        const members = builderConvertArgsToSignature();

        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            const index = path.parentPath.name;

            path.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            // @ts-expect-error: Assume that types from external packages are correct
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }

          case 'VariableDeclarator': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            const index = path.parentPath.parentPath.parentPath.name;

            path.parentPath.parentPath.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            // @ts-expect-error: Assume that types from external packages are correct
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          const members = isSignature(typeParameter.members)
            ? typeParameter.members
            : builderConvertArgsToSignature(typeParameter.members);

          switch (path.parentPath.node.type) {
            case 'ExportDefaultDeclaration': {
              const identifier = `${data.entity.pascalizedName}Signature`;
              const index = path.parentPath.name;

              path.parentPath.parentPath.value.splice(
                index,
                0,
                builderCreateSignature(identifier, members),
              );

              // @ts-expect-error: Assume that types from external packages are correct
              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }

            case 'VariableDeclarator': {
              const identifier = `${data.entity.pascalizedName}Signature`;
              const index = path.parentPath.parentPath.parentPath.name;

              path.parentPath.parentPath.parentPath.parentPath.value.splice(
                index,
                0,
                builderCreateSignature(identifier, members),
              );

              // @ts-expect-error: Assume that types from external packages are correct
              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }
          }

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          const identifier = `${data.entity.pascalizedName}Signature`;

          interfaceName = typeParameter.typeName.name;
          typeParameter.typeName.name = identifier;

          return false;
        }
      }

      return false;
    },

    visitClassDeclaration(path) {
      if (
        !path.node.superClass ||
        path.node.superClass.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      // When the interface is missing
      if (!typeParameters) {
        const members = builderConvertArgsToSignature();

        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            const index = path.parentPath.name;

            path.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }

          case 'Program': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            const index = path.name;

            path.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          const members = isSignature(typeParameter.members)
            ? typeParameter.members
            : builderConvertArgsToSignature(typeParameter.members);

          const identifier = `${data.entity.pascalizedName}Signature`;
          const index = path.parentPath.name;

          path.parentPath.parentPath.value.splice(
            index,
            0,
            builderCreateSignature(identifier, members),
          );

          path.node.superTypeParameters = builderPassSignature(identifier);

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          if (typeParameter.typeName.type !== 'Identifier') {
            break;
          }

          const identifier = `${data.entity.pascalizedName}Signature`;

          interfaceName = typeParameter.typeName.name;
          typeParameter.typeName.name = identifier;

          return false;
        }
      }

      return false;
    },

    visitClassExpression(path) {
      if (
        !path.node.superClass ||
        path.node.superClass.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      if (!typeParameters) {
        const members = builderConvertArgsToSignature();

        switch (path.parentPath.node.type) {
          case 'VariableDeclarator': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            const index = path.parentPath.parentPath.parentPath.name;

            path.parentPath.parentPath.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      const typeParameter = typeParameters.params[0]!;

      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          const members = isSignature(typeParameter.members)
            ? typeParameter.members
            : builderConvertArgsToSignature(typeParameter.members);

          const identifier = `${data.entity.pascalizedName}Signature`;
          const index = path.parentPath.parentPath.parentPath.name;

          path.parentPath.parentPath.parentPath.parentPath.value.splice(
            index,
            0,
            builderCreateSignature(identifier, members),
          );

          path.node.superTypeParameters = builderPassSignature(identifier);

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          if (typeParameter.typeName.type !== 'Identifier') {
            break;
          }

          const identifier = `${data.entity.pascalizedName}Signature`;

          interfaceName = typeParameter.typeName.name;
          typeParameter.typeName.name = identifier;

          return false;
        }
      }

      return false;
    },
  });

  return {
    interfaceName,
    newFile: AST.print(ast),
  };
}
