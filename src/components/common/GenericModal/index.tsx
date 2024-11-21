import React from "react";
import Modal from "react-modal";
import { FormBuilder } from "../Formbuilder";
import styles from "./index.module.scss";
import closeicon from "@/assets/images/closeicon.png";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FormField } from "@/utils/types";
import { getValidationSchema } from "@/utils/validations";

type TitleType = "Signup" | "Login" | "Profile" | "EditProfile";

const styleMapper: Record<TitleType, string> = {
  Signup: styles.signupDialog,
  Login: styles.loginDialog,
  Profile: styles.profileDialog,
  EditProfile: styles.editProfileDialog,
};

type CustomDialogProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  formFields?: FormField[];
  onSubmit: (formData: { }) => void;
  positionRight?: boolean;
  children?: React.ReactNode;
};


const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  open,
  onClose,
  formFields,
  onSubmit,
  positionRight = false,
  children,
}) => {
  const validationSchema = getValidationSchema(title);

  // Initialize react-hook-form with resolver
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: formFields?.reduce((acc, field) => {
      acc[field.name as any] = field.defaultValue || "";
      return acc;
    }, {} as { [key: string]: any }),
  });

  const { control } = methods;

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  const getTitleClass = (title: string): string => {
    const titleClass = title.includes("Edit") ? "EditProfile" : (title as TitleType);
    return styleMapper[titleClass] || styles.dialogDefault;
  };

  return (
    <Modal
      isOpen={open}
      ariaHideApp={false}
      onRequestClose={onClose}
      className={`${positionRight ? styles.dialogRight : ""} ${getTitleClass(title)}`}
      overlayClassName={styles.overlay}
    >
      <div className={styles.header}>
        <h2
          className={
            title.includes("Profile") || title.includes("profile")
              ? `${styles.dialogTitle}`
              : `${styles.dialogTitleAuth} righteous-font`
          }
        >
          {title}
        </h2>
        <button onClick={onClose} className={styles.closeButton}>
          <img src={closeicon.src} alt="closeicon" height="20px" width="20px" />
        </button>
      </div>

      {/* Use FormProvider to share react-hook-form context */}
      <FormProvider {...methods}>
        <form className={styles.content} onSubmit={methods.handleSubmit(handleSubmit)}>
          <div>
            {!!formFields &&
              formFields.map((field, index) => (
                field.manifest === "field" && (
                  <div
                    key={index}
                    className={index === formFields.length - 3 && title === "Login" ? styles.formFieldContainerNoMargin : styles.formFieldContainer}
                  >
                    <FormBuilder formFields={field} control={control} />
                  </div>
                )
              ))}
            {title === "Login" && <p className={styles.forgotPasswordStyles}>Forgot Password?</p>}
            {!!children && children}
          </div>
          <div className={styles.actions}>
            {!!formFields &&
              formFields.map(
                (field, index) =>
                  field.manifest === "button" && (
                    <div key={index} className={styles.buttonContainer}>
                      <button
                        type={field.type as "button" | "submit" | "reset" | undefined}
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
      </FormProvider>
    </Modal>
  );
};

export default CustomDialog;
