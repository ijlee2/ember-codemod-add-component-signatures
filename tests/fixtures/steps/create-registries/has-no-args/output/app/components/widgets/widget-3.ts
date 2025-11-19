import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

import type { Concert } from '../../data/concert';
import concertData from '../../data/concert';

interface WidgetsWidget3Signature {
  Args: {};
}

export default class WidgetsWidget3 extends Component<WidgetsWidget3Signature> {
  @tracked concertData = {} as Concert;

  constructor(owner: unknown, args: WidgetsWidget3Signature['Args']) {
    super(owner, args);

    this.loadData();
  }

  loadData(): void {
    this.concertData = concertData;
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3': typeof WidgetsWidget3;
    'widgets/widget-3': typeof WidgetsWidget3;
  }
}
