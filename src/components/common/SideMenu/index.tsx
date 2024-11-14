import React from "react";
import Link from "next/link";
import GroupIcon from "@mui/icons-material/Group";
import MessageIcon from "@mui/icons-material/Message";
import { getUsersHaveChatWith } from "@/app/chatwithuser/[chatWithSpecificUser]/_apis";
import { getCookieHeader } from "@/utils/helper/getCookieHeader";
import DirectMessagesList from "@/components/DirectMessageList";
import styles from "./index.module.scss";
import MenuItem from "@/components/MenuItem";

type SideMenuProps = {
  currentPath: string;
};

export default async function SideMenu({ currentPath }: SideMenuProps) {
  const cookieHeader = await getCookieHeader();
  const userHaveChatWith = await getUsersHaveChatWith(cookieHeader as string);

  return (
    <div className={styles.container}>
      <h6 className={styles.title}>QLU Recruiting</h6>
      <hr className={styles.divider} />

      <ul className={styles.list}>
        <MenuItem
          href="/groups"
          icon={<GroupIcon className={styles.icon} />}
          text="Groups"
          isSelected={currentPath === "/groups"}
        />
        <MenuItem
          href="/chatwithuser"
          icon={<MessageIcon className={styles.icon} />}
          text="Direct Messages"
          isSelected={currentPath === "/chatwithuser"}
        />
      </ul>

      <div className={styles.footer}>
        {/* <p className={styles.footerText}>Groups &gt;</p> */}
        {/* Render the DirectMessagesList component */}
        <DirectMessagesList users={userHaveChatWith} currentPath={currentPath} />
      </div>
    </div>
  );
}
