import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4Signature {
  Args: {};
}

const WidgetsWidget4 = templateOnlyComponent<WidgetsWidget4Signature>();

export default WidgetsWidget4;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4': typeof WidgetsWidget4;
    'widgets/widget-4': typeof WidgetsWidget4;
  }
}
