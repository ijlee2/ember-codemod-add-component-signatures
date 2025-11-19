import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';

interface WidgetsWidget3TourScheduleResponsiveImageSignature {
  Args: {};
}

export default class WidgetsWidget3TourScheduleResponsiveImage extends Component<WidgetsWidget3TourScheduleResponsiveImageSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args;

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}

declare module '@glint/environment-ember-loose/registry' {
  export default interface Registry {
    'Widgets::Widget-3::TourSchedule::ResponsiveImage': typeof WidgetsWidget3TourScheduleResponsiveImage;
    'widgets/widget-3/tour-schedule/responsive-image': typeof WidgetsWidget3TourScheduleResponsiveImage;
  }
}
