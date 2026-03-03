import { AST } from '@codemod-utils/ast-javascript';

type Options = {
  data: {
    entity: {
      pascalizedName: string;
    };
  };
};

export function updateConstructor(file: string, options: Options): string {
  const traverse = AST.traverse(true);

  const { data } = options;

  const ast = traverse(file, {
    visitClassMethod(path) {
      if (path.node.kind !== 'constructor' || path.node.params.length !== 2) {
        return false;
      }

      const args = path.node.params[1]!;

      if (args.type !== 'Identifier') {
        return false;
      }

      args.typeAnnotation = AST.builders.tsTypeAnnotation(
        AST.builders.tsIndexedAccessType(
          AST.builders.tsTypeReference(
            AST.builders.identifier(`${data.entity.pascalizedName}Signature`),
          ),
          AST.builders.tsLiteralType(AST.builders.stringLiteral('Args')),
        ),
      );

      return false;
    },
  });

  return AST.print(ast);
}
