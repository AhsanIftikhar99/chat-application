import * as React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./index.module.scss";
import { FormField } from "@/utils/types";

interface PasswordInputFieldProps {
  field: FormField;
  control: Control;
}

export const PasswordInput: React.FC<PasswordInputFieldProps> = ({ field, control }) => {
  const placeholder = field.placeholder || field.label;
  const maxLength = field.maxLength || 40;
  return (
    <Controller
      name={field.name || ""}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles.passwordContainer}>
          <input
            {...field}
            type="password"
            autoComplete="off"
            maxLength={maxLength}
            placeholder={placeholder}
            className={`${styles.textField} ${fieldState.error ? styles.errorField : ""}`}
          />
          {fieldState.error && <span className={styles.errorText}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};
