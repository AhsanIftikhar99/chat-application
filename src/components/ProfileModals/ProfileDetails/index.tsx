"use client";
import CustomDialog from '@/components/common/GenericModal';
import CustomButton from '@/components/GenericButton';
import { useGetLoggedInUser } from '@/hooks/useGetLoggedInUser';
import { Avatar, Divider } from '@mui/material';
import React, { useEffect, useState } from 'react';
import EditProfileModal from '../EditProfile';
import styles from './index.module.scss';
import { User } from '@/utils/types';
import { useQueryClient } from "@tanstack/react-query"; // Import useQueryClient

type ProfileModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ProfileModal = ({ isOpen, handleClose }: ProfileModalProps) => {
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState<string | null>(null);

  const queryClient = useQueryClient(); // Initialize query client

  const { data: loggedInUser = {} as User } = useGetLoggedInUser();


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
              <span>{loggedInUser?.displayName?.[0]}</span> // Placeholder if no image
            )}
          </Avatar>
        </div>
        
        <div className={styles.contentWrapper}>
          <div className={styles.userNameWrapper}>
          <p className={styles.displayName}>{loggedInUser?.displayName}</p>
          <CustomButton
            title="Edit"
            onClick={() => setIsEditProfileOpen(true)}
            sx={{
              backgroundColor: "#BCE1FF",
              color: "#06334D",
              width: "40px !important",
              minWidth: "0 !important",
              height: "24px",
              fontSize: '12px !important',
            }}
          />
        </div>
        <p className={styles.userNameStyles}>@{loggedInUser?.username}</p>
        <p className={styles.statusStyles}>
          {loggedInUser?.status}
        </p>
        <Divider />
        <div className={styles.titleAndButtonContainer}>
          <p className={styles.emailAddressLabel}>Email Address</p>
          <CustomButton
            title="Edit"
            sx={{
              backgroundColor: "#BCE1FF",
              color: "#06334D",
              width: "40px !important",
              minWidth: "0 !important",
              height: "24px",
              fontSize: '12px !important',
            }}
          />
        </div>
        <p className={styles.emailAddressStyle}>{loggedInUser?.email}</p>
        <p className={styles.contactLabel}>Contact Number</p>
        <p className={styles.contactStyle}>{loggedInUser?.phoneNumber}</p>
        <span className={styles.informationStyles}>+ Add Information</span>
        </div>
      </CustomDialog>

      <EditProfileModal
        isOpen={isEditProfileOpen}
        userData={loggedInUser}
        handleClose={handleEditProfileClose} // Pass handleEditProfileClose to refetch data on close
      />
    </>
  );
};
