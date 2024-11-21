"use client";
import React, { useEffect, useRef, useState } from 'react';
import { userLogout } from '@/api/user';
import { ProfileModal } from '@/components/ProfileModals/ProfileDetails';
import { useGetLoggedInUser } from '@/hooks/useGetLoggedInUser';
import { User } from '@/utils/types';

import {
  AccountCircle,
  ChatBubble as ChatBubbleIcon,
  Groups as GroupsIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  LocalParking as LocalParkingIcon,
} from "@mui/icons-material";
import styles from "./index.module.scss";
import ProfileMenu from '../LoggedInProfileMenu';

const listItems = [
  { text: "Home", icon: <HomeIcon className={styles.icon} /> },
  { text: "Groups", icon: <GroupsIcon className={styles.icon} /> },
  { text: "Chat", icon: <ChatBubbleIcon className={styles.icon} /> },
  { text: "Notifications", icon: <NotificationsIcon className={styles.icon} /> },
  { text: "More", icon: <MoreVertIcon className={styles.icon} /> },
];

export default function Sidebar() {
  const [openProfileModal, setOpenProfileModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [profilePictureUrl, setProfilePictureUrl] = useState('');
  const { data: loggedInUser = {} as User } = useGetLoggedInUser();

  // Ref for the menu element
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loggedInUser?.profilePicture && typeof loggedInUser.profilePicture !== 'string') {
      const base64String = Buffer.from(loggedInUser.profilePicture.data).toString('base64');
      setProfilePictureUrl(`data:image/png;base64,${base64String}`);
    }
  }, [loggedInUser?.profilePicture]);

  const handleProfileModalClose = () => setOpenProfileModal(false);
  const handleProfileModalOpen = () => setOpenProfileModal(true);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = async () => {
    const logout = await userLogout();
    if (logout) {
      window.location.href = '/';
    }
  };

  // Close menu if clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <div className={styles.drawer}>
      <div className={styles.toolbar}>
        <div className={styles.logoBox}>
          <LocalParkingIcon style={{ color: "white" }} />
        </div>
      </div>
      <div className={styles.listContainer}>
        {listItems.map((item, index) => (
          <div key={index} className={styles.listItem}>
            {item.icon}
          </div>
        ))}
      </div>
      <div className={styles.flexGrow} />
      <div className={styles.profileBox}>
        <div className={styles.addButton}>
          <AddIcon className={styles.addIcon} />
        </div>
        <ProfileMenu
          profilePictureUrl={profilePictureUrl}
          onProfileClick={handleProfileModalOpen}
          onLogoutClick={handleLogout}
        />
      </div>
      <ProfileModal isOpen={openProfileModal} editProfile={true} handleClose={handleProfileModalClose} />
    </div>
  );
}
