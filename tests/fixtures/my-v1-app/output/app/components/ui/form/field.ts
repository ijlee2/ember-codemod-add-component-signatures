import { guidFor } from '@ember/object/internals';
import Component from '@glimmer/component';

interface UiFormFieldSignature {
  Args: {
    errorMessage?: string;
    isInline?: boolean;
    isWide?: boolean;
  };
  Blocks: {
    field: [unknown];
    label: [unknown];
  };
}

export default class extends Component<UiFormFieldSignature> {
  inputId = guidFor(this);
}
