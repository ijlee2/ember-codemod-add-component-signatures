import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { generateErrorMessage } from '../../../utils/components/ui/form.js';
import UiFormField from './field.gjs';
import styles from './number.css';

interface UiFormNumberSignature {
  Args: {
    data: unknown;
    isDisabled: unknown;
    isReadOnly: unknown;
    isRequired: unknown;
    isWide: unknown;
    key: unknown;
    label: unknown;
    maxValue: unknown;
    minValue: unknown;
    onUpdate: unknown;
    placeholder: unknown;
    step: unknown;
  };
}

export default class UiFormNumberComponent extends Component<UiFormNumberSignature> {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'number',
    });
  }

  get value() {
    const { data, key } = this.args;

    return (get(data, key) ?? '').toString();
  }

  @action updateValue(event) {
    const { key, onUpdate } = this.args;
    const { value } = event.target;

    const valueAsNumber = Number.parseFloat(value);

    if (Number.isNaN(valueAsNumber)) {
      onUpdate({ key, value: undefined });
      return;
    }

    onUpdate({ key, value: valueAsNumber });
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
  max={{@maxValue}}
  min={{@minValue}}
  placeholder={{@placeholder}}
  readonly={{@isReadOnly}}
  required={{@isRequired}}
  step={{if @step @step "any"}}
  type="number"
  value={{this.value}}
  {{on "input" this.updateValue}}
  />
  </:field>
  </UiFormField></template>
}
