#!/usr/bin/env sh

#----------
#
#  A. Purpose
#
#    Fix all test fixtures after updating the source code.
#
#  B. Usage
#
#    ./update-test-fixtures.sh
#
#---------

# Compile TypeScript
pnpm build

# Update fixtures
rm -r "tests/fixtures/my-v1-addon/output"
cp -r "tests/fixtures/my-v1-addon/input" "tests/fixtures/my-v1-addon/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v1-addon/output" \
  --type "v1-addon"

# Update fixtures
rm -r "tests/fixtures/my-v1-app/output"
cp -r "tests/fixtures/my-v1-app/input" "tests/fixtures/my-v1-app/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v1-app/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-classic/output"
cp -r "tests/fixtures/my-v1-app-classic/input" "tests/fixtures/my-v1-app-classic/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v1-app-classic/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-javascript/output"
cp -r "tests/fixtures/my-v1-app-javascript/input" "tests/fixtures/my-v1-app-javascript/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --convert-javascript \
  --root "tests/fixtures/my-v1-app-javascript/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-nested/output"
cp -r "tests/fixtures/my-v1-app-nested/input" "tests/fixtures/my-v1-app-nested/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --component-structure nested \
  --root "tests/fixtures/my-v1-app-nested/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-no-args/output"
cp -r "tests/fixtures/my-v1-app-no-args/input" "tests/fixtures/my-v1-app-no-args/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v1-app-no-args/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v1-app-template-tag/output"
cp -r "tests/fixtures/my-v1-app-template-tag/input" "tests/fixtures/my-v1-app-template-tag/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v1-app-template-tag/output" \
  --type "app"

# Update fixtures
rm -r "tests/fixtures/my-v2-addon/output"
cp -r "tests/fixtures/my-v2-addon/input" "tests/fixtures/my-v2-addon/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v2-addon/output" \
  --type "v2-addon"

# Update fixtures
rm -r "tests/fixtures/my-v2-addon-javascript/output"
cp -r "tests/fixtures/my-v2-addon-javascript/input" "tests/fixtures/my-v2-addon-javascript/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --convert-javascript \
  --root "tests/fixtures/my-v2-addon-javascript/output" \
  --type "v2-addon"

# Update fixtures
rm -r "tests/fixtures/my-v2-addon-template-tag/output"
cp -r "tests/fixtures/my-v2-addon-template-tag/input" "tests/fixtures/my-v2-addon-template-tag/output"

./dist/bin/ember-codemod-add-component-signatures.js \
  --root "tests/fixtures/my-v2-addon-template-tag/output" \
  --type "v2-addon"
