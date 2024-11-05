
"use client";
import { useParams } from 'next/navigation';

import Loader from '@/components/Loader';
import { Box } from '@mui/material';
import Home from '../../home/page';

import ChatContainer from '@/components/common/ChatContainer';
import ChatProfileCard from '@/components/common/ChatProfileCard';
import { useGetDataFromServer } from '@/hooks/useGetDataFromServer';
import { User } from '@/utils/types';
import styles from './index.module.scss';

export default function DmSpecificUser() {

  const params = useParams();

  // Fetch user data
  /// fetch it in CHatProfileCArd, make it server fetch
  const { data: fetchedUser, isLoading: isUserLoading } = useGetDataFromServer<User>({
    url: `http://localhost:4000/api/users/getUserById/${params?.dmSpecificUser}`,
    queryKey: ["user", params?.dmSpecificUser],
    enabled: !!params?.dmSpecificUser,
  });

  // Fetch chat data for the fetched user
  /// fetch it in ChatContainer, make it server fetch
  const { data: chatData, isLoading: isChatLoading } = useGetDataFromServer<{ chatId: string }>({
    url: `http://localhost:4000/api/chats/${fetchedUser?.id}`,
    queryKey: ["chat", fetchedUser?.id],
    enabled: !!fetchedUser?.id,
  });

  return (
    <Home>
      {(isUserLoading || isChatLoading) && <Loader />}
      <Box className={styles.container}>
        <ChatProfileCard fetchedUser={fetchedUser as User} />
        {!!chatData && <ChatContainer chatData={chatData as {}} chatId={chatData?.chatId as string} user={fetchedUser as any} />}
      </Box>
    </Home>
  );
}
