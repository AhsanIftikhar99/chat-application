// components/ProfileContainer.tsx
import { Avatar, Box, Typography } from '@mui/material';
import CustomButton from '@/components/GenericButton';
import styles from './index.module.scss';
import { useEffect, useState } from 'react';
import axios from '@/utils/axiosConfig';


type User = {
    id: string;
    displayName: string;
    username: string;
    icon?: string;
  };
  
  type ChatProfileCardProps = {
      userId: string;
      setChatId: (id: string) => void; // Only accept string, no null
      setShowLoader: (loading: boolean) => void;
    };
    
  
  const ChatProfileCard = ({ userId, setChatId, setShowLoader }: ChatProfileCardProps) => {
    const [user, setUser] = useState<User | null>(null);
  
    useEffect(() => {
      const fetchUserAndChat = async () => {
        setShowLoader(true);
        try {
          const userResponse = await axios.get(`/api/users/${userId}`, { withCredentials: true });
          setUser(userResponse.data);
          
          // Fetch chatId for the user
          const chatResponse = await axios.get(`/api/chats/${userId}`, { withCredentials: true });
          setChatId(chatResponse.data.chatId);
        } catch (error) {
          console.error('Error fetching user or chat:', error);
        } finally {
          setShowLoader(false);
        }
      };
  
      fetchUserAndChat();
    }, [userId, setChatId, setShowLoader]);
  
    if (!user) return null;
  return (
    <Box className={styles.profileContainer}>
      <Box sx={{ ml: '15px' }}>
        <Box className={styles.userInfo}>
          {!user.icon ? (
            <Avatar variant="rounded" className={styles.avatar}>
              {user.displayName.charAt(0)}
            </Avatar>
          ) : (
            <Avatar variant="square" src={user.icon} />
          )}
        </Box>
        <Box className={styles.userDetails}>
          <Typography variant="h6" className={styles.displayName}>
            {user.displayName}
          </Typography>
          <Typography variant="body2" className={styles.username}>
            @{user.username}
          </Typography>
        </Box>
        <Box className={styles.profileMessage}>
          <p>
            This conversation is just between
            <span> @{user.username}</span> and you. Check out their profile to learn more about them.
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
    </Box>
  );
};

export default ChatProfileCard;
