import { AST } from '@codemod-utils/ast-javascript';

type InterfaceDeclaration = ReturnType<
  typeof AST.builders.tsInterfaceDeclaration
>;

type PropertySignature = ReturnType<typeof AST.builders.tsPropertySignature>;

type TypeParameters = ReturnType<
  typeof AST.builders.tsTypeParameterInstantiation
>;

export function builderConvertArgsToSignature(
  nodes: Parameters<typeof AST.builders.tsTypeLiteral>[0] = [],
): PropertySignature[] {
  return [
    AST.builders.tsPropertySignature(
      AST.builders.identifier('Args'),
      AST.builders.tsTypeAnnotation(AST.builders.tsTypeLiteral(nodes)),
      false,
    ),
  ];
}

export function builderCreateSignature(
  identifier: string,
  members: Parameters<typeof AST.builders.tsInterfaceBody>[0],
): InterfaceDeclaration {
  return AST.builders.tsInterfaceDeclaration(
    AST.builders.identifier(identifier),
    AST.builders.tsInterfaceBody(members),
  );
}

export function builderPassSignature(identifier: string): TypeParameters {
  return AST.builders.tsTypeParameterInstantiation([
    AST.builders.tsTypeReference(AST.builders.identifier(identifier)),
  ]);
}
