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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.object.type !== 'MemberExpression' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.object.property.type !== 'Identifier' ||
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        node.value.object.property.name !== 'args'
      ) {
        return false;
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (node.value.property.type) {
        // Matches the pattern `this.args.someArgument`
        case 'Identifier': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          args.add(node.value.property.name as string);

          break;
        }

        // Matches the pattern `this.args['someArgument']`
        case 'StringLiteral': {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          args.add(node.value.property.value as string);

          break;
        }
      }

      return false;
    },

    visitVariableDeclarator(node) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { id: leftHandSide, init: rightHandSide } = node.value;
      let isValid = false;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (rightHandSide?.type) {
        // Matches the pattern `const { someArgument } = this.args;`
        case 'MemberExpression': {
          if (
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rightHandSide.object.type !== 'ThisExpression' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rightHandSide.property.type !== 'Identifier' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rightHandSide.expression.type !== 'MemberExpression' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rightHandSide.expression.object.type !== 'ThisExpression' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            rightHandSide.expression.property.type !== 'Identifier' ||
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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

      // @ts-expect-error: Incorrect type
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      leftHandSide.properties.forEach((property) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        switch (property.key.type) {
          case 'Identifier': {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            args.add(property.key.name as string);

            break;
          }

          case 'StringLiteral': {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
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
