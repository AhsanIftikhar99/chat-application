// src/app/chatwithuser/[chatWithSpecificUser]/DmSpecificUser.tsx

import ChatContainer from "@/components/common/ChatContainer";
import { Box } from "@mui/material";
import Home from "../../home/page";
import styles from "./index.module.scss";

type DmSpecificUserProps = {
  params: { chatWithSpecificUser: string };
};

const DmSpecificUser = async ({ params }: DmSpecificUserProps) => {
  const { chatWithSpecificUser } = await Promise.resolve(params);;

  return (
    <Home>
      <Box className={styles.container}>
        <ChatContainer chatWithSpecificUser={chatWithSpecificUser} />
      </Box>
    </Home>
  );
};

export default DmSpecificUser;
