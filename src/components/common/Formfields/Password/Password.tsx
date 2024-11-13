"use client";

import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { FormFieldProps } from "@/utils/types";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export const PasswordInput: React.FC<FormFieldProps> = ({ field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={field.name}
      autoComplete="off"
      name={field.name}
      label={field.label}
      type={showPassword ? "text" : "password"}
      variant="filled"
      fullWidth
      slotProps={{htmlInput: {maxLength: field?.maxLength, minLength: field?.minLength}}}
      sx={defaultFormFieldsSxStyles}
      InputProps={{
        disableUnderline: true,
        style: {
          background:  "white",
          border: "1px solid #eaeaea",
          borderRadius: "8px",
          maxWidth: "400px",
          width: "100%",
          height: "48px",
          color: "#08344D",
        },
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};