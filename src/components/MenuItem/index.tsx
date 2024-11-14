import React from "react";
import Link from "next/link";
import styles from "./index.module.scss";

type MenuItemProps = {
  href: string;
  icon: React.ReactNode;
  text: string;
  isSelected: boolean;
};

const MenuItem: React.FC<MenuItemProps> = ({ href, icon, text, isSelected }) => {
  return (
    <li className={`${styles.listItem} ${isSelected ? styles.selected : ""}`}>
      <Link href={href} passHref>
        <div className={styles.listItemLink}>
          <div className={styles.iconTextContainer}>
            {icon}
            <span className={styles.listItemText}>{text}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

export default MenuItem;
