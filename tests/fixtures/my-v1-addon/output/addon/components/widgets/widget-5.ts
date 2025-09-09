import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget5Signature {
  Args: {};
}

const WidgetsWidget5 =
  templateOnlyComponent<WidgetsWidget5Signature>();

export default WidgetsWidget5;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget5': typeof WidgetsWidget5;
    'widgets/widget-5': typeof WidgetsWidget5;
  }
}
