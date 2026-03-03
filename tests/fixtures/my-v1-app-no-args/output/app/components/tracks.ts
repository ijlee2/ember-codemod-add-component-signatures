import Component from '@glimmer/component';

interface TracksSignature {
  Args: {
    tracks: unknown;
  };
  Element: HTMLElement;
}

export default class TracksComponent extends Component<TracksSignature> {}
