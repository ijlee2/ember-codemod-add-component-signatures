import { assert } from '@ember/debug';
import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { generateErrorMessage } from '../../../utils/components/ui/form.js';
import UiFormField from './field.gjs';
import styles from './input.css';

interface UiFormInputSignature {
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
    type: unknown;
  };
}

export default class UiFormInput extends Component<UiFormInputSignature> {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get type() {
    const { type } = this.args;

    assert(
      'To render a number input, please use <Ui::Form::Number> instead.',
      type !== 'number',
    );

    return type ?? 'text';
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

  <template><UiFormField @errorMessage={{this.errorMessage}} @isWide={{@isWide}}>
  <:label as |l|>
  <label data-test-label for={{l.inputId}}>
  {{@label}}

  {{#if @isRequired}}
    <span aria-hidden="true">
      *
    </span>
  {{/if}}
  </label>
  </:label>

  <:field as |f|>
  <input
  class={{local
    styles
    "input"
    (if (or @isDisabled @isReadOnly) "is-disabled")
  }}
  data-test-field={{@label}}
  disabled={{@isDisabled}}
  id={{f.inputId}}
  placeholder={{@placeholder}}
  readonly={{@isReadOnly}}
  required={{@isRequired}}
  type={{this.type}}
  value={{this.value}}
  {{on "input" this.updateValue}}
  />
  </:field>
  </UiFormField></template>
}
