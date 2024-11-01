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

// export default function TextFieldWithMenu({ users }: { users: User[] }) {
//   const [inputValue, setInputValue] = useState('');
//   const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
//   const inputRef = useRef<HTMLInputElement>(null);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (anchorEl && inputRef.current && !inputRef.current.contains(event.target as Node)) {
//         setAnchorEl(null);
//       }
//     };

//     document.addEventListener('click', handleClickOutside);
//     return () => {
//       document.removeEventListener('click', handleClickOutside);
//     };
//   }, [anchorEl]);

//   const handleInputClick = (event: React.MouseEvent<HTMLInputElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuItemClick = (user: any) => {
//     setInputValue(user.displayName);
//     setAnchorEl(null);
//   };

//   return (
// <Box>
//   <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, }}>
//   <Typography sx={{ fontSize: '17px', fontWeight: 'bold' , color:'#214F6D',minWidth:'40px'}} variant="body1">
//     To :
//   </Typography>
//       <TextField
//         value={inputValue}
//         onClick={handleInputClick}
//         inputRef={inputRef}
//         variant="standard"
//         placeholder="Select a user"
//         fullWidth
//         InputProps={{
//           disableUnderline: true,
//           style: {
//             background: 'none',
//             border: 'none',
//             outline: 'none',
//             fontSize: '16px',
//           },
//         }}
//         sx={{
//           ml: 1,
//           '& .MuiInputBase-input': {
//             padding: 0,
//           },
//         }}
//       />
//        </Box>
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={() => setAnchorEl(null)}
//         PaperProps={{
//           style: {
//             maxHeight: 300,
//             width: '100%',
//             maxWidth: '1100px',
//           },
//         }}
//       >
//         {users.map((user: any) => (
//           <MenuItem key={user.id} onClick={() => handleMenuItemClick(user)}>
//             <ListItemIcon>
//               {user.icon ? (
//                 <img src={user.icon} alt={user.displayName} style={{ width: 24, height: 24 }} />
//               ) : (
//                 <Avatar sx={{ width:'40px', height:'40px', mr:'10px'}}>{user.displayName.charAt(0)}</Avatar>
//               )}
//             </ListItemIcon>
//             <ListItemText sx={{'& .MuiTypography-root':{fontSize:'13px'}}} primary={user.displayName} secondary={`@${user.username}`} />
//           </MenuItem>
//         ))}
//       </Menu>
//     </Box>
//   );
// }


export default function UserAutocomplete({ users }: { users: User[] }) {
  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, }}>
        <Typography sx={{ fontSize: '17px', fontWeight: 'bold', color: '#214F6D', minWidth: '40px' }} variant="body1">
          To :
        </Typography>
        <Autocomplete
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
};


