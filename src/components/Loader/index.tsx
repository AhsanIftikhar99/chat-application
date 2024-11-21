import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./index.module.scss";

const Loader: React.FC = () => {
  return (
    <div className={styles.loaderContainer}>
      <CircularProgress color="primary" />
      <p className={styles.loaderText}>Loading, please wait...</p>
    </div>
  );
};

export default Loader;
