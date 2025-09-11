import { AST } from '@codemod-utils/ast-javascript';

type BaseComponent = {
  baseComponentName: string | undefined;
  importPath: string | undefined;
};

export function getBaseComponent(file: string): BaseComponent {
  const traverse = AST.traverse(true);

  let baseComponentName: string | undefined;
  let importPath: string | undefined;

  traverse(file, {
    visitImportDeclaration(path) {
      switch (path.node.source.value) {
        case '@ember/component':
        case '@ember/component/template-only':
        case '@glimmer/component': {
          const defaultImport = path.node.specifiers!.find(({ type }) => {
            return type === 'ImportDefaultSpecifier';
          });

          if (!defaultImport) {
            return false;
          }

          baseComponentName = defaultImport.local!.name as string;
          importPath = path.node.source.value as string;

          return false;
        }

        case '@ember/template-compiler': {
          const namedImport = path.node.specifiers!.find(({ type }) => {
            return type === 'ImportSpecifier';
          });

          if (!namedImport) {
            return false;
          }

          baseComponentName = namedImport.local!.name as string;
          importPath = path.node.source.value as string;

          return false;
        }
      }

      return false;
    },
  });

  return {
    baseComponentName,
    importPath,
  };
}
