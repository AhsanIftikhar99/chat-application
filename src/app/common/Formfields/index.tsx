"use client";

import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import { IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { defaultFormFieldsSxStyles } from "@/app/utils/constants";
import { getInputProps } from "@/app/utils/helper";

interface FormField {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
}

interface FormFieldProps {
  field: FormField;
}

export const TextInputField: React.FC<FormFieldProps> = ({ field }) => {
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

export const EmailInput: React.FC<FormFieldProps> = ({ field }) => {
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
        }
      }}
    />
  );
};

export const PasswordInput: React.FC<{ field: any }> = ({ field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={field?.name}
      autoComplete="off"
      name={field?.name}
      label={field?.label}
      type={showPassword ? "text" : "password"}
      variant="filled"
      fullWidth
      sx={defaultFormFieldsSxStyles}
      InputProps={{
        ...getInputProps(field),
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

export const AppbarSearch: React.FC<FormFieldProps> = ({ field }) => {
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
      sx={{
        '& .MuiInputLabel-root ': {
          color: 'white',
        },
      }}
      InputLabelProps={{
        style: {
          color: 'white',
        },
      }}
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
