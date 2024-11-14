// src/app/chatwithuser/[chatWithSpecificUser]/ChatContainer.tsx

import { Box } from "@mui/material";

import { fetchUserAndChat } from "@/app/chatwithuser/[chatWithSpecificUser]/_apis";
import { getCookieHeader } from "@/utils/helper/getCookieHeader";
import ChatProfileCard from "../ChatProfileCard";
import MessageInput from "../MessageInput";
import MessagesList from "../MessageList";
import styles from "./index.module.scss";
import { User } from "@/utils/types";



type ChatContainerProps = {
  chatWithSpecificUser: string;
};

export default async function ChatContainer({ chatWithSpecificUser }: ChatContainerProps): Promise<JSX.Element> {

  const cookieHeader = await getCookieHeader(); 
 
  const fetchUserAndChatData = await fetchUserAndChat(chatWithSpecificUser, cookieHeader)
  

  return (
    <Box className={styles.chatContainer}>
      <ChatProfileCard chatWithSpecificUser={chatWithSpecificUser} cookies={cookieHeader as string}/>
      <MessagesList user={fetchUserAndChatData as {}} chatId={fetchUserAndChatData?.chat?.id as string} />
      <MessageInput chatId={fetchUserAndChatData?.chat?.id as string} user={fetchUserAndChatData as User} />
    </Box>
  );
};


