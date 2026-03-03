import templateOnlyComponent from '@ember/component/template-only';

import type { Product } from '../../../data/products';

interface ProductsProductCardSignature {
  Args: {
    product: Product;
    redirectTo?: string;
  };
}

const Component = templateOnlyComponent<ProductsProductCardSignature>();

export default Component;
