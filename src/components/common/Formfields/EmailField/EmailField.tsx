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
}

interface EmailInputFieldProps {
  field: FieldProps;
}

export const EmailInput: React.FC<EmailInputFieldProps> = ({ field }) => {
  const [value, setValue] = React.useState(field.value || field.defaultValue || "");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // Basic email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inputValue) && inputValue !== "") {
      setError("Please enter a valid email address.");
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.emailContainer}>
      <input
        type="text"
        autoComplete="off"
        name={field.name}
        placeholder={field.placeholder || field.label}
        maxLength={field.maxLength ? Number(field.maxLength) : undefined}
        // minLength={field.minLength ? Number(field.minLength) : undefined}
        value={value}
        onChange={handleChange}
        className={`${styles.textField} ${styles[field.variant || "standard"]} ${error ? styles.errorField : ""}`}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
