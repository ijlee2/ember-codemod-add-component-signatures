import templateOnlyComponent from '@ember/component/template-only';

interface WidgetsWidget3TourScheduleSignature {
  Args: {};
}

const WidgetsWidget3TourSchedule =
  templateOnlyComponent<WidgetsWidget3TourScheduleSignature>();

export default WidgetsWidget3TourSchedule;

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule': typeof WidgetsWidget3TourSchedule;
    'widgets/widget-3/tour-schedule': typeof WidgetsWidget3TourSchedule;
  }
}
