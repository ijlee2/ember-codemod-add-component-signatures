import { isTesting, macroCondition } from '@embroider/macros';

import styles from './image.css';

const ProductsProductImageComponent =
  macroCondition(isTesting()) ? <template><div class={{styles.placeholder-image}}></div></template> : <template><img alt="" class={{styles.image}} src={{@src}} /></template>;

export default ProductsProductImageComponent;

declare module '@glint/environment-ember-loose/registry' {
    export default interface Registry {
        'Products::Product::Image': typeof ProductsProductImage;
        'products/product/image': typeof ProductsProductImage;
    }
}
