import { action } from '@ember/object';
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { containerQuery, type Dimensions } from 'ember-container-query';

import type { Image } from '../../../../data/concert';
import { findBestFittingImage } from '../../../../utils/components/widgets/widget-3';

interface WidgetsWidget3TourScheduleResponsiveImageSignature {
  Args: {
    images: Image[];
  };
}

export default class WidgetsWidget3TourScheduleResponsiveImageComponent extends Component<WidgetsWidget3TourScheduleResponsiveImageSignature> {
  @tracked imageSource?: string;

  @action setImageSource({ dimensions }: { dimensions: Dimensions }): void {
    const { images } = this.args as WidgetsWidget3TourScheduleResponsiveImageSignature['Args'];

    this.imageSource = findBestFittingImage(images, dimensions);
  }
}
