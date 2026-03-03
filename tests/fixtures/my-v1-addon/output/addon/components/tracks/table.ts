import templateOnlyComponent from '@ember/component/template-only';

interface TracksTableSignature {
  Args: {
    tracks: unknown;
  };
}

const TracksTable =
  templateOnlyComponent<TracksTableSignature>();

export default TracksTable;
