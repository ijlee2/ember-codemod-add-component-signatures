import { AST } from '@codemod-utils/ast-javascript';

import {
  builderConvertArgsToSignature,
  builderCreateSignature,
  builderPassSignature,
} from './builders.js';
import { isSignature } from './is-signature.js';

type TypeParameters = ReturnType<
  typeof AST.builders.tsTypeParameterInstantiation
>;

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
  const { baseComponentName, data } = options;
  let interfaceName: string | undefined;

  const ast = AST.traverse(file, {
    visitCallExpression(path) {
      if (path.node.callee.type !== 'Identifier') {
        return false;
      }

      let typeParameters: TypeParameters | undefined;

      switch (path.node.callee.name) {
        case 'templateOnlyComponent': {
          typeParameters = path.node.typeParameters as TypeParameters;

          break;
        }

        case 'template_fd9b2463e5f141cfb5666b64daa1f11a': {
          // oxlint-disable-next-line typescript/no-unsafe-assignment
          const parentPath = path.parentPath;
          // oxlint-disable-next-line typescript/no-unsafe-member-access
          const type = parentPath.value.type as string;

          if (type === 'TSSatisfiesExpression') {
            typeParameters =
              // oxlint-disable-next-line typescript/no-unsafe-member-access
              parentPath.value.typeAnnotation.typeParameters as TypeParameters;
          } else if (type === 'VariableDeclarator') {
            typeParameters =
              // oxlint-disable-next-line typescript/no-unsafe-member-access
              parentPath.value.id.typeAnnotation.typeAnnotation
                .typeParameters as TypeParameters;
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

        // oxlint-disable-next-line typescript/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            // oxlint-disable-next-line typescript/no-unsafe-assignment
            const parentPath = path.parentPath;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            const index = parentPath.name as number;
            const identifier = `${data.entity.pascalizedName}Signature`;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            (parentPath.parentPath.value as unknown[]).splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }

          case 'VariableDeclarator': {
            // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
            const parentPath = path.parentPath.parentPath.parentPath;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            const index = parentPath.name as number;
            const identifier = `${data.entity.pascalizedName}Signature`;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            (parentPath.parentPath.value as unknown[]).splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

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

          // oxlint-disable-next-line typescript/no-unsafe-member-access
          switch (path.parentPath.node.type) {
            case 'ExportDefaultDeclaration': {
              // oxlint-disable-next-line typescript/no-unsafe-assignment
              const parentPath = path.parentPath;

              // oxlint-disable-next-line typescript/no-unsafe-member-access
              const index = parentPath.name as number;
              const identifier = `${data.entity.pascalizedName}Signature`;

              // oxlint-disable-next-line typescript/no-unsafe-member-access
              (parentPath.parentPath.value as unknown[]).splice(
                index,
                0,
                builderCreateSignature(identifier, members),
              );

              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }

            case 'VariableDeclarator': {
              // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
              const parentPath = path.parentPath.parentPath.parentPath;

              // oxlint-disable-next-line typescript/no-unsafe-member-access
              const index = parentPath.name as number;
              const identifier = `${data.entity.pascalizedName}Signature`;

              // oxlint-disable-next-line typescript/no-unsafe-member-access
              (parentPath.parentPath.value as unknown[]).splice(
                index,
                0,
                builderCreateSignature(identifier, members),
              );

              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }
          }

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          if (typeParameter.typeName.type === 'Identifier') {
            const identifier = `${data.entity.pascalizedName}Signature`;

            interfaceName = typeParameter.typeName.name;
            typeParameter.typeName.name = identifier;
          }

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

        // oxlint-disable-next-line typescript/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            // oxlint-disable-next-line typescript/no-unsafe-member-access
            const index = path.parentPath.name as number;
            const identifier = `${data.entity.pascalizedName}Signature`;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            (path.parentPath.parentPath.value as unknown[]).splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            path.node.superTypeParameters = builderPassSignature(identifier);

            break;
          }

          case 'Program': {
            const index = path.name as number;
            const identifier = `${data.entity.pascalizedName}Signature`;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            (path.parentPath.value as unknown[]).splice(
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
          // oxlint-disable-next-line typescript/no-unsafe-assignment
          const parentPath = path.parentPath;

          // oxlint-disable-next-line typescript/no-unsafe-member-access
          const index = parentPath.name as number;
          const identifier = `${data.entity.pascalizedName}Signature`;
          const members = isSignature(typeParameter.members)
            ? typeParameter.members
            : builderConvertArgsToSignature(typeParameter.members);

          // oxlint-disable-next-line typescript/no-unsafe-member-access
          (parentPath.parentPath.value as unknown[]).splice(
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
        path.node.superClass?.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      const typeParameters = path.node.superTypeParameters;

      if (!typeParameters) {
        // oxlint-disable-next-line typescript/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'VariableDeclarator': {
            // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
            const parentPath = path.parentPath.parentPath.parentPath;

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            const index = parentPath.name as number;
            const identifier = `${data.entity.pascalizedName}Signature`;
            const members = builderConvertArgsToSignature();

            // oxlint-disable-next-line typescript/no-unsafe-member-access
            (parentPath.parentPath.value as unknown[]).splice(
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
          // oxlint-disable-next-line typescript/no-unsafe-assignment, typescript/no-unsafe-member-access
          const parentPath = path.parentPath.parentPath.parentPath;

          // oxlint-disable-next-line typescript/no-unsafe-member-access
          const index = parentPath.name as number;
          const identifier = `${data.entity.pascalizedName}Signature`;
          const members = isSignature(typeParameter.members)
            ? typeParameter.members
            : builderConvertArgsToSignature(typeParameter.members);

          // oxlint-disable-next-line typescript/no-unsafe-member-access
          (parentPath.parentPath.value as unknown[]).splice(
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
