import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget1ItemSignature {
  Args: {
    title: unknown;
  };
}

const WidgetsWidget1Item =
  templateOnlyComponent<WidgetsWidget1ItemSignature>();

export default WidgetsWidget1Item;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-1::Item': typeof WidgetsWidget1Item;
    'widgets/widget-1/item': typeof WidgetsWidget1Item;
  }
}
