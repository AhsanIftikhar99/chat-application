import { Control, FieldErrors } from "react-hook-form";
import { AlphaNumericField } from "../Formfields/AlphaNumeric/AlphanumericField";
import EmailInput from "../Formfields/EmailField";
import { PasswordInput } from "../Formfields/Password/Password";
import MultilineInputField from "../Formfields/TextArea";
import TextInputField from "../Formfields/TextField";
import { FormField } from "@/utils/types";

type FormBuilderProps = {
  formFields: FormField;
  control: Control;
};

export const FormBuilder: React.FC<FormBuilderProps> = ({ formFields, control }) => {
  const TYPE = formFields?.type;

  if (TYPE === "text") {
    return (
      <>
        <TextInputField field={formFields} control={control} />
      </>
    );
  } else if (TYPE === "email") {
    return (
      <>
        <EmailInput control={control} field={formFields} />
      </>
    );
  } else if (TYPE === "alphanumeric") {
    return (
      <>
        <AlphaNumericField field={formFields} control={control} />
      </>
    );
  } else if (TYPE === "password") {
    return (
      <>
        <PasswordInput field={formFields} control={control} />
      </>
    );
  } else if (TYPE === "textarea") {
    return (
      <>
        <MultilineInputField field={formFields} control={control} />
      </>
    );
  } else {
    return null;
  }
};
