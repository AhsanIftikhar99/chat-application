import React from "react";
import Modal from "react-modal";
import styles from "./index.module.scss";
import { FormBuilder } from "../Formbuilder";
import closeicon from "@/assets/images/closeicon.png"
import { Divider } from "@mui/material";

type FormField = {
  label?: string;
  type?: any;
  name?: string;
  baseline?: boolean;
  manifest?: string;
  sx?: any;
  onClick?: () => void;
};

type TitleType = "Signup" | "Login" | "Profile" | "EditProfile"; // Add any other possible titles

const styleMapper: Record<TitleType, string> = {
  Signup: styles.signupDialog,
  Login: styles.loginDialog,
  Profile: styles.profileDialog,
  EditProfile: styles.editProfileDialog
};


type CustomDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  formFields?: FormField[];
  onSubmit: (formData: { [key: string]: any }) => void;
  positionRight?: boolean;
  children?: React.ReactNode;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  open,
  onClose,
  formFields,
  onSubmit,
  positionRight = false,
  children
}) => {

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    onSubmit(formJson);
  };

  const getTitleClass = (title: string): string => {
    let titleClass = title.includes("Edit") ? "EditProfile" : title as TitleType;
    return (titleClass in styleMapper ? styleMapper[titleClass as TitleType] : styles.dialogDefault);
  };

  console.log('title', title);

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={onClose}
      className={`${positionRight ? styles.dialogRight : ""} ${getTitleClass(title)}`}
      overlayClassName={styles.overlay}
    >
      <div className={styles.header}>
        <h2 className={title.includes("Profile") || title.includes("profile")  ? `${styles.dialogTitle}` : `${styles.dialogTitleAuth} righteous-font`}
        >
          {title}
        </h2>
        <button onClick={onClose} className={styles.closeButton}>
          <img src={closeicon.src} alt="closeicon" height={'20px'} width={'20px'} />
        </button>
      </div>
     
      {title.includes("Profile") || title.includes("profile")  && <Divider />}
      <form className={styles.content} onSubmit={handleSubmit}>
        <div>
          {!!formFields &&
            formFields.map((field, index) => (
              field.manifest === "field" && (
                <div
                  key={index}
                  className={index === formFields.length - 3 && title === "Login" ? styles.formFieldContainerNoMargin : styles.formFieldContainer}
                >
                  <FormBuilder formFields={field} />
                </div>
              )
            ))}
          {title === 'Login' && <p className={styles.forgotPasswordStyles}>Forgot Password?</p>}

          {!!children && children}
        </div>
        <div className={styles.actions}>
          {!!formFields &&
            formFields.map(
              (field, index) =>
                field.manifest === "button" && (
                  <div key={index} className={styles.buttonContainer}>
                    <button
                      type={field.type}
                      style={field.sx}
                      onClick={field.onClick}
                      className={styles.customButton}
                    >
                      {field.label}
                    </button>
                    {index < formFields.length - 1 && (
                      <div className={styles.dividerContainer}>
                        <span className={styles.divider}></span>
                        <span className={styles.orText}>or</span>
                        <span className={styles.divider}></span>
                      </div>
                    )}
                  </div>
                )
            )}
        </div>
      </form>
    </Modal>
  );
};

export default CustomDialog;
