import * as React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./index.module.scss";
import { FormField } from "@/utils/types";

type TextInputFieldProps = {
  field: FormField;
  control: Control;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({ field, control }) => {
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
            autoComplete="off"
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${styles.textField} ${fieldState.error ? styles.errorField : ""} ${className}`}
            onKeyDown={(event) => {
              const keyCode = event.keyCode || event.which;
              const keyValue = String.fromCharCode(keyCode);
              if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 9) return;
              if (!/^[a-zA-Z ]*$/.test(keyValue)) event.preventDefault();
            }}
          />
          {fieldState.error && <span className={styles.errorText}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};
