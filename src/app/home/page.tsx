import { Box } from '@mui/material';
import SideMenu from '../../common/SideMenu';
import welcomeIcom from "@/assets/images/welcome.svg";
import styles from './index.module.scss';
import CustomAppBar from '../../common/Appbar';
import Sidebar from '../../common/Sidebar';

export default function Home({ children }: { children: React.ReactNode }) {
  return (

    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CustomAppBar />
      <Sidebar />
      <Box className={styles.container}>
        <SideMenu />

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
    </Box >
  );
}
