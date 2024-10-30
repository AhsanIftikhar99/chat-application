"use client";

import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormField {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  placeholder?: string;
  maxLength?: number;
}

interface TextInputFieldProps {
  field: FormField;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({ field }) => {
  return (
    <TextField
      {...field}
      id={field?.name}
      name={field?.name}
      label={field?.label}
      type={field?.type}
      variant="filled"
      onKeyDown={(event) => {
        if (field?.type === 'text') {
          const keyCode = event.keyCode || event.which;
          const keyValue = String.fromCharCode(keyCode);
          // Allow backspace key, enter key, and tab key
          if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 9) return;
          if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
        }
      }}
      sx={{
        '& .MuiFilledInput-root': {
          backgroundColor: 'white',
        },
        '& .MuiTextField-root': {
          backgroundColor: 'white',
        }
      }}
      fullWidth
      placeholder={field?.placeholder}
      InputProps={{
        disableUnderline: true,
        style: {
          background: 'white',
          border: '1px solid #eaeaea',
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%',
          fontSize: '1rem',
          lineHeight: '15px',
          height: '50px',
        },
        inputProps: {
          type: field?.type,
          maxLength: field?.maxLength,
        },
      }}
      InputLabelProps={{
        style: {
          fontSize: '14px',
          color: '#666666'
        },
      }}
    />
  );
};

export const EmailInput: React.FC<TextInputFieldProps> = ({ field }) => {
    return(
        <TextField
            id={field?.name}
            name={field?.name}
            label={field?.label}
            type={field?.type}
            variant="filled"
            onKeyDown={(event) => {
              if (field?.type === 'text') {
                const keyValue = event.key;
                const Validation = /^[a-zA-Z0-9@._-]*$/;
                // Allow backspace key, enter key, and tab key
                if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 9) return;
                if (!Validation.test(keyValue)) event.preventDefault();
              }
            }}
            sx={{
              '& .MuiFilledInput-root': {
                backgroundColor: 'white',
              },
              '& .MuiTextField-root': {
                backgroundColor: 'white',
              }
            }}
            fullWidth
            placeholder={field?.placeholder}
            InputProps={{
              disableUnderline: true,
              style: {
                background: 'white',
                border: '1px solid #eaeaea',
                borderRadius: '8px',
                maxWidth: '400px',
                width: '100%',
                fontSize: '1rem',
                lineHeight: '15px',
                height: '50px',

              },
              inputProps: {
                type: field?.type,
                maxLength: field?.maxLength,
              },
            }}
            InputLabelProps={{
              style: {
                fontSize: '1rem',
                color: '#666666',
                fontFamily: "ArticulatCF-Regular"
              },
            }}
          />
    )
}

export const PasswordInput: React.FC<{ field: any }> = ({ field }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <TextField
      id={field?.name}
      name={field?.name}
      label={field?.label}
      type={showPassword ? 'text' : 'password'}
      variant="filled"
      fullWidth
      sx={{ backgroundColor: 'white', borderRadius: '5px' }}
      InputProps={{
        disableUnderline: true,
        inputProps: {
          maxLength: 50,
        },
        sx: {
          paddingLeft: '10px',
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
      InputLabelProps={{
        sx: {
          paddingLeft: '10px',
          color: 'black',
        },
      }}
    />
  );
};