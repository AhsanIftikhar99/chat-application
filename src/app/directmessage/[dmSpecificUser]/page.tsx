"use client";

import { Box, Avatar, Typography } from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Home from '../../home/page';
import styles from './index.module.scss';
import CustomButton from '@/components/GenericButton';
import { useParams } from 'next/navigation';
import MessageEditor from '@/common/MessageEditor';

// interface Params {
//   dmSpecificUser: string;
// }

type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
};

export default function DmSpecificUser() {
  const [user, setUser] = useState<User | null>(null);
  const params = useParams();

  const fetchUserById = async (userId: string) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`, {
        withCredentials: true,
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  useEffect(() => {
    if (typeof params?.dmSpecificUser === 'string') {
      fetchUserById(params.dmSpecificUser);
    }
  }, []);

  return (
    <Home>
      <Box className={styles.container}>
        <Box className={styles.profileContainer}>
          <Box sx={{ ml: '15px' }}>
            {user && (
              <>
                <Box className={styles.userInfo}>

                  {!user.icon ?
                    <Avatar variant='rounded' className={styles.avatar}>{user.displayName.charAt(0)}</Avatar>
                    :
                    (<Avatar variant='square' src={user.icon} />)
                  }
                </Box>
                <Box className={styles.userDetails}>
                  <Typography variant="h6" className={styles.displayName}>
                    {user.displayName}
                  </Typography>
                  <Typography variant="body2" className={styles.username}>
                    @{user.username}
                  </Typography>
                </Box>

              </>
            )}
            <Box className={styles.profileMessage}>
              <p>This conversation is just between
                <span> @{user?.username}</span> and you. Check out their profile to learn more about them.</p>
            </Box>
            <CustomButton title='View Profile' sx={{
              backgroundColor: "white",
              border: "1px solid #08344D",
              color: "#08344D",
              marginTop: '10px',
            }} />
          </Box>
        </Box>
        <Box sx={{width: '100%'}}>
        <MessageEditor />
        </Box>
      </Box>
    </Home>
  );
}