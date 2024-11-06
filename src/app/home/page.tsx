// src/app/home/page.tsx
import welcomeIcom from "@/assets/images/welcome.svg";
import CustomAppBar from "@/components/common/Appbar";
import Sidebar from "@/components/common/Sidebar";
import SideMenu from "@/components/common/SideMenu";
import { Box } from "@mui/material";
import styles from "./index.module.scss";
import { ProfileModal } from "@/components/ProfileModal";

// Home receives `currentPath` as a prop
export default function Home({ children, currentPath }: { children: React.ReactNode; currentPath?: string }) {
  return (
    <Box className={styles.mainContainer}>
      <CustomAppBar />
      <Sidebar />
      <Box className={styles.sideMenuContainer}>
        <SideMenu currentPath={currentPath ?? ""} /> 
      </Box>

      <Box className={styles.container}>
        {children ? (
          children
        ) : (
          <Box className={styles.content}>
            <img src={welcomeIcom.src} alt="welcome" className={styles.welcomeImage} />
            <p className={`righteous-font ${styles.title}`}>Pulse</p>
            <p className={styles.subtitle}>Connect, Communicate, Create</p>
            <p className={styles.subtitle}>Your journey with pulse begins here!</p>
          </Box>
        )}
      </Box>
      {/* <ProfileModal /> */}
    </Box>
  );
}
