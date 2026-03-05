import { isTesting, macroCondition } from '@embroider/macros';

import styles from './image.css';

const ProductsProductImageComponent =
  macroCondition(isTesting())
    ? <template>
        <div class={{styles.placeholder-image}}></div>
      </template>
    : <template><img alt="" class={{styles.image}} src={{@src}} /></template>;

export default ProductsProductImageComponent;
