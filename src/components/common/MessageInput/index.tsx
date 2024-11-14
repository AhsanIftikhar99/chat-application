// src/app/chatwithuser/[chatWithSpecificUser ]/MessageInput.tsx

"use client";

import CustomButton from "@/components/GenericButton";
import useSocket from "@/hooks/useSocket";
import {  LoggedInUser, User } from "@/utils/types";
import SendIcon from "@mui/icons-material/Send";
import { Box } from "@mui/material";
import React, { useState } from "react";
import TextEditor from "../MessageEditor";
import styles from "./index.module.scss";

type MessageInputProps = {
  chatId: string;
  user: User;
  loggedInUser?: LoggedInUser;
};



const MessageInput: React.FC<MessageInputProps> = ({ chatId, user }) => {
  const socket = useSocket(chatId);
  const [message, setMessage] = useState<string>("");
  const LoggedInUser = user?.loggedUser

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        chatId,
        senderId: LoggedInUser?.id || "",
        content: message.replace(/<\/?p>/g, ""),
        messageType: "text",
        timestamp: new Date().toISOString(),
      };

      socket.emit("sendMessage", newMessage);
      setMessage("");
    }
  };

  return (
    <Box className={styles.editorContainer}>
      <TextEditor theme="snow" value={message} onChange={setMessage} className={styles.textEditor} />
      <CustomButton sx={{ flexShrink: 0 }} title="Send" icon={<SendIcon />} onClick={handleSendMessage} />
    </Box>
  );
};

export default MessageInput;
