import templateOnlyComponent from '@ember/component/template-only';

interface ProductsProductCardSignature {
  Args: {
    product: unknown;
    redirectTo: unknown;
  };
  Element: HTMLElement;
}

const Component = templateOnlyComponent<ProductsProductCardSignature>();

export default Component;
