import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { getInputProps } from "@/utils/helper";
import { FormField } from "@/utils/types";
import TextField from "@mui/material/TextField";
import React from "react";

export const TextInputField: React.FC<{field: FormField}> = ({ field }) => {
  return (
    <TextField
      id={field?.name}
      autoComplete="off"
      name={field?.name}
      label={field?.label}
      type={field?.type}  
      variant="filled"
      fullWidth
      placeholder={field?.placeholder}
      InputProps={getInputProps(field)}
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
