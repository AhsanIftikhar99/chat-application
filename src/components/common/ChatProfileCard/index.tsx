// components/ChatProfileCard.tsx

import CustomButton from "@/components/GenericButton";
import axios, { getAxiosConfig } from "@/utils/axiosConfig";
import { User } from "@/utils/types";
import { Avatar, Box, Typography } from "@mui/material";
import styles from "./index.module.scss";

type ChatProfileCardProps = { 
  dmSpecificUser: string;
  cookies: string; 
};

const ChatProfileCard = async ({ dmSpecificUser , cookies}: ChatProfileCardProps) => {

  var fetchedUser: User | null = null;


  try {
    const userResponse = await axios.get(`/api/users/getUserById/${dmSpecificUser}`, getAxiosConfig(cookies));
    fetchedUser = userResponse.data;
  } catch (error) {
    console.error("Failed to fetch getUserById:", error);
  }


  return (
    <Box className={styles.profileContainer}>
      {fetchedUser && (
        <Box sx={{ ml: "15px" }}>
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
              backgroundColor: "white",
              border: "1px solid #08344D",
              color: "#08344D",
              marginTop: "5px",
            }}
          />
        </Box>
      )}
    </Box>
  );
};

export default ChatProfileCard;
