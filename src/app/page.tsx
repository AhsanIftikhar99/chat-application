import globeImage from "@/assets/images/globe.png";
import ModalManager from "@/components/ModalManager";
import Navbar from "@/components/Navbar";
import styles from "./index.module.scss";

export default function App() {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.toolbar} />
      <div className={styles.flexContainer}>
        <div className={styles.leftSection}>
          <h3 className={`${styles.headerText} righteous-font`}>
            Communicate, Anywhere, Anytime
          </h3>
          <p className={styles.bodyText}>
            Connect effortlessly across all devices with Pulse. Break free from
            limitations and redefine communication, anytime, anywhere.
          </p>
          <div className={styles.modalManagerWrapper}>
            <ModalManager />
          </div>
        </div>
        <div className={styles.rightSection}>
          <img
            src={globeImage.src}
            alt="Globe"
            className={styles.globeImage}
          />
        </div>
      </div>
    </div>
  );
}
