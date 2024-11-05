// Home Component
"use client";
import { Box } from "@mui/material";
import welcomeIcom from "@/assets/images/welcome.svg";
import styles from "./index.module.scss";
import Loader from "@/components/Loader";
import { useState } from "react";
import CustomAppBar from "@/components/common/Appbar";
import Sidebar from "@/components/common/Sidebar";
import SideMenu from "@/components/common/SideMenu";

export default function Home({ children }: { children: React.ReactNode }) {
  const [showLoader, setShowLoader] = useState(false);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {showLoader && <Loader />}
      <CustomAppBar />
      <Sidebar />
      {/* SideMenu with a fixed width and sticky positioning */}
      <Box sx={{ position: "sticky", top: 0, height: "100vh" }}>
        <SideMenu setShowLoader={setShowLoader} />
      </Box>
      {/* Content container with its own scrollable area */}
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
    </Box>
  );
}
