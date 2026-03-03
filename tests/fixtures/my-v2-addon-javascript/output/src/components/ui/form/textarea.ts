import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form.js';
import styles from './textarea.css';

interface UiFormTextareaSignature {
  Args: {
    data: unknown;
    isDisabled: unknown;
    isReadOnly: unknown;
    isRequired: unknown;
    isWide: unknown;
    key: unknown;
    label: unknown;
    onUpdate: unknown;
    placeholder: unknown;
  };
}

export default class extends Component<UiFormTextareaSignature> {
  styles = styles;

  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get value() {
    const { data, key } = this.args;

    return (get(data, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    onUpdate({ key, value });
  }
}
