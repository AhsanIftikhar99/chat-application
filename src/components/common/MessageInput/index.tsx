// src/app/chatwithuser/[chatWithSpecificUser ]/MessageInput.tsx

"use client";

import CustomButton from "@/components/GenericButton";
import useSocket from "@/hooks/useSocket";
import { createNewMessage } from "@/utils/helper/messageUtils";
import { LoggedInUser, User } from "@/utils/types";
import SendIcon from "@mui/icons-material/Send";
import React, { useState } from "react";
import TextEditor from "../MessageEditor";
import styles from "./index.module.scss";
import sendIcon from "@/assets/images/sendIcon.svg"
import { SocketEvents } from "@/utils/enums";

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
      if(message.includes('<br>'))
        return
      const newMessage = createNewMessage(chatId, LoggedInUser?.id || "", message);
      socket.emit(SocketEvents.SEND_MESSAGE, newMessage);
      setMessage("");
    }
  };

  return (
    <div className={styles.editorContainer}>
      <div className={styles.texteditorWrapper}>
        <TextEditor onClick={handleSendMessage} theme="snow" value={message} onChange={setMessage} className={styles.textEditor} />
      </div>
    </div>
  );
};

export default MessageInput;
