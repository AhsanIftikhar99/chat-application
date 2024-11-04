import { defaultFormFieldsSxStyles } from "@/utils/constants";
import TextField from "@mui/material/TextField";
import React from "react";

type FormField = {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  minLength?: number;
}

export const TextInputField: React.FC<{ field: FormField }> = ({ field }) => {
  return (
    <TextField
      id={field.name}
      autoComplete="off"
      name={field.name}
      label={field.label}
      type={field.type}
      variant="filled"
      fullWidth
      placeholder={field.placeholder}
      inputProps={{
        maxLength: field.maxLength,
        required: field.required,
        pattern: field.pattern,
      }}
      onKeyDown={(event) => {
        if (field.type === "text") {
          const keyValue = event.key;
          if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
        }
      }}
      sx={defaultFormFieldsSxStyles}
    />
  );
};
