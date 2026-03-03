import templateOnlyComponent from '@ember/component/template-only';

interface TracksTableSignature {
  Args: {
    tracks: unknown;
  };
  Element: HTMLTableElement;
}

const TracksListComponent = templateOnlyComponent<TracksTableSignature>();

export default TracksListComponent;
