import { AST } from '@codemod-utils/ast-javascript';

type Options = {
  baseComponentName: string;
  componentName: string;
  data: {
    entity: {
      pascalizedName: string;
    };
  };
};

export function updateReferences(file: string, options: Options): string {
  const { baseComponentName, componentName, data } = options;

  const ast = AST.traverse(file, {
    visitExportDefaultDeclaration(path) {
      switch (path.node.declaration.type) {
        case 'CallExpression': {
          if (
            path.node.declaration.callee.type !== 'Identifier' ||
            path.node.declaration.callee.name !== baseComponentName
          ) {
            return false;
          }

          const nodesToAdd = [
            AST.builders.noop(),
            AST.builders.exportDefaultDeclaration(
              AST.builders.identifier(data.entity.pascalizedName),
            ),
          ];

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          path.parentPath.value.push(...nodesToAdd);

          return AST.builders.variableDeclaration('const', [
            AST.builders.variableDeclarator(
              AST.builders.identifier(data.entity.pascalizedName),
              path.node.declaration,
            ),
          ]);
        }

        case 'Identifier': {
          if (path.node.declaration.name !== componentName) {
            return false;
          }

          path.node.declaration.name = data.entity.pascalizedName;

          return false;
        }
      }

      return false;
    },
  });

  return AST.print(ast);
}
