import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { getInputProps } from "@/utils/helper";
import TextField from "@mui/material/TextField";
import React from "react";

export const MultilineInputField: React.FC<{ field: any }> = ({ field }) => {
  return (
    <TextField
      id={field?.name}
      autoComplete="off"
      name={field?.name}
      label={field?.label}
      type={field?.type || "text"} // Default to "text" for multiline
      variant={field?.variant || "filled"}
      multiline
      rows={6}
      sx={{
        width: "100%",
      }}
      onKeyDown={(event) => {
        if (field?.restrictInput) {
          const keyCode = event.keyCode || event.which;
          const keyValue = String.fromCharCode(keyCode);
          // Allow backspace key, enter key, and tab key
          if (
            event.keyCode === 8 ||
            event.keyCode === 13 ||
            event.keyCode === 9
          )
            return;
          // Restrict to only letters and spaces if specified
          if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
        }
      }}
    />
  );
};
