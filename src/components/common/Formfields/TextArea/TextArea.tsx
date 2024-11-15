import React from "react";
import styles from "./index.module.scss";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  restrictInput?: boolean;
  maxLength?: number | string;
  minLength?: number | string;
  defaultValue?: string;
  className?: string;
}

interface MultilineInputFieldProps {
  field: FieldProps;
}

export const MultilineInputField: React.FC<MultilineInputFieldProps> = ({ field }) => {
  return (
    <div className={styles.textAreaContainer}>
      {/* <label htmlFor={field.name} className={styles.label}>{field.label}</label> */}
      <textarea
        id={field.name}
        name={field.name}
        defaultValue={field.defaultValue}
        className={`${styles.textArea} ${field.className || ""}`}
        maxLength={Number(field.maxLength)}
        minLength={Number(field.minLength)}
        rows={4}
        onKeyDown={(event) => {
          if (field.restrictInput) {
            const keyCode = event.keyCode || event.which;
            const keyValue = String.fromCharCode(keyCode);
            // Allow backspace key, enter key, and tab key
            if (
              event.keyCode === 8 ||
              event.keyCode === 13 ||
              event.keyCode === 9
            )
              return;
            // Restrict to only letters and spaces if specified
            if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
          }
        }}
      />
    </div>
  );
};
