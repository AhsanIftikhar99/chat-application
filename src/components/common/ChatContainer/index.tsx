// components/ChatContainer.tsx
import React, { useEffect, useRef } from 'react';
import { Avatar, Box } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import styles from './index.module.scss';

type User = {
  id: string;
  displayName: string;
  username: string;
  icon?: string;
};

type Message = {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
};

type ChatContainerProps = {
  messages: Message[];
  user: User | null;
};

const ChatContainer: React.FC<ChatContainerProps> = ({ messages, user }) => {
  const LoggedInUser = JSON.parse(localStorage.getItem('user') || '{}');
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages are added
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const getDisplayName = (senderId: string) => {
    if (senderId === user?.id) {
      return user.displayName;
    } else if (senderId === LoggedInUser.id) {
      return LoggedInUser.displayName;
    }

  };

  return (
    <Box className={styles.chatContainer}>
      <Box className={styles.messagesContainer}>
        {messages.map((msg) => (
          <Box className={styles.messageRow} key={msg.id}>
            <Avatar variant="circular" className={styles.messageAvatar}>
              {msg.senderId === user?.id && user?.icon ? (
                <Avatar src={user?.icon} />
              ) : (
                <PersonIcon />
              )}
            </Avatar>
            <Box className={styles.messageContentWrapper}>
              <Box className={styles.messageHeader}>
                <h5 className={styles.messageSender}>{getDisplayName(msg.senderId)}</h5>
                <p className={styles.messageTimestamp}>
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true })}
                </p>
              </Box>
              <p className={styles.messageContent}>{msg.content}</p>
            </Box>
          </Box>
        ))}
        {/* Invisible div to ensure scrolling to the bottom */}
        <div ref={bottomRef} />
      </Box>
    </Box>
  );
};

export default ChatContainer;
