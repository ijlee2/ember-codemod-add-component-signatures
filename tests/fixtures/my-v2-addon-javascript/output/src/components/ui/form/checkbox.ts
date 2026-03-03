import { action, get } from '@ember/object';
import Component from '@glimmer/component';

import { generateErrorMessage } from '../../../utils/components/ui/form.js';
import styles from './checkbox.css';

interface UiFormCheckboxSignature {
  Args: {
    data: unknown;
    isDisabled: unknown;
    isInline: unknown;
    isReadOnly: unknown;
    isRequired: unknown;
    isWide: unknown;
    key: unknown;
    label: unknown;
    onUpdate: unknown;
  };
}

export default class UiFormCheckboxComponent extends Component<UiFormCheckboxSignature> {
  styles = styles;

  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.isChecked,
      valueType: 'boolean',
    });
  }

  get isChecked() {
    const { data, key } = this.args;

    return get(data, key) ?? false;
  }

  @action updateValue() {
    const { isDisabled, isReadOnly, key, onUpdate } = this.args;

    if (isDisabled || isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    onUpdate({ key, value });
  }

  @action updateValueByPressingSpace(event) {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
