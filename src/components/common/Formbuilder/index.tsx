import { FormField } from "@/utils/types";
import { AlphaNumericField } from "../Formfields/AlphaNumeric/AlphanumericField";
import EmailInput from "../Formfields/EmailField";
import { PasswordInput } from "../Formfields/Password/Password";
import MultilineInputField from "../Formfields/TextArea";
import TextInputField from "../Formfields/TextField";


type FormBuilderProps = {
    formFields: FormField;
}


export const FormBuilder:React.FC<FormBuilderProps> = ({formFields }) => {
    const TYPE = formFields?.type
  
    if(TYPE === 'text') {
      return (
       <TextInputField field={formFields}  />
      )
    }

    else if(TYPE === 'email') {
      return (
       <EmailInput field={formFields} />
      )
    }

    else if(TYPE === 'alphanumeric') {
      return (
       <AlphaNumericField field={formFields} />
      )
    }

    else if(TYPE === "password") {
      return (
       <PasswordInput field={formFields} />
      )
    }

    else if(TYPE === "textarea") {
      return (
       <MultilineInputField field={formFields} />
      )
    }
   
    else 
    return null
    
  
}