import { AST } from '@codemod-utils/ast-javascript';

import type { Signature } from '../../../types/index.js';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function builderConvertTsTypeToKeyword(tsType: string) {
  switch (tsType) {
    case 'boolean': {
      return AST.builders.tsBooleanKeyword();
    }

    case 'null': {
      return AST.builders.tsNullKeyword();
    }

    case 'number': {
      return AST.builders.tsNumberKeyword();
    }

    case 'string': {
      return AST.builders.tsStringKeyword();
    }

    case 'undefined': {
      return AST.builders.tsUndefinedKeyword();
    }

    case 'unknown':
    default: {
      return AST.builders.tsUnknownKeyword();
    }
  }
}

function needsQuotations(key: string): boolean {
  return key.includes('-');
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderCreateArgsNode(signature: Signature) {
  const members: unknown[] = [];

  (signature.Args ?? []).forEach((argumentName) => {
    members.push(
      AST.builders.tsPropertySignature(
        needsQuotations(argumentName)
          ? AST.builders.stringLiteral(argumentName)
          : AST.builders.identifier(argumentName),
        AST.builders.tsTypeAnnotation(AST.builders.tsUnknownKeyword()),
      ),
    );
  });

  return AST.builders.tsPropertySignature(
    AST.builders.identifier('Args'),
    // @ts-expect-error: Assume that types from external packages are correct
    AST.builders.tsTypeAnnotation(AST.builders.tsTypeLiteral(members)),
    false,
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderCreateBlocksNode(signature: Signature) {
  if (signature.Blocks === undefined) {
    return;
  }

  const members: unknown[] = [];

  signature.Blocks.forEach((positionalArgumentTypes, blockName) => {
    members.push(
      AST.builders.tsPropertySignature(
        needsQuotations(blockName)
          ? AST.builders.stringLiteral(blockName)
          : AST.builders.identifier(blockName),
        AST.builders.tsTypeAnnotation(
          AST.builders.tsTupleType(
            positionalArgumentTypes.map(builderConvertTsTypeToKeyword),
          ),
        ),
      ),
    );
  });

  return AST.builders.tsPropertySignature(
    AST.builders.identifier('Blocks'),
    // @ts-expect-error: Assume that types from external packages are correct
    AST.builders.tsTypeAnnotation(AST.builders.tsTypeLiteral(members)),
    false,
  );
}

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function builderCreateElementNode(signature: Signature) {
  if (signature.Element === undefined) {
    return;
  }

  return AST.builders.tsPropertySignature(
    AST.builders.identifier('Element'),
    AST.builders.tsTypeAnnotation(
      AST.builders.tsUnionType(
        signature.Element.map((htmlInterface) => {
          return AST.builders.tsTypeReference(
            AST.builders.identifier(htmlInterface),
          );
        }),
      ),
    ),
    false,
  );
}
