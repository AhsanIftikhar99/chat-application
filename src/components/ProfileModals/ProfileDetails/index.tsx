"use client";
import CustomDialog from '@/components/common/GenericModal';
import CustomButton from '@/components/GenericButton';
import { useGetLoggedInUser } from '@/hooks/useGetLoggedInUser';
import { Avatar, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditProfileModal from '../EditProfile';
import styles from './index.module.scss';
import { User } from '@/utils/types';
import { useQueryClient } from "@tanstack/react-query";
import PersonIcon from "@mui/icons-material/Person";

type ProfileModalProps = {
  isOpen: boolean;
  editProfile?: boolean;
  userDataProp?: User;
  handleClose: () => void;
};

export const ProfileModal = ({ isOpen, handleClose, editProfile, userDataProp }: ProfileModalProps) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const queryClient = useQueryClient(); // Initialize query client

  // Conditionally fetch data only if `editProfile` is true
  const { data: loggedInUserFromQuery } = editProfile ? useGetLoggedInUser() : { data: undefined };

  // Decide which data to use
  const loggedInUser = editProfile ? loggedInUserFromQuery : userDataProp;

  useEffect(() => {
    if (loggedInUser?.profilePicture && typeof loggedInUser.profilePicture !== 'string') {
      const base64String = Buffer.from(loggedInUser.profilePicture.data).toString('base64');
      setProfilePictureUrl(`data:image/png;base64,${base64String}`);
    }
  }, [loggedInUser?.profilePicture]);

  const handleFormSubmit = (formData: { [key: string]: any }) => {
    console.log('Form data', formData);
  };

  const handleEditProfileClose = () => {
    queryClient.invalidateQueries({ queryKey: ["loggedInUser"] });
    setIsEditProfileOpen(false);
  };

  return (
    <>
      <CustomDialog
        title="Profile"
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        positionRight={true}
      >
        <div className={styles.avatarContainer}>
          <Avatar variant="square" className={styles.avatar}>
            {profilePictureUrl ? (
              <img src={profilePictureUrl} alt="profile" />
            ) : (
             <PersonIcon />
            )}
          </Avatar>
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.userNameWrapper}>
            <p className={styles.displayName}>{loggedInUser?.displayName}</p>
            {editProfile && <CustomButton
              title="Edit"
              onClick={() => setIsEditProfileOpen(true)}
              className={styles.editButton} // Use className instead of sx
            />}
          </div>
          <p className={styles.userNameStyles}>@{loggedInUser?.username}</p>
          <p className={styles.statusStyles}>
            {loggedInUser?.status}
          </p>
          <Divider />
          <div className={styles.titleAndButtonContainer}>
            <p className={styles.emailAddressLabel}>Email Address</p>
            {editProfile && <CustomButton
              title="Edit"
              className={styles.editButton} // Use className instead of sx
            />}
          </div>
          <p className={styles.emailAddressStyle}>{loggedInUser?.email}</p>
          <p className={styles.contactLabel}>Contact Number</p>
          <p className={styles.contactStyle}>{loggedInUser?.phoneNumber || 'N/A'}</p>
          {editProfile && <span className={styles.informationStyles}>+ Add Information</span>}
        </div>
      </CustomDialog>

      {loggedInUserFromQuery && (
        <EditProfileModal
          isOpen={isEditProfileOpen}
          userData={loggedInUserFromQuery}
          handleClose={handleEditProfileClose} // Pass handleEditProfileClose to refetch data on close
        />
      )}
    </>
  );
};
