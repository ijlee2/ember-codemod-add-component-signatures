import { on } from '@ember/modifier';
import { action, get } from '@ember/object';
import Component from '@glimmer/component';
import { t } from 'ember-intl';
import { eq, or } from 'ember-truth-helpers';
import { local } from 'embroider-css-modules';

import { generateErrorMessage } from '../../../utils/components/ui/form.js';
import UiFormField from './field.gjs';
import styles from './select.css';

interface UiFormSelectSignature {
  Args: {
    data: unknown;
    isDisabled: unknown;
    isReadOnly: unknown;
    isRequired: unknown;
    isWide: unknown;
    key: unknown;
    label: unknown;
    onUpdate: unknown;
    options: unknown;
  };
}

export default class UiFormSelectComponent extends Component<UiFormSelectSignature> {
  get errorMessage() {
    const { isRequired } = this.args;

    return generateErrorMessage({
      isRequired,
      value: this.value,
      valueType: 'string',
    });
  }

  get options() {
    return this.args.options ?? [];
  }

  get value() {
    const { data, key } = this.args;

    return (get(data, key) ?? '').toString();
  }

  @action resetValue() {
    const { key, onUpdate } = this.args;

    onUpdate({ key, value: undefined });
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
  <div class={{styles.select-container}}>
  <select
    class={{local
      styles
      "select"
      (if (or @isDisabled @isReadOnly) "is-disabled")
    }}
    data-test-field={{@label}}
    disabled={{or @isDisabled @isReadOnly}}
    id={{f.inputId}}
    required={{@isRequired}}
    {{on "change" this.updateValue}}
  >
    {{#if (eq this.value "")}}
      <option disabled selected value="">
        {{t "components.ui.form.select.default-option"}}
      </option>
    {{else}}
      <option disabled value="">
        {{t "components.ui.form.select.default-option"}}
      </option>
    {{/if}}

    {{#each this.options as |opt|}}
      {{#if (eq opt.value this.value)}}
        <option
          data-test-option={{opt.label}}
          selected
          value={{opt.value}}
        >
          {{opt.label}}
        </option>
      {{else}}
        <option data-test-option={{opt.label}} value={{opt.value}}>
          {{opt.label}}
        </option>
      {{/if}}
    {{/each}}
  </select>

  <button
    aria-label={{t
      "components.ui.form.select.clear.aria-label"
      label=@label
    }}
    class={{styles.clear-button}}
    data-test-button="Clear"
    type="button"
    {{on "click" this.resetValue}}
  >
    <span aria-hidden="true">
      {{t "components.ui.form.select.clear.label"}}
    </span>
  </button>
  </div>
  </:field>
  </UiFormField></template>
}
