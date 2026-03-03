import { AST } from '@codemod-utils/ast-javascript';

export function hasRegistry(file: string): boolean {
  const traverse = AST.traverse(true);

  let hasRegistry = false;

  traverse(file, {
    visitTSModuleDeclaration(path) {
      if (path.node.id.type !== 'StringLiteral') {
        return false;
      }

      const moduleName = path.node.id.value;

      if (moduleName === '@glint/environment-ember-loose/registry') {
        hasRegistry = true;
      }

      return false;
    },
  });

  return hasRegistry;
}
