"use client";
import React from 'react';
import CustomDialog from '@/components/common/GenericModal';
import { Avatar, Box, Divider } from '@mui/material';
import CustomButton from '@/components/GenericButton';
import styles from './index.module.scss';
import EditProfileModal from '../EditProfile';
import { useFetch } from '@/hooks/useFetch';
import { User } from '@/utils/types';

type ProfileModalProps = {
  isOpen: boolean;
  handleClose: () => void;
};

export const ProfileModal = ({ isOpen, handleClose }: ProfileModalProps) => {
  const handleFormSubmit = (formData: { [key: string]: any }) => {
    console.log('Form data', formData);
  };

  const { data: loggedInUser = [], isLoading, isError } = useFetch<any>({
    url: '/api/users/getLoggedInUser',
    queryKey: ['getLoggedInUser'],
  });

  console.log('loggedInUser', loggedInUser);

  // State to control the visibility of the EditProfileModal
  const [isEditProfileOpen, setIsEditProfileOpen] = React.useState(false);

  return (
    <>
      <CustomDialog
        title="Profile"
        open={isOpen}
        onClose={handleClose}
        onSubmit={handleFormSubmit}
        positionRight={true}
      >
        {/* Custom content for the ProfileModal */}
        <div className={styles.avatarContainer}>
          <Avatar variant="square" className={styles.avatar}>
            {loggedInUser?.profilePicture && <img src={loggedInUser?.profilePicture} alt="profile" />}
          </Avatar>
        </div>
        <div className={styles.userNameWrapper}>
          <p className={styles.displayName}>{loggedInUser?.displayName}</p>
          <CustomButton
            title="Edit"
            onClick={() => setIsEditProfileOpen(true)} // Open the EditProfileModal
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
        {loggedInUser?.staus}
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
      </CustomDialog>

      {/* Render EditProfileModal without closing the ProfileModal */}
      <EditProfileModal
        isOpen={isEditProfileOpen}
        handleClose={() => setIsEditProfileOpen(false)}
      />
    </>
  );
};
