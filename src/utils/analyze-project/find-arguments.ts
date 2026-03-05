import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

import type { Signature } from '../../types/index.js';

function analyzeClass(file: string | undefined): Set<string> {
  const args = new Set<string>();

  if (file === undefined) {
    return args;
  }

  // We know that the file is in TypeScript
  const traverse = ASTJavaScript.traverse(true);

  traverse(file, {
    visitMemberExpression(node) {
      this.traverse(node);

      if (
        node.value.object.type !== 'MemberExpression' ||
        node.value.object.property.type !== 'Identifier' ||
        node.value.object.property.name !== 'args'
      ) {
        return false;
      }

      switch (node.value.property.type) {
        // Matches the pattern `this.args.someArgument`
        case 'Identifier': {
          args.add(node.value.property.name as string);

          break;
        }

        // Matches the pattern `this.args['someArgument']`
        case 'StringLiteral': {
          args.add(node.value.property.value as string);

          break;
        }
      }

      return false;
    },

    visitVariableDeclarator(node) {
      const { id: leftHandSide, init: rightHandSide } = node.value;
      let isValid = false;

      switch (rightHandSide?.type) {
        // Matches the pattern `const { someArgument } = this.args;`
        case 'MemberExpression': {
          if (
            rightHandSide.object.type !== 'ThisExpression' ||
            rightHandSide.property.type !== 'Identifier' ||
            rightHandSide.property.name !== 'args'
          ) {
            break;
          }

          isValid = true;

          break;
        }

        // Matches the pattern `const { someArgument } = this.args as SomeType;`
        case 'TSAsExpression': {
          if (
            rightHandSide.expression.type !== 'MemberExpression' ||
            rightHandSide.expression.object.type !== 'ThisExpression' ||
            rightHandSide.expression.property.type !== 'Identifier' ||
            rightHandSide.expression.property.name !== 'args'
          ) {
            break;
          }

          isValid = true;

          break;
        }
      }

      if (!isValid) {
        return false;
      }

      // @ts-expect-error: Assume that types from external packages are correct
      leftHandSide.properties.forEach((property) => {
        switch (property.key.type) {
          case 'Identifier': {
            args.add(property.key.name as string);

            break;
          }

          case 'StringLiteral': {
            args.add(property.key.value as string);

            break;
          }
        }
      });

      return false;
    },
  });

  return args;
}

function analyzeTemplate(file: string): Set<string> {
  const traverse = ASTTemplate.traverse();
  const args = new Set<string>();

  traverse(file, {
    PathExpression(node) {
      if (node.head.type !== 'AtHead') {
        return;
      }

      const value = node.original.replace(/^@/, '');
      const arg = value.split('.')[0]!;

      args.add(arg);
    },
  });

  return args;
}

export function findArguments(
  templateFile: string,
  classFile: string | undefined,
): Signature['Args'] {
  const args = new Set([
    ...analyzeTemplate(templateFile),
    ...analyzeClass(classFile),
  ]);

  return Array.from(args).sort();
}
