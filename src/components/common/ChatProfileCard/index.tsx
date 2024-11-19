// components/ChatProfileCard.tsx
"use client"
import CustomButton from "@/components/GenericButton";
import Loader from "@/components/Loader";
import { ProfileModal } from "@/components/ProfileModals/ProfileDetails";
import { useFetch } from "@/hooks/useFetch";
import { User } from "@/utils/types";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import styles from "./index.module.scss";

type ChatProfileCardProps = {
  chatWithSpecificUser: string;
  cookies: string;
};

const ChatProfileCard = ({ chatWithSpecificUser, cookies }: ChatProfileCardProps) => {


  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);
  const [openProfileModal, setOpenProfileModal] = useState(false);

  const handleProfileModalClose = () => setOpenProfileModal(false);

  const { data: fetchedUser, isLoading } = useFetch<User>({
    url: `/api/users/getUserById/${chatWithSpecificUser}`,
    queryKey: ["userData"],
  });

  useEffect(() => {
    console.log("fetchedUser", fetchedUser);
    if (fetchedUser?.profilePicture && typeof fetchedUser.profilePicture !== 'string') {
      const base64String = Buffer.from(fetchedUser.profilePicture.data).toString('base64');
      setProfilePictureUrl(`data:image/png;base64,${base64String}`);
    }
  }
    , [fetchedUser?.profilePicture]);

  console.log('profilePictureUrl', profilePictureUrl);

  console.log("fetchedUser", fetchedUser);
  return (
    <div className={styles.profileContainer}>
      {isLoading && <Loader />}
      {fetchedUser && (
        <div className={styles.wrapper}>
          <div className={styles.avatarContainer}>
            {profilePictureUrl === null ? (
              <Avatar variant="rounded" className={styles.avatar}>
                <PersonIcon />
              </Avatar>
            ) : (
              <Avatar variant="square" className={styles.avatar} src={profilePictureUrl || undefined} />
            )}
          </div>
          <div className={styles.userDetails}>
            <h4 className={styles.displayName}>
              {fetchedUser.displayName}
              <span
                className={`${styles.statusDot} ${fetchedUser.online ? styles.online : styles.offline
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
            className={styles.viewProfileButton}
            onClick={() => setOpenProfileModal(true)}
          />
        </div>
      )}

      <ProfileModal isOpen={openProfileModal} editProfile={false} handleClose={handleProfileModalClose} userDataProp={fetchedUser} />
    </div>
  );
};

export default ChatProfileCard;
