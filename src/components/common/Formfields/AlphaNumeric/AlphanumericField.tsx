import * as React from "react";
import styles from "./index.module.scss";

interface FieldProps {
  name: string;
  label: string;
  type: string;
  variant?: "filled" | "outlined" | "standard";
  placeholder?: string;
  maxLength?: number;
  minLength?: number;
  defaultValue?: string;
  value?: string;
  regex?: RegExp; // Add regex pattern for validation
  regexErrorMessage?: string; // Add custom error message for regex mismatch
  alphanumeric?: boolean; // Add a prop to restrict to alphanumeric characters
}

interface TextInputFieldProps {
  field: FieldProps;
}

export const AlphaNumericField: React.FC<TextInputFieldProps> = ({ field }) => {
  const [value, setValue] = React.useState(field.value || field.defaultValue || "");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // MinLength validation
    if (field.minLength && inputValue.length < field.minLength) {
      setError(`Minimum length is ${field.minLength} characters.`);
      return;
    }

    // Regex validation
    if (field.regex && !field.regex.test(inputValue)) {
      setError(field.regexErrorMessage || "Invalid format.");
      return;
    }

    setError(""); // Clear error if all validations pass
  };

  return (
    <div className={styles.textContainer}>
      <input
        type={field.type}
        autoComplete="off"
        name={field.name}
        placeholder={field.placeholder || field.label}
        maxLength={field.maxLength ? Number(field.maxLength) : undefined}
        // minLength={field.minLength ? Number(field.minLength) : undefined}
        value={value}
        onChange={handleChange}
        className={`${styles.textField} ${styles[field.variant || "standard"]} ${error ? styles.errorField : ""}`}
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

          // Allow only alphanumeric characters, period, underscore, and control keys
          if (
            !allowedKeys.includes(event.key) &&
            !/^[a-zA-Z0-9]$/.test(event.key) // Allow letters and digits
          ) {
            event.preventDefault();
          }
        }}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
