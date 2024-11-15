// src/app/chatwithuser/[chatWithSpecificUser]/ChatContainer.tsx


import { fetchUserAndChat } from "@/app/chatwithuser/[chatWithSpecificUser]/_apis";
import { getCookieHeader } from "@/utils/helper/getCookieHeader";
import { User } from "@/utils/types";
import ChatProfileCard from "../ChatProfileCard";
import MessageInput from "../MessageInput";
import MessagesList from "../MessageList";
import styles from "./index.module.scss";



type ChatContainerProps = {
  chatWithSpecificUser: string;
};

export default async function ChatContainer({ chatWithSpecificUser }: ChatContainerProps): Promise<JSX.Element> {

  const cookieHeader = await getCookieHeader();

  const fetchUserAndChatData = await fetchUserAndChat(chatWithSpecificUser, cookieHeader)


  return (
    <div className={styles.container}>
      <div className={styles.chatContainer}>
        <ChatProfileCard chatWithSpecificUser={chatWithSpecificUser} cookies={cookieHeader as string} />
        <MessagesList user={fetchUserAndChatData as {}} chatId={fetchUserAndChatData?.chat?.id as string} />
      </div>
      <MessageInput chatId={fetchUserAndChatData?.chat?.id as string} user={fetchUserAndChatData as User} />
    </div>
  );
};


