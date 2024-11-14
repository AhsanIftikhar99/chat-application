// src/app/directmessage/[dmSpecificUser]/DmSpecificUser.tsx

import ChatContainer from "@/components/common/ChatContainer";
import { Box } from "@mui/material";
import Home from "../../home/page";
import styles from "./index.module.scss";

type DmSpecificUserProps = {
  params: { dmSpecificUser: string };
};

const DmSpecificUser = async ({ params }: DmSpecificUserProps) => {
  const { dmSpecificUser } = await Promise.resolve(params);;

  return (
    <Home>
      <Box className={styles.container}>
        <ChatContainer dmSpecificUser={dmSpecificUser} />
      </Box>
    </Home>
  );
};

export default DmSpecificUser;
