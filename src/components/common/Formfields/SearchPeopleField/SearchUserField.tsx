"use client";

import Loader from "@/components/Loader";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/utils/types";
import { Autocomplete, Avatar, Box, ListItemIcon, ListItemText, Typography } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useRouter } from "next/navigation";

export default function SearchUserField() {
  const router = useRouter();

  const { data: users = [], isLoading, isError } = useFetch<User[]>({
    url: '/api/users/getAllUsers',
    queryKey: ['users'],
  });

  const onUserSelect = (user: User) => {
    console.log('Selected user:', user);
    router.push(`/directmessage/${user?.id}`);
  };

  return (
    <Box>
      {isLoading && <Loader />}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography sx={{ fontSize: '17px', fontWeight: 'bold', color: '#214F6D', minWidth: '40px' }} variant="body1">
          To:
        </Typography>
        <Autocomplete
          onChange={(event, value) => onUserSelect(value as User)}
          options={users}
          getOptionLabel={(option) => option.displayName}
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
          renderOption={({ key, ...props }, option) => ( // Destructure `key` out of props
            <li key={option.id} {...props}>
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
