import Component from '@glimmer/component';
import type { QueryResults } from 'ember-container-query';

interface WidgetsWidget4MemoBodySignature {
  Args: {
    cqFeatures?: QueryResults<'small' | 'large' | 'short'>;
  };
}

const WidgetsWidget4MemoBody = class extends Component<WidgetsWidget4MemoBodySignature> {}

export default WidgetsWidget4MemoBody;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget4::Memo::Body': typeof WidgetsWidget4MemoBody;
    'widgets/widget-4/memo/body': typeof WidgetsWidget4MemoBody;
  }
}
