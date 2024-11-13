import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { getInputProps } from "@/utils/helper";
import { FormFieldProps } from "@/utils/types";
import TextField from "@mui/material/TextField";
import React from "react";


export const EmailInput: React.FC<FormFieldProps> = ({ field }) => {
  return (
    <TextField
      id={field?.name}
      autoComplete="off"
      name={field?.name}
      label={field?.label}
      type='email'
      variant="filled"
      fullWidth
      placeholder={field?.placeholder}
      InputProps={getInputProps(field)}
      slotProps={{htmlInput: {maxLength: field?.maxLength, minLength: field?.minLength}}}
      sx={defaultFormFieldsSxStyles}
      onKeyDown={(event) => {
          const keyValue = event.key;
          const Validation = /^[a-zA-Z0-9@._-]*$/;
          // Allow backspace key, enter key, and tab key
          if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 9
          )
            return;
          if (!Validation.test(keyValue)) event.preventDefault();
      }}
    />
  );
};