import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { getInputProps } from "@/utils/helper";
import TextField from "@mui/material/TextField";
import React from "react";

interface FieldProps {
  name: string;
  label: string;
  type: string;
  variant?: "filled" | "outlined" | "standard";
  placeholder?: string;
  maxLength?: number | string;
  minLength?: number | string;
  defaultValue?: string;
  value?: string;
}

interface TextInputFieldProps {
  field: FieldProps;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({ field }) => {
  return (
    <TextField
      id={field?.name}
      autoComplete="off"
      name={field?.name}
      label={field?.label}
      defaultValue={field?.defaultValue}
      type={field?.type}
      variant={field?.variant || "filled"}
      fullWidth
      placeholder={field?.placeholder}
      InputProps={getInputProps(field)}
      slotProps={{htmlInput: {maxLength: field?.maxLength, minLength: field?.minLength}}}
      sx={defaultFormFieldsSxStyles}
      onKeyDown={(event) => {
        if (field?.type === "text") {
          const keyCode = event.keyCode || event.which;
          const keyValue = String.fromCharCode(keyCode);
          // Allow backspace key, enter key, and tab key
          if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 9
          )
            return;
          if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
        }
      }}
    />
  );
};
