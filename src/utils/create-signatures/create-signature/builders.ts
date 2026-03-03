import { AST } from '@codemod-utils/ast-javascript';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderConvertArgsToSignature(nodes: unknown[] = []) {
  return [
    AST.builders.tsPropertySignature(
      AST.builders.identifier('Args'),
      // @ts-expect-error: Assume that types from external packages are correct
      AST.builders.tsTypeAnnotation(AST.builders.tsTypeLiteral(nodes)),
      false,
    ),
  ];
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderCreateSignature(identifier: string, members: unknown[]) {
  return AST.builders.tsInterfaceDeclaration(
    AST.builders.identifier(identifier),
    // @ts-expect-error: Assume that types from external packages are correct
    AST.builders.tsInterfaceBody(members),
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderPassSignature(identifier: string) {
  return AST.builders.tsTypeParameterInstantiation([
    AST.builders.tsTypeReference(AST.builders.identifier(identifier)),
  ]);
}
