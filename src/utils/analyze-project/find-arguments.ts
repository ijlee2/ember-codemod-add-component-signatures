import { AST as ASTJavaScript } from '@codemod-utils/ast-javascript';
import { AST as ASTTemplate } from '@codemod-utils/ast-template';

import type { Signature } from '../../types/index.js';

function analyzeClass(file: string | undefined): Set<string> {
  const args = new Set<string>();

  if (file === undefined) {
    return args;
  }

  ASTJavaScript.traverse(file, {
    visitMemberExpression(path) {
      this.traverse(path);

      if (
        path.node.object.type !== 'MemberExpression' ||
        path.node.object.property.type !== 'Identifier' ||
        path.node.object.property.name !== 'args'
      ) {
        return false;
      }

      switch (path.node.property.type) {
        // Matches the pattern `this.args.someArgument`
        case 'Identifier': {
          args.add(path.node.property.name);

          break;
        }

        // Matches the pattern `this.args['someArgument']`
        case 'StringLiteral': {
          args.add(path.node.property.value);

          break;
        }
      }

      return false;
    },

    visitVariableDeclarator(path) {
      const { id: leftHandSide, init: rightHandSide } = path.node;
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

      if (leftHandSide.type !== 'ObjectPattern') {
        return false;
      }

      leftHandSide.properties.forEach((property) => {
        if (property.type !== 'ObjectProperty') {
          return;
        }

        switch (property.key.type) {
          case 'Identifier': {
            args.add(property.key.name);
            break;
          }

          case 'StringLiteral': {
            args.add(property.key.value);
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
  const args = new Set<string>();

  ASTTemplate.traverse(file, {
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
