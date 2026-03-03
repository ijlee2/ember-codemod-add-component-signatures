import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageSignature {
  Args: {
    src: unknown;
  };
  Element: HTMLDivElement | HTMLImageElement;
}

class ProductsProductImage extends Component<ProductsProductImageSignature> {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;
