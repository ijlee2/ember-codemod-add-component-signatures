import Component from '@glimmer/component';

interface WidgetsWidget4MemoHeaderSignature {
  Args: {};
}

const WidgetsWidget4MemoHeader = class FooComponent extends Component<WidgetsWidget4MemoHeaderSignature> {}

export default WidgetsWidget4MemoHeader;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-4::Memo::Header': typeof WidgetsWidget4MemoHeader;
    'widgets/widget-4/memo/header': typeof WidgetsWidget4MemoHeader;
  }
}
