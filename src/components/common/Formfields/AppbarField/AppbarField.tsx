"use client";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import styles from "./index.module.scss";
import { User } from "@/utils/types";
import { useGetUsers } from "@/hooks/useGetUser";
import { useRouter } from "next/navigation";


export const AppbarSearch: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFocused, setIsFocused] = useState(false); // Tracks input focus
  const [isSelecting, setIsSelecting] = useState(false); // Tracks whether a user is being selected

  const { data: users = [], isLoading, isError } = useGetUsers();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter users based on input value (case-insensitive match)
    const filtered = users.filter((user) =>
      user.displayName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setFilteredUsers(users); // Show the entire user list when focused
  };

  const handleBlur = () => {
    if (!isSelecting) {
      // Only hide suggestions if not selecting a user
      setIsFocused(false);
    }
  };

  const onUserSelect = (user: User) => {
    setIsSelecting(true); // Prevent onBlur from hiding the list
    router.push(`/chatwithuser/${user.id}`);
    setTimeout(() => setIsSelecting(false), 100); // Reset isSelecting after routing
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search users"
        className={styles.inputField}
        value={searchTerm}
        onChange={handleInputChange}
        onFocus={handleFocus} // Show suggestions on focus
        onBlur={handleBlur} // Hide suggestions on blur
      />
      {isFocused && (
        <div className={styles.suggestionsContainer}>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user: User) => (
              <div
                key={user.id}
                className={styles.suggestionItem}
                onMouseDown={() => onUserSelect(user)} // Use onMouseDown to handle selection before blur
              >
                <div className={styles.avatarContainer}>
                  {user.profilePicture &&
                  typeof user.profilePicture !== "string" &&
                  user.profilePicture.data ? (
                    <Avatar
                      src={`data:image/png;base64,${Buffer.from(
                        user.profilePicture.data
                      ).toString("base64")}`}
                      className={styles.avatar}
                    />
                  ) : (
                    <PersonIcon className={styles.defaultIcon} />
                  )}
                  <span
                    className={`${styles.onlineStatus} ${
                      user.online ? styles.online : styles.offline
                    }`}
                  ></span>
                </div>
                <div className={styles.userInfo}>
                  <p className={styles.displayName}>{user.displayName}</p>
                  <p className={styles.status}>{user.status}</p>
                </div>
              </div>
            ))
          ) : (
            <p className={styles.noResults}>No users found</p>
          )}
        </div>
      )}
    </div>
  );
};
