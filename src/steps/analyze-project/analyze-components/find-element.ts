import { AST } from '@codemod-utils/ast-template';

import type { Signature } from '../../../types/index.js';
import { getHtmlInterface } from '../../../utils/components.js';

export function findElement(
  templateFile: string | undefined,
): Signature['Element'] {
  if (templateFile === undefined) {
    return;
  }

  const traverse = AST.traverse();

  const htmlInterfaces = new Set<string>();

  traverse(templateFile, {
    ElementNode(node) {
      const hasSplattributes = node.attributes.find(({ name }) => {
        return name === '...attributes';
      });

      if (!hasSplattributes) {
        return;
      }

      htmlInterfaces.add(getHtmlInterface(node.tag));
    },
  });

  if (htmlInterfaces.size === 0) {
    return;
  }

  return Array.from(htmlInterfaces).sort();
}
