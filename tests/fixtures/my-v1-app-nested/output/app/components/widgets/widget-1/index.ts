import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1Signature {
  Args: {};
  Element: HTMLElement;
}

const WidgetsWidget1 = templateOnlyComponent<WidgetsWidget1Signature>();

export default WidgetsWidget1;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1': typeof WidgetsWidget1;
    'widgets/widget-1': typeof WidgetsWidget1;
  }
}
