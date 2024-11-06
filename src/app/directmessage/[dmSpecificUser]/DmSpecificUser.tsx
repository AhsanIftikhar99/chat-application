// src/app/directmessage/[dmSpecificUser]/DmSpecificUser.tsx

import React from "react";
import Loader from "@/components/Loader";
import { Box } from "@mui/material";
import Home from "../../home/page";
import ChatContainer from "@/components/common/ChatContainer";
import ChatProfileCard from "@/components/common/ChatProfileCard";
import { User } from "@/utils/types";
import styles from "./index.module.scss";
import axios, { getAxiosConfig } from "@/utils/axiosConfig";

type DmSpecificUserProps = {
  params: { dmSpecificUser: string };
  cookies: string; 
};

const DmSpecificUser = async ({ params, cookies }: DmSpecificUserProps) => {
  const { dmSpecificUser } = await Promise.resolve(params);;

  let fetchedUser: User | null = null;
  let chatData: { chatId: string } | null = null;


  try {
    const userResponse = await axios.get(`/api/users/getUserById/${dmSpecificUser}`, getAxiosConfig(cookies));
    fetchedUser = userResponse.data;
  } catch (error) {
    console.error("Failed to fetch user:", error);
  }

  // Fetch chat data if user was successfully fetched
  if (fetchedUser) {
    try {
      const chatResponse = await axios.get<{ chatId: string }>(`/api/chats/${fetchedUser.id}`, getAxiosConfig(cookies));
      chatData = chatResponse.data;
      console.log('chatData', chatData);
    } catch (error) {
      console.error("Failed to fetch chat data:", error);
    }
  }

  // Render Loader if data is not available
  if (!fetchedUser || !chatData) {
    return <Loader />;
  }

  return (
    <Home>
      <Box className={styles.container}>
        <ChatProfileCard dmSpecificUser={dmSpecificUser} cookies={cookies as string}/>
        <ChatContainer dmSpecificUser={dmSpecificUser} cookies={cookies}/>
      </Box>
    </Home>
  );
};

export default DmSpecificUser;
