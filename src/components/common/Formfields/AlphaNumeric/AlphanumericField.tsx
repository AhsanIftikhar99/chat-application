import * as React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./index.module.scss";
import { FormField } from "@/utils/types";

interface AlphaNumericFieldProps {
  field: FormField;
  control: Control;
}

export const AlphaNumericField: React.FC<AlphaNumericFieldProps> = ({ field, control }) => {
  const placeholder = field.placeholder || field.label;
  const maxLength = field.maxLength || 40;
  const className = field.className || "";
  return (
    <Controller
      name={field.name || ""}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles.textContainer}>
          <input
            {...field}
            placeholder={placeholder}
            autoComplete="off"
            maxLength={maxLength}
            className={`${styles.textField} ${fieldState.error ? styles.errorField : ""} ${className}`}
            onKeyDown={(event) => {
              const allowedKeys = [
                "Backspace",
                "Enter",
                "Tab",
                "ArrowLeft",
                "ArrowRight",
                "Delete",
                ".", // period
                "_", // underscore
              ];
              if (!allowedKeys.includes(event.key) && !/^[a-zA-Z0-9]$/.test(event.key)) {
                event.preventDefault();
              }
            }}
          />
          {fieldState.error && <span className={styles.errorText}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};
