import templateOnlyComponent from '@ember/component/template-only';

interface UiFormInformationSignature {
  Args: {
    formId: unknown;
    instructions: unknown;
    title: unknown;
  };
}

const UiFormInformation =
  templateOnlyComponent<UiFormInformationSignature>();

export default UiFormInformation;
