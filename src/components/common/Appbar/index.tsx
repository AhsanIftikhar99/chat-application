import React from "react";
import AppbarSearch from "../Formfields/AppbarField";
import styles from "./index.module.scss";


const formField = {
    placeholder: "",
    label: "Search Qlu Recruiting",
    type: "text",
    name: "search",
    backgroundColor: '#124766',
    height: '45px',
    color: 'white',
};

export default function CustomAppBar() {
    return (
        <header className={styles.appBar}>
            <div className={styles.toolbar}>
                <div className={styles.searchContainer}>
                    <AppbarSearch field={formField} />
                </div>
            </div>
        </header>
    );
}
