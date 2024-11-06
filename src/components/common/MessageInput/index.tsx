// src/app/directmessage/[dmSpecificUser]/MessageInput.tsx

"use client";

import React, { useState } from "react";
import { Box } from "@mui/material";
import TextEditor from "../MessageEditor";
import CustomButton from "@/components/GenericButton";
import SendIcon from "@mui/icons-material/Send";
import useSocket from "@/hooks/useSocket";
import styles from "./index.module.scss";
import { User } from "@/utils/types";
import { AnySoaRecord } from "dns";

type MessageInputProps = {
  chatId: string;
  user: any;
};

const MessageInput: React.FC<MessageInputProps> = ({ chatId, user }) => {
  const socket = useSocket(chatId);
  const [message, setMessage] = useState<string>("");
  const loggedInUser = user?.loggedUser;

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        chatId,
        senderId: loggedInUser.id,
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
