import styles from './page.css';

interface UiPageSignature {
  Args: {
    title: unknown;
  };
  Blocks: {
    default: [];
  };
}

<template><div class={{styles.container}}>
  <h1 class={{styles.title}}>
    {{@title}}
  </h1>

  <div class={{styles.content}} id="main-content" tabindex="-1">
    {{yield}}
  </div>
</div></template>
