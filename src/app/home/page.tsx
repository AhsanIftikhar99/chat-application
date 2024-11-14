import welcomeIcom from "@/assets/images/welcome.svg";
import CustomAppBar from "@/components/common/Appbar";
import Sidebar from "@/components/common/Sidebar";
import SideMenu from "@/components/common/SideMenu";
import styles from "./index.module.scss";

// Home receives `currentPath` as a prop
export default function Home({ children, currentPath }: { children: React.ReactNode; currentPath?: string }) {
  return (
    <div className={styles.mainContainer}>
      <CustomAppBar />
      <Sidebar />

      <SideMenu currentPath={currentPath ?? ""} />


      <div className={styles.container}>
        {children ? (
          children
        ) : (
          <div className={styles.content}>
            <img src={welcomeIcom.src} alt="welcome" className={styles.welcomeImage} />
            <p className={`righteous-font ${styles.title}`}>Pulse</p>
            <p className={styles.subtitle}>Connect, Communicate, Create</p>
            <p className={styles.subtitle}>Your journey with pulse begins here!</p>
          </div>
        )}
      </div>

    </div>
  );
}
