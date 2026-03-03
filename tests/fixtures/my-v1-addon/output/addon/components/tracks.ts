import templateOnlyComponent from '@ember/component/template-only';

interface TracksSignature {
  Args: {
    tracks: unknown;
  };
}

const Tracks =
  templateOnlyComponent<TracksSignature>();

export default Tracks;
