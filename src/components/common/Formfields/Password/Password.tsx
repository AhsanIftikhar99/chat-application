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

interface PasswordInputFieldProps {
  field: FieldProps;
}

export const PasswordInput: React.FC<PasswordInputFieldProps> = ({ field }) => {
  const [value, setValue] = React.useState(field.value || field.defaultValue || "");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // MinLength validation
    if (field.minLength && inputValue.length < field.minLength) {
      setError(`Password must be at least ${field.minLength} characters.`);
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.passwordContainer}>
      <input
        type="password"
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
