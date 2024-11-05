// components/UserProfile.tsx

import React from 'react';
import { Avatar, Box, Typography } from '@mui/material';
import CustomButton from '@/components/GenericButton';
import styles from './index.module.scss';
import { User, UserProfileProps } from '@/utils/types';

const ChatProfileCard: React.FC<UserProfileProps> = ({ fetchedUser }) => {
  return (
    <Box className={styles.profileContainer}>
      {fetchedUser && (
        <Box sx={{ ml: '15px' }}>
          <Box className={styles.userInfo}>
            {!fetchedUser.icon ? (
              <Avatar variant="rounded" className={styles.avatar}>
                {fetchedUser.displayName.charAt(0)}
              </Avatar>
            ) : (
              <Avatar variant="square" src={fetchedUser.icon} />
            )}
          </Box>
          <Box className={styles.userDetails}>
            <Typography variant="h6" className={styles.displayName}>
              {fetchedUser.displayName}
            </Typography>
            {/* <Typography variant="body2" className={styles.username}>
              @{fetchedUser.username}
            </Typography> */}
          </Box>
          <Box className={styles.profileMessage}>
            <p>
              This conversation is just between
              <span> @{fetchedUser?.username}</span> and you. Check out their profile to learn more about them.
            </p>
          </Box>
          <CustomButton
            title="View Profile"
            sx={{
              backgroundColor: 'white',
              border: '1px solid #08344D',
              color: '#08344D',
              marginTop: '10px',
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChatProfileCard;
