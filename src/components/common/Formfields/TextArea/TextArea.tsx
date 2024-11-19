import React from "react";
import styles from "./index.module.scss";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  restrictInput?: boolean;
  maxLength?: number ;
  minLength?: number ;
  defaultValue?: string;
  className?: string;
  value?: string;
}

interface MultilineInputFieldProps {
  field: FieldProps;
}

export const MultilineInputField: React.FC<MultilineInputFieldProps> = ({ field }) => {

  const [value, setValue] = React.useState(field.value || field.defaultValue || "");
  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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
    <div className={styles.textAreaContainer}>
      {/* <label htmlFor={field.name} className={styles.label}>{field.label}</label> */}
      <textarea
        id={field.name}
        name={field.name}
        defaultValue={field.defaultValue}
        className={`${styles.textArea} ${field.className || ""} ${error ? styles.errorField : ""} `}
        maxLength={Number(field.maxLength)}
        minLength={Number(field.minLength)}
        onChange={handleChange}
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
       {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
};
