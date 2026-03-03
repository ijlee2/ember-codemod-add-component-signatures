import Component from '@glimmer/component';

interface TracksListSignature {
  Args: {
    'num-columns': unknown;
    tracks: unknown;
  };
  Element: HTMLUListElement;
}

export default class TracksListComponent extends Component<TracksListSignature> {
  get numColumns(): number {
    const { 'num-columns': numColumns } = this.args;

    return numColumns ?? 1;
  }

  get numRows(): number {
    const { tracks } = this.args;

    if (!tracks) {
      return 0;
    }

    return Math.ceil(tracks.length / this.numColumns);
  }
}
