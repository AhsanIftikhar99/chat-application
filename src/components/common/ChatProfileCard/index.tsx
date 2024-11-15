import CustomButton from "@/components/GenericButton";
import axios, { getAxiosConfig } from "@/utils/axiosConfig";
import { User } from "@/utils/types";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import styles from "./index.module.scss";

type ChatProfileCardProps = {
  chatWithSpecificUser: string;
  cookies: string;
};

const ChatProfileCard = async ({ chatWithSpecificUser, cookies }: ChatProfileCardProps) => {
  let fetchedUser: User | null = null;
  let profilePictureUrl: string | null = null;

  try {
    const userResponse = await axios.get(`/api/users/getUserById/${chatWithSpecificUser}`, getAxiosConfig(cookies));
    fetchedUser = userResponse.data;

    // Check if `profilePicture` exists and is not a string
    if (fetchedUser?.profilePicture && typeof fetchedUser.profilePicture !== "string") {
      const base64String = Buffer.from(fetchedUser.profilePicture.data).toString("base64");
      profilePictureUrl = `data:image/png;base64,${base64String}`;
    }
  } catch (error) {
    console.error("Failed to fetch user by ID:", error);
  }

  console.log("profilePictureUrl", profilePictureUrl);
  console.log("fetchedUser", fetchedUser);

  return (
    <div className={styles.profileContainer}>
      {fetchedUser && (
        <div className={styles.wrapper}>
          <div className={styles.avatarContainer}>
            {!profilePictureUrl ? (
              <Avatar variant="rounded" className={styles.avatar}>
                <PersonIcon />
              </Avatar>
            ) : (
              <Avatar variant="rounded" src={profilePictureUrl} className={styles.avatar} />
            )}
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.displayName}>
              {fetchedUser.displayName}
              <span
                className={`${styles.statusDot} ${
                  fetchedUser.online ? styles.online : styles.offline
                }`}
              ></span>
            </h4>
          </div>
          <div className={styles.profileMessage}>
            <p>
              This conversation is just between
              <span> @{fetchedUser?.username}</span> and you. Check out their profile to learn more about them.
            </p>
          </div>
          <CustomButton
            title="View Profile"
            sx={{
              backgroundColor: "white",
              border: "0.5px solid #124766",
              color: "#08344D",
              marginTop: "12px",
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ChatProfileCard;
