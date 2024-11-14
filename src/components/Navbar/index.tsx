"use client";

import * as React from "react";
import styles from "./index.module.scss";
import pulseLogo from "../../assets/images/pulse.png";

const navItems = ["Privacy", "Help Center", "Pulse Web", "Download", "Try Pulse"];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  return (
    <header className={styles.navbar}>
      <div className={styles.toolbar}>
        <button className={styles.menuButton} onClick={handleDrawerToggle}>
          <span className={styles.menuIcon}>☰</span>
          <span className={styles.logoText}>
            Pulse
            <img src={pulseLogo.src} alt="Pulse Logo" width="30px" height="16px" />
          </span>
        </button>
        <h1 className={styles.mainLogo}>
          Pulse
          <img src={pulseLogo.src} alt="Pulse Logo" width="30px" height="16px" />
        </h1>
        <nav className={styles.navLinks}>
          {navItems.map((item) =>
            item === "Try Pulse" ? (
              <button key={item} className={styles.tryPulseButton}>
                {item}
              </button>
            ) : (
              <button key={item} className={styles.navButton}>
                {item}
              </button>
            )
          )}
        </nav>
      </div>

      {/* Drawer for mobile */}
      {mobileOpen && (
        <div className={styles.drawerOverlay} onClick={handleDrawerToggle}>
          <div className={styles.drawer}>
            <h2 className={styles.drawerTitle}>
              Pulse
              <img src={pulseLogo.src} alt="Pulse Logo" width="30px" height="16px" />
            </h2>
            <ul className={styles.drawerList}>
              {navItems.map((item) => (
                <li key={item} className={styles.drawerListItem}>
                  <button className={styles.drawerButton}>{item}</button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </header>
  );
}
