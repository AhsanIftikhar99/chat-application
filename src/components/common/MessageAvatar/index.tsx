import { Avatar } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import styles from "./index.module.scss";

const getAvatarSrc = (msgSenderId: string, user: any) => {
  if (msgSenderId === user?.user?.id) {
    // If the sender is the logged-in user
    if (user?.user?.profilePicture?.data) {
      return `data:image/png;base64,${Buffer.from(
        user.user.profilePicture.data
      ).toString("base64")}`;
    }
  } else {
    // If the sender is another user
    if (user?.loggedUser?.profilePicture?.data) {
      return `data:image/png;base64,${Buffer.from(
        user.loggedUser.profilePicture.data
      ).toString("base64")}`;
    }
  }
  // Return null if no profile picture is available
  return null;
};

const MessageAvatar = ({ msg, user }: any) => {
  const avatarSrc = getAvatarSrc(msg.senderId, user);

  return (
    <Avatar variant="circular" className={styles.messageAvatar}>
      {avatarSrc ? (
        <Avatar src={avatarSrc} />
      ) : (
        <PersonIcon />
      )}
    </Avatar>
  );
};

export default MessageAvatar;
