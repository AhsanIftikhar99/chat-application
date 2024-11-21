"use client";

import Loader from "@/components/Loader";
import { useQueryClient } from "@tanstack/react-query";
import { useGetMessages } from "@/hooks/useGetMessages";
import useSocket from "@/hooks/useSocket";
import { Message } from "@/utils/types";
import React, { useEffect, useRef } from "react";
import styles from "./index.module.scss";
import MessageAvatar from "../MessageAvatar";
import { SocketEvents } from "@/utils/enums";

type MessagesListProps = {
  user: any;
  chatId: string;
};

const MessagesList: React.FC<MessagesListProps> = ({ chatId, user }) => {
  const loggedInUser = user?.loggedUser;
  const socket = useSocket(chatId);
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const queryClient = useQueryClient();

  const { data: fetchedMessages = [], isLoading: isMessageLoading } = useGetMessages({ chatId });


  useEffect(() => {
    const handleNewMessage = (newMessage: Message) => {
      console.log("Socket listening:", newMessage);
      queryClient.setQueryData(["messages"], (oldMessages: Message[] | undefined) => {

        if (oldMessages?.find((msg) => msg.id === newMessage.id)) {
          return oldMessages;
        }

        return [...(oldMessages || []), newMessage];
      });

      // Scroll to the bottom for the new message
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    socket.on(SocketEvents.NEW_MESSAGE, handleNewMessage);

    return () => {
      socket.off(SocketEvents.NEW_MESSAGE, handleNewMessage);
    };
  }, [socket, queryClient]);

  // Auto-scroll to the bottom when fetched messages change
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [fetchedMessages]);

  const getDisplayName = (senderId: string) => {
    return senderId === user?.user?.id ? user.user?.displayName : loggedInUser?.displayName;
  };

  return (
    <div className={styles.messagesContainer}>
      {isMessageLoading && <Loader />}
      {fetchedMessages.map((msg) => (
        <div className={styles.messageRow} key={msg.id}>
          <MessageAvatar msg={msg} user={user} />
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
