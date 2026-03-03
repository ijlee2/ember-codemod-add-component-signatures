import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: unknown;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class UiPageComponent extends Component<UiPageSignature> {}
