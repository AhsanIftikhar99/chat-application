import { EmailInput, PasswordInput, TextInputField } from "../Formfields"


interface FormBuilderProps {
    formFields: any;
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

    else if(TYPE === "password") {
      return (
       <PasswordInput field={formFields} />
      )
    }
    
  
}