"use client";

import { useGetDataFromServer } from "@/hooks/useGetDataFromServer";
import { User } from "@/utils/types";
import { Autocomplete, Avatar, Box, ListItemIcon, ListItemText, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";


/// it will be server side comp
export default function SearchUserField() {
  const router = useRouter();


  /// Make it server side fetch
  // Use the useGetDataFromServer hook to fetch users
  const { data: users = [], isLoading, isError } = useGetDataFromServer<User[]>({
    url: '/api/users/getAllUsers',
    queryKey: ['users'],
  });


  const onUserSelect = (user: User) => {
    console.log('Selected user:', user);
    router.push(`/directmessage/${user?.id}`);
  };


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


