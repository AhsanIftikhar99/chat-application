import * as React from "react";
import styles from "./index.module.scss";
import { Control, Controller } from "react-hook-form";
import { FormField } from "@/utils/types";



interface EmailInputFieldProps {
  field: FormField;
  control: Control;
}

export const EmailInput: React.FC<EmailInputFieldProps> = ({ field, control }) => {
  const placeholder = field.placeholder || field.label;
  const maxLength = field.maxLength || 40;
  return (
    <Controller
      name={field.name || ''}
      control={control}
      render={({ field, fieldState }) => (
        <div className={styles.emailContainer}>
          <input
            {...field}
            name={field.name}
            autoComplete="off"
            maxLength={maxLength}
            placeholder={placeholder}
            value={field.value} // Controlled value
            className={styles.textField}
          />
          {fieldState.error && <span className={styles.errorText}>{fieldState.error.message}</span>}
        </div>
      )}
    />
  );
};

