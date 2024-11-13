// src/app/directmessage/[dmSpecificUser]/ChatContainer.tsx

import { Box } from "@mui/material";

import { fetchUserAndChat } from "@/app/directmessage/[dmSpecificUser]/_apis";
import { getCookieHeader } from "@/utils/helper/getCookieHeader";
import ChatProfileCard from "../ChatProfileCard";
import MessageInput from "../MessageInput";
import MessagesList from "../MessageList";
import styles from "./index.module.scss";
import { User } from "@/utils/types";



type ChatContainerProps = {
  dmSpecificUser: string;
};

export default async function ChatContainer({ dmSpecificUser }: ChatContainerProps): Promise<JSX.Element> {

  const cookieHeader = await getCookieHeader(); 
 
  const fetchUserAndChatData = await fetchUserAndChat(dmSpecificUser, cookieHeader)
  

  return (
    <Box className={styles.chatContainer}>
      <ChatProfileCard dmSpecificUser={dmSpecificUser} cookies={cookieHeader as string}/>
      <MessagesList user={fetchUserAndChatData as {}} chatId={fetchUserAndChatData?.chat?.id as string} />
      <MessageInput chatId={fetchUserAndChatData?.chat?.id as string} user={fetchUserAndChatData as User} />
    </Box>
  );
};


