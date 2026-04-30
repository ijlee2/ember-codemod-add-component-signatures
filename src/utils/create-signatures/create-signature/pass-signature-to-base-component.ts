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
          // @ts-expect-error: Incorrect type
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          typeParameters = path.node.typeParameters;
          break;
        }

        case MARKER: {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const type = path.parentPath.value.type;

          if (type === 'TSSatisfiesExpression') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            typeParameters =
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              path.parentPath.value.typeAnnotation.typeParameters;
          } else if (type === 'VariableDeclarator') {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            typeParameters =
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const index = path.parentPath.name;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            path.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            // @ts-expect-error: Incorrect type
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }

          case 'VariableDeclarator': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const index = path.parentPath.parentPath.parentPath.name;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
            path.parentPath.parentPath.parentPath.parentPath.value.splice(
              index,
              0,
              builderCreateSignature(identifier, members),
            );

            // @ts-expect-error: Incorrect type
            path.node.typeParameters = builderPassSignature(identifier);

            break;
          }
        }

        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const typeParameter = typeParameters.params[0]!;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (typeParameter.type) {
        // When the interface is directly passed to the component
        case 'TSTypeLiteral': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const members = isSignature(typeParameter.members)
            ? // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
              typeParameter.members
            : // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
              builderConvertArgsToSignature(typeParameter.members);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          switch (path.parentPath.node.type) {
            case 'ExportDefaultDeclaration': {
              const identifier = `${data.entity.pascalizedName}Signature`;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              const index = path.parentPath.name;

              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              path.parentPath.parentPath.value.splice(
                index,
                0,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                builderCreateSignature(identifier, members),
              );

              // @ts-expect-error: Incorrect type
              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }

            case 'VariableDeclarator': {
              const identifier = `${data.entity.pascalizedName}Signature`;
              // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
              const index = path.parentPath.parentPath.parentPath.name;

              // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
              path.parentPath.parentPath.parentPath.parentPath.value.splice(
                index,
                0,
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                builderCreateSignature(identifier, members),
              );

              // @ts-expect-error: Incorrect type
              path.node.typeParameters = builderPassSignature(identifier);

              break;
            }
          }

          return false;
        }

        // When the interface is defined "outside"
        case 'TSTypeReference': {
          const identifier = `${data.entity.pascalizedName}Signature`;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          interfaceName = typeParameter.typeName.name;
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'ExportDefaultDeclaration': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const index = path.parentPath.name;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const index = path.name;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const index = path.parentPath.name;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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

        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (path.parentPath.node.type) {
          case 'VariableDeclarator': {
            const identifier = `${data.entity.pascalizedName}Signature`;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            const index = path.parentPath.parentPath.parentPath.name;

            // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
          const index = path.parentPath.parentPath.parentPath.name;

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
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
