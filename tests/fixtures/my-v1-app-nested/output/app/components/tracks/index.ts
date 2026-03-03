import templateOnlyComponent from '@ember/component/template-only';

interface TracksSignature {
  Args: {
    tracks: unknown;
  };
  Element: HTMLElement;
}

const Tracks =
  templateOnlyComponent<TracksSignature>();

export default Tracks;
