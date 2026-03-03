import templateOnlyComponent from '@ember/component/template-only';

interface UiFormFieldSignature {
  Args: {
    errorMessage: unknown;
    isInline: unknown;
    isWide: unknown;
  };
  Blocks: {
    field: [unknown];
    label: [unknown];
  };
}

const UiFormField =
  templateOnlyComponent<UiFormFieldSignature>();

export default UiFormField;
