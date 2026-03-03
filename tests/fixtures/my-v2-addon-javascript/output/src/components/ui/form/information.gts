import { concat } from '@ember/helper';
import { or } from 'ember-truth-helpers';

import styles from './information.css';

const UiFormInformationComponent = <template>{{#if (or @title @instructions)}}
  <div class={{styles.container}}>
    {{#if @title}}
      <div
        class={{styles.title}}
        data-test-title
        id={{concat @formId "-title"}}
      >
        {{@title}}
      </div>
    {{/if}}

    {{#if @instructions}}
      <p
        class={{styles.instructions}}
        data-test-instructions
        id={{concat @formId "-instructions"}}
      >
        {{@instructions}}
      </p>
    {{/if}}
  </div>
{{/if}}</template>;

export default UiFormInformationComponent;
