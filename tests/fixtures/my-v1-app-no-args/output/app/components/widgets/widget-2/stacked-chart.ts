import Component from '@glimmer/component';

interface WidgetsWidget2StackedChartSignature {
  Args: {
    data: unknown;
  };
}

export default class WidgetsWidget2StackedChart extends Component<WidgetsWidget2StackedChartSignature> {}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget2::StackedChart': typeof WidgetsWidget2StackedChart;
    'widgets/widget-2/stacked-chart': typeof WidgetsWidget2StackedChart;
  }
}
