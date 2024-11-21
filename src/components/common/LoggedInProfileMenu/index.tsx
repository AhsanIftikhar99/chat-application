"use client";

import React, { useState, useRef, useEffect } from "react";
import { AccountCircle } from "@mui/icons-material";
import styles from "./index.module.scss";

type ProfileMenuProps = {
  profilePictureUrl: string;
  onProfileClick: () => void;
  onLogoutClick: () => void;
};

const ProfileMenu: React.FC<ProfileMenuProps> = ({
  profilePictureUrl,
  onProfileClick,
  onLogoutClick,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  // Close menu when clicking outside
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
    <div className={styles.profileMenu}>
      <div className={styles.avatarBox} onClick={handleMenuToggle}>
        <div className={styles.avatar}>
          {profilePictureUrl ? (
            <img src={profilePictureUrl} alt="profile" />
          ) : (
            <AccountCircle style={{ color: "white", fontSize: 40 }} />
          )}
        </div>
        <div className={styles.statusIndicator} />
      </div>
      {menuOpen && (
        <div ref={menuRef} className={`${styles.menu} ${styles.menuOpen}`}>
          <div className={styles.menuItem} onClick={onProfileClick}>
            Profile
          </div>
          <div className={styles.menuItem} onClick={onLogoutClick}>
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
