import { getBaseComponent } from '../../utils/components/index.js';
import {
  passSignatureToBaseComponent,
  updateConstructor,
  updateReferences,
} from './create-signature/index.js';

type Data = {
  entity: {
    pascalizedName: string;
  };
};

export function createSignature(file: string, data: Data): string {
  const { baseComponentName } = getBaseComponent(file);

  if (baseComponentName === undefined) {
    return file;
  }

  // eslint-disable-next-line prefer-const
  let { interfaceName, newFile } = passSignatureToBaseComponent(file, {
    baseComponentName,
    data,
  });

  newFile = updateConstructor(newFile, {
    data,
  });

  if (interfaceName === undefined) {
    return newFile;
  }

  return updateReferences(newFile, {
    data,
    interfaceName,
  });
}
