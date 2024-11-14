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

interface TextInputFieldProps {
  field: FieldProps;
}

export const TextInputField: React.FC<TextInputFieldProps> = ({ field }) => {
  const [value, setValue] = React.useState(field.value || field.defaultValue || "");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    // MinLength validation
    if (field.minLength && inputValue.length < field.minLength) {
      setError(`Minimum length is ${field.minLength} characters.`);
    } else {
      setError("");
    }
  };

  return (
    <div className={styles.textContainer}>
      <input
        type={field.type}
        autoComplete="off"
        name={field.name}
        placeholder={field.placeholder || field.label}
        maxLength={field.maxLength ? Number(field.maxLength) : undefined}
        minLength={field.minLength ? Number(field.minLength) : undefined}
        value={value}
        onChange={handleChange}
        className={`${styles.textField} ${styles[field.variant || "standard"]} ${error ? styles.errorField : ""}`}
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
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
