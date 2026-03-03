import { AST } from '@codemod-utils/ast-javascript';

type Options = {
  baseComponentName: string;
  data: {
    entity: {
      pascalizedName: string;
    };
  };
};

export function passComponentNameToBaseComponent(
  file: string,
  options: Options,
): {
  componentName: string;
  newFile: string;
} {
  const traverse = AST.traverse(true);

  const { baseComponentName, data } = options;
  let componentName!: string;

  const ast = traverse(file, {
    visitClassDeclaration(path) {
      if (
        !path.node.superClass ||
        path.node.superClass.type !== 'Identifier' ||
        path.node.superClass.name !== baseComponentName
      ) {
        return false;
      }

      if (!path.node.id) {
        path.node.id = AST.builders.identifier(data.entity.pascalizedName);

        return false;
      }

      componentName = path.node.id.name as string;
      path.node.id.name = data.entity.pascalizedName;

      return false;
    },

    visitVariableDeclaration(path) {
      const declaration = path.node.declarations[0]!;

      if (declaration.type !== 'VariableDeclarator') {
        return false;
      }

      switch (declaration.init?.type) {
        case 'CallExpression': {
          if (
            declaration.init.callee.type !== 'Identifier' ||
            declaration.init.callee.name !== baseComponentName ||
            declaration.id.type !== 'Identifier'
          ) {
            return false;
          }

          componentName = declaration.id.name;
          declaration.id.name = data.entity.pascalizedName;

          return false;
        }

        case 'ClassExpression': {
          if (
            !declaration.init.superClass ||
            declaration.init.superClass.type !== 'Identifier' ||
            declaration.init.superClass.name !== baseComponentName ||
            declaration.id.type !== 'Identifier'
          ) {
            return false;
          }

          componentName = declaration.id.name;
          declaration.id.name = data.entity.pascalizedName;

          return false;
        }
      }

      return false;
    },
  });

  return {
    componentName,
    newFile: AST.print(ast),
  };
}
