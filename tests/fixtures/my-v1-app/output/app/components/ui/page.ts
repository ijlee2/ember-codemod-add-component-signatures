import Component from '@glimmer/component';

interface UiPageSignature {
  Args: {
    title: string;
  };
  Blocks: {
    default: [];
  };
  Element: HTMLDivElement;
}

export default class UiPageComponent extends Component<UiPageSignature> {}
