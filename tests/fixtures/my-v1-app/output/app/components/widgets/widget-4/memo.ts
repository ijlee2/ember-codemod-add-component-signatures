import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoSignature {
  Args: {};
}

const WidgetsWidget4Memo = templateOnlyComponent<WidgetsWidget4MemoSignature>();

export default WidgetsWidget4Memo;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo': typeof WidgetsWidget4Memo;
    'widgets/widget-4/memo': typeof WidgetsWidget4Memo;
  }
}
