import React from "react";
import AppbarSearch from "../Formfields/AppbarField";
import styles from "./index.module.scss";


export default function CustomAppBar() {
    return (
        <header className={styles.appBar}>
            <div className={styles.toolbar}>
                <div className={styles.searchContainer}>
                    <AppbarSearch  />
                </div>
            </div>
        </header>
    );
}
