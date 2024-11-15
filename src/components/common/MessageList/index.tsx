"use client";

import Loader from "@/components/Loader";
import { useGetMessages } from "@/hooks/useGetMessages";
import useSocket from "@/hooks/useSocket";
import { Message } from "@/utils/types";
import PersonIcon from "@mui/icons-material/Person";
import { Avatar } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import styles from "./index.module.scss";

type MessagesListProps = {
  user: any;
  chatId: string;
  chatWithSpecificUser?: string;
  cookieHeader?: string;
};

const MessagesList: React.FC<MessagesListProps> = ({ chatId, user, chatWithSpecificUser, cookieHeader }) => {
  const loggedInUser = user?.loggedUser
  const socket = useSocket(chatId);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  console.log('user', user);


  const { data: fetchedMessages = [], isLoading: isMessageLoading } = useGetMessages({ chatId });
  const [messages, setMessages] = useState<Message[]>(fetchedMessages);

  useEffect(() => {

    setMessages(fetchedMessages);
  }, [fetchedMessages]);


  useEffect(() => {
    socket.on("newMessage", (newMessage: Message) => {
      console.log("Socket listening:", newMessage);


      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("newMessage");
    };
  }, [socket]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getDisplayName = (senderId: string) => {
    return senderId === user?.user?.id ? user.user?.displayName : loggedInUser?.displayName;
  };

  return (
    <div className={styles.messagesContainer}>
      {/* <ChatProfileCard chatWithSpecificUser={chatWithSpecificUser} cookies={cookieHeader as string} /> */}
      {isMessageLoading && <Loader />}
      {messages.map((msg) => (
        <div className={styles.messageRow} key={msg.id}>
          <Avatar variant="circular" className={styles.messageAvatar}>
            {msg.senderId === user?.id && user?.icon ? <Avatar src={user?.icon} /> : <PersonIcon />}
          </Avatar>
          <div className={styles.messageContentWrapper}>
            <div className={styles.messageHeader}>
              <h5 className={styles.messageSender}>{getDisplayName(msg.senderId)}</h5>
              <p className={styles.messageTimestamp}>
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })}
              </p>
            </div>
            <p className={styles.messageContent}>{msg.content}</p>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesList;
