"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./index.module.scss";

type DirectMessagesListProps = {
  users: {
    userid: string;
    displayName?: string;
    username: string;
    profilePicture?: string;
    online?: boolean; // Add the online status here
  }[];
  currentPath: string;
};

export default function DirectMessagesList({ users, currentPath }: DirectMessagesListProps) {
  const pathname = usePathname();
  const selectedUserId = pathname.split("/")[2]; // Assuming path is /chatwithuser/[userid]
  const [isOpen, setIsOpen] = useState(!!selectedUserId);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  console.log('USERS', users);

  return (
    <>
      <div className={`${styles.listItem} ${currentPath === "/chatwithuser" ? styles.selected : ""}`}>
        <button className={styles.listItemButton}>
          <span className={styles.directMessagesText}>Groups</span>
          <KeyboardArrowRightIcon className={styles.icon} />
        </button>
      </div>
      <div className={`${styles.listItem} ${currentPath === "/chatwithuser" ? styles.selected : ""}`}>
        <button onClick={handleToggle} className={styles.listItemButton}>
          <span className={styles.directMessagesText}>Direct Messages</span>
          {isOpen ? (
            <KeyboardArrowDownIcon className={styles.icon} />
          ) : (
            <KeyboardArrowRightIcon className={styles.icon} />
          )}
        </button>
      </div>

      <div className={`${styles.collapse} ${isOpen ? styles.collapseOpen : ""}`}>
        {isOpen &&
          users.map((user) => {
            const isSelected = selectedUserId === user.userid;
            return (
              <div key={user.userid} className={`${styles.userItem} ${isSelected ? styles.selectedUser : ""}`}>
                <Link href={`/chatwithuser/${user.userid}`} passHref>
                  <div className={styles.userButton}>
                    <div className={styles.avatarContainer}>
                      {user.profilePicture ? (
                        <img src={user.profilePicture} alt="Profile" className={styles.avatar} />
                      ) : (
                        <AccountCircleIcon className={styles.defaultAvatar} />
                      )}
                      <span
                        className={`${styles.onlineStatus} ${
                          user.online ? styles.online : styles.offline
                        }`}
                      ></span>
                    </div>
                    <span className={styles.userName}>{user.displayName || user.username}</span>
                  </div>
                </Link>
              </div>
            );
          })}
      </div>
    </>
  );
}
