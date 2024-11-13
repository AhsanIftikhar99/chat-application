"use client";

import Loader from "@/components/Loader";
import { useGetMessages } from "@/hooks/useGetMessages";
import useSocket from "@/hooks/useSocket";
import { Message } from "@/utils/types";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

type MessagesListProps = {
  user: any;
  chatId: string;
};

const MessagesList: React.FC<MessagesListProps> = ({ chatId, user }) => {
  const loggedInUser=user?.loggedUser
  const socket = useSocket(chatId);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  console.log('user', user);

  // Fetch initial messages
  const { data: fetchedMessages = [], isLoading: isMessageLoading } = useGetMessages({ chatId });

  // Initialize messages state with fetched messages
  const [messages, setMessages] = useState<Message[]>(fetchedMessages);

  useEffect(() => {
    // Update messages when fetchedMessages changes
    setMessages(fetchedMessages);
  }, [fetchedMessages]);

  // Listen for new messages from socket
  useEffect(() => {
    socket.on("newMessage", (newMessage: Message) => {
      console.log("Socket listening:", newMessage);

      // Append new message to the current messages
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom when messages update
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getDisplayName = (senderId: string) => {
    return senderId === user?.user?.id ? user.user?.displayName : loggedInUser?.displayName;
  };

  return (
    <Box className={styles.messagesContainer}>
      {isMessageLoading && <Loader />}
      {messages.map((msg) => (
        <Box className={styles.messageRow} key={msg.id}>
          <Avatar variant="circular" className={styles.messageAvatar}>
            {msg.senderId === user?.id && user?.icon ? <Avatar src={user?.icon} /> : <PersonIcon />}
          </Avatar>
          <Box className={styles.messageContentWrapper}>
            <Box className={styles.messageHeader}>
              <h5 className={styles.messageSender}>{getDisplayName(msg.senderId)}</h5>
              <p className={styles.messageTimestamp}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </Box>
            <p className={styles.messageContent}>{msg.content}</p>
          </Box>
        </Box>
      ))}
      <div ref={bottomRef} />
    </Box>
  );
};

export default MessagesList;
