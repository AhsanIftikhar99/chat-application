"use client";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import styles from "./index.module.scss";
import { User } from "@/utils/types";
import { useGetUsers } from "@/hooks/useGetUser";
import { useRouter } from "next/navigation";

export default function SearchUserField() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const { data: users = [], isLoading, isError } = useGetUsers();

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);

    // Filter users based on the search term
    const filtered = users.filter((user) =>
      user.displayName.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setFilteredUsers(users); // Display the full list when focused
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay hiding to allow click selection
  };

  const handleUserSelect = (user: User) => {
    router.push(`/chatwithuser/${user.id}`); // Redirect to chat with user
    setSearchTerm(""); // Clear the input field after selection
  };

  return (
    <div className={styles.searchContainer}>
      <div className={styles.toContainer}>
        <p className={styles.toLabel}>To:</p>
        <input
          type="text"
          placeholder="Search users"
          className={styles.inputField}
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </div>
      {isFocused && filteredUsers.length > 0 && (
        <div className={styles.suggestionsContainer}>
          {filteredUsers.map((user: User) => (
            <div
              key={user.id}
              className={styles.suggestionItem}
              onMouseDown={() => handleUserSelect(user)} // Ensure selection works before blur
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
          ))}
        </div>
      )}
      {isFocused && filteredUsers.length === 0 && (
        <div className={styles.noResultsContainer}>
          <p className={styles.noResultsText}>No users found</p>
        </div>
      )}
    </div>
  );
}
