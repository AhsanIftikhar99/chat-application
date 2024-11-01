"use client";

import React, { useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import { Autocomplete, Avatar, Box, IconButton, InputAdornment, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { defaultFormFieldsSxStyles } from "@/utils/constants";
import { getInputProps } from "@/utils/helper";

interface FormField {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
}

type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
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

interface NewMessageFieldProps {
  users: User[];
  onUserSelect: (user: User) => void;
}

export default function NewMessageField({ users, onUserSelect }: NewMessageFieldProps) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '17px', fontWeight: 'bold', color: '#214F6D', minWidth: '40px' }} variant="body1">
          To:
        </Typography>
        <Autocomplete
          onChange={(event, value) => onUserSelect(value as User)}
          options={users}
          getOptionLabel={(option) => option.displayName} // Display name in the input
          disablePortal
          sx={{ width: '100%' }}
          renderInput={(params) =>
            <TextField
              {...params}
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
              }}
              variant="standard" placeholder="Select a user" />}
          renderOption={(props, option) => (
            <li {...props}>
              <ListItemIcon>
                {option.icon ? (
                  <img src={option.icon} alt={option.displayName} style={{ width: 24, height: 24 }} />
                ) : (
                  <Avatar>{option.displayName.charAt(0)}</Avatar>
                )}
              </ListItemIcon>
              <ListItemText primary={option.displayName} secondary={`@${option.username}`} />
            </li>
          )}
        />
      </Box>
    </Box>
  );
}


