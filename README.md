[![This project uses GitHub Actions for continuous integration.](https://github.com/ijlee2/ember-codemod-add-component-signatures/actions/workflows/ci.yml/badge.svg)](https://github.com/ijlee2/ember-codemod-add-component-signatures/actions/workflows/ci.yml)

# ember-codemod-add-component-signatures

_Codemod to add component signatures_


## What is it?

To introduce Glint, you will need to write the [signature](https://typed-ember.gitbook.io/glint/environments/ember/component-signatures) and [template registry](https://typed-ember.gitbook.io/glint/environments/ember/template-registry) for each component. This can be an error-prone, onerous task for large projects.

You can run this codemod to get started.


## Features

- Scaffolds signature for components
- Adds template registry for components
- Supports `<template>` tag components

<div align="center">
  <figure>
    <img alt="A code diff to show what template-only components can look like before and after running ember-codemod-add-component-signatures" src="https://github.com/ijlee2/ember-codemod-add-component-signatures/assets/16869656/55115b27-682e-4f5a-9a03-36d7aa1cc0c2" width="640">
    <br>
    <figcaption>Template-only components</figcaption>
  </figure>
  <br><br>
  <figure>
    <img alt="A code diff to show what Glimmer components can look like before and after running ember-codemod-add-component-signatures" src="https://github.com/ijlee2/ember-codemod-add-component-signatures/assets/16869656/4feb1fcd-5a31-419e-9feb-2af99073ae75" width="640">
    <img alt="Another code diff for a Glimmer component" src="https://github.com/ijlee2/ember-codemod-add-component-signatures/assets/16869656/c8c1c9b0-28a1-4957-9c49-5cc853499a4f" width="640">
    <br>
    <figcaption>Glimmer components</figcaption>
  </figure>
</div>


## Usage

Step 1. Quickly migrate.

```sh
cd <path/to/your/project>
npx ember-codemod-add-component-signatures <arguments>
```

Step 2. Review the package.

- [x] Fill in missing type information.
- [x] Confirm that you can run all scripts in `package.json`.

For more information, please check the [FAQ](#frequently-asked-questions).


### Prerequisites

Must:

- Migrate to the Octane layout (flat or nested). You can leverage the codemods for [classic](https://github.com/ember-codemods/ember-component-template-colocation-migrator) and [pod](https://github.com/ijlee2/ember-codemod-pod-to-octane) layouts.

Nice to do:

- Refactor code (e.g. Glimmerize components, meet the linting rule `no-implicit-this`) to help the codemod parse code.


### Arguments

You must pass `--type` to indicate what type of project you have.

```sh
npx ember-codemod-add-component-signatures --type app
npx ember-codemod-add-component-signatures --type v1-addon
npx ember-codemod-add-component-signatures --type v2-addon
```

<details>

<summary>Optional: Specify the component structure</summary>

By default, an Octane project has the flat component structure. Pass `--component-structure` to indicate otherwise.

```sh
npx ember-codemod-add-component-signatures --component-structure nested
```

</details>

<details>

<summary>Optional: Convert <code>*.{js,gjs}</code> files</summary>

By default, the codemod ignores component classes written in `*.{js,gjs}`. Pass `--convert-javascript` to allow the codemod to change the file extension to `*.{ts,gts}` and add the component signature.

```sh
npx ember-codemod-add-component-signatures --convert-javascript
```

</details>

<details>

<summary>Optional: Specify the project root</summary>

Pass `--root` to run the codemod on a project somewhere else (i.e. not in the current directory).

```sh
npx ember-codemod-add-component-signatures --root <path/to/your/project>
```

</details>


### Limitations

The codemod is designed to cover typical cases. It is not designed to cover one-off cases. (Classic components are not supported.)

To better meet your needs, consider cloning the repo and running the codemod locally.

```sh
cd <path/to/cloned/repo>

# Compile TypeScript
pnpm build

# Run codemod
./dist/bin/ember-codemod-add-component-signatures.js --root <path/to/your/project>
```


## Compatibility

- Node.js v20 or above


## Contributing

See the [Contributing](CONTRIBUTING.md) guide for details.


## License

This project is licensed under the [MIT License](LICENSE.md).
