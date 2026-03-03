import Component from '@glimmer/component';
import config from 'docs-app/config/environment';

interface ProductsProductImageSignature {
  Args: {
    src: string;
  };
}

class ProductsProductImage extends Component<ProductsProductImageSignature> {
  isTestEnvironment = config.environment === 'test';
}

export default ProductsProductImage;
