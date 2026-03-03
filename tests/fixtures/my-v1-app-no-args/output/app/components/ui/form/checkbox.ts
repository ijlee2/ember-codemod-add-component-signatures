import { action, get } from '@ember/object';
import Component from '@glimmer/component';

interface UiFormCheckboxSignature {
  Args: {
    changeset: unknown;
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
  get errorMessage(): string | undefined {
    if (!this.args.isRequired) {
      return undefined;
    }

    if (!this.isChecked) {
      return 'Please select the checkbox.';
    }

    return undefined;
  }

  get isChecked(): boolean {
    return (get(this.args.changeset, this.args.key) as boolean) ?? false;
  }

  @action updateValue(): void {
    if (this.args.isDisabled || this.args.isReadOnly) {
      return;
    }

    const value = !this.isChecked;

    this.args.onUpdate({
      key: this.args.key,
      value,
    });
  }

  @action updateValueByPressingSpace(event: KeyboardEvent): void {
    if (event.code === 'Space' || event.key === 'Space') {
      this.updateValue();
    }
  }
}
