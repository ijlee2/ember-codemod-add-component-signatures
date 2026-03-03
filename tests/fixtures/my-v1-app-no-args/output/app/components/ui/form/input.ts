import { action, get } from '@ember/object';
import Component from '@glimmer/component';

interface UiFormInputSignature {
  Args: {
    changeset: unknown;
    isDisabled: unknown;
    isReadOnly: unknown;
    isRequired: unknown;
    isWide: unknown;
    key: unknown;
    label: unknown;
    onUpdate: unknown;
    placeholder: unknown;
    type: unknown;
  };
}

export default class UiFormInputComponent extends Component<UiFormInputSignature> {
  get errorMessage(): string | undefined {
    const { isRequired } = this.args;

    if (!isRequired) {
      return undefined;
    }

    if (!this.value) {
      return 'Please provide a value.';
    }

    return undefined;
  }

  get type(): string {
    return this.args.type ?? 'text';
  }

  get value(): string {
    const { changeset, key } = this.args;

    return ((get(changeset, key) as string) ?? '').toString();
  }

  @action updateValue(event: Event): void {
    const { key, onUpdate } = this.args;
    const { value } = event.target as HTMLInputElement;

    onUpdate({ key, value });
  }
}
