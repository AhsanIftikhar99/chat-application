import * as React from "react";
import { Control, Controller } from "react-hook-form";
import styles from "./index.module.scss";
import { FormField } from "@/utils/types";

interface MultilineInputFieldProps {
  field: FormField;
  control: Control;
}

export const MultilineInputField: React.FC<MultilineInputFieldProps> = ({ field, control }) => {
  const placeholder = field.placeholder || field.label;
  const maxLength = field.maxLength || 40;
  return (
    <Controller
      name={field.name || ""}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles.textAreaContainer}>
          <textarea
            {...field}
            placeholder={placeholder}
            autoComplete="off"
            maxLength={maxLength}
            rows={4}
            className={`${styles.textArea} ${fieldState.error ? styles.errorField : ""}`}
          />
          {fieldState.error && <span className={styles.errorText}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};
