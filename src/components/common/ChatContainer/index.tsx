// src/app/directmessage/[dmSpecificUser]/ChatContainer.tsx

import { Box } from "@mui/material";

import { fetchUserAndChat } from "@/app/directmessage/[dmSpecificUser]/_apis";
import { User } from "@/utils/types";
import MessageInput from "../MessageInput";
import MessagesList from "../MessageList";
import styles from "./index.module.scss";
import { decryptToken } from "@/utils/helper/auth";



type ChatContainerProps = {
  dmSpecificUser: string;
  cookies: any;
};

export default async function ChatContainer({ dmSpecificUser, cookies }: ChatContainerProps): Promise<JSX.Element> {
  console.log('cookies', cookies);
  const fetchUser = await fetchUserAndChat(dmSpecificUser, cookies)
  const LoggedInUser = decryptToken(cookies as string)
  console.log('LoggedInUser', LoggedInUser);
  // 

  return (
    <Box className={styles.chatContainer}>
      <MessagesList user={fetchUser as any} chatId={fetchUser?.chat?.id as string} />
      <MessageInput chatId={fetchUser?.chat?.id as string} user={fetchUser as any} />
    </Box>
  );
};


