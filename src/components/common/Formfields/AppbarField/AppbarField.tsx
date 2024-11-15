"use client";
import React from "react";
import { FormFieldProps } from "@/utils/types";
import styles from "./index.module.scss";

export const AppbarSearch: React.FC<FormFieldProps> = ({ field }) => {
  return (
    <div className={styles.searchContainer}>
      <input
        id={field?.name}
        name={field?.name}
        type={field?.type || "text"}
        placeholder={field?.label}
        className={styles.inputField}
        onKeyDown={(event) => {
          if (field?.type === "text") {
            const keyCode = event.keyCode || event.which;
            const keyValue = String.fromCharCode(keyCode);
            // Allow backspace key, enter key, and tab key
            if (
              event.keyCode === 8 ||
              event.keyCode === 13 ||
              event.keyCode === 9
            )
              return;
            if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
          }
        }}
      />
    </div>
  );
};
