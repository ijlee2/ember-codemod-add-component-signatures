import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget4MemoActionsSignature {
  Args: {
    cqFeatures: unknown;
  };
}

const WidgetsWidget4MemoActions = templateOnlyComponent<WidgetsWidget4MemoActionsSignature>();

export default WidgetsWidget4MemoActions;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Actions': typeof WidgetsWidget4MemoActions;
    'widgets/widget-4/memo/actions': typeof WidgetsWidget4MemoActions;
  }
}
