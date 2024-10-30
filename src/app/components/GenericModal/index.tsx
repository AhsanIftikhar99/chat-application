import { FormBuilder } from "@/app/common/Formbuilder";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Box, SxProps, Theme } from "@mui/system";
import * as React from "react";
import CustomButton from "../GenericButton";
import styles from "./index.module.scss";

// Define the prop types
interface FormField {
  label: string;
  type: string;
  name?: string;
  baseline?: boolean;
  sx?: any;
}

interface CustomDialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  formFields: FormField[];
  onSubmit: (formData: { [key: string]: any }) => void;
  sx?: SxProps<Theme>;
}

const CustomDialog: React.FC<CustomDialogProps> = ({
  title,
  open,
  onClose,
  formFields,
  onSubmit,
  sx,
}) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    onSubmit(formJson);
    onClose();
  };

  const defaultModalStyles: SxProps<Theme> = {
    backgroundColor: "white",
    maxWidth: "450px",
    maxHeight:'100%',
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleSubmit,
        sx: { ...defaultModalStyles, ...sx },
      }}
    >
      <DialogTitle
        className={`${styles.dialogTitle} righteous-font`}
      >
        {title}
      </DialogTitle>
      <DialogContent className={styles.dialogContent}>
        {formFields.map((field, index) => (
          <Box key={index} className={styles.formFieldContainer}>
            <FormBuilder formFields={field} />
          </Box>
        ))}
      </DialogContent>
      <DialogActions className={styles.dialogActions}>
        <Grid container spacing={2} justifyContent="center" alignItems="center">
          {formFields.map(
            (field, index) =>
              field?.type === "button" && (
                <Grid
                  key={index}
                  item
                  xs={12}
                  container
                  className={styles.buttonContainer}
                >
                  <CustomButton
                    title={field.label}
                    sx={{
                      ...field?.sx,
                      width: "400px",
                      height: "48px",
                    }}
                  />
                  {index < formFields.length - 1 && (
                    <Box className={styles.dividerContainer}>
                      <Divider className={styles.divider} />
                      <span className={styles.orText}>or</span>
                      <Divider className={styles.divider} />
                    </Box>
                  )}
                </Grid>
              )
          )}
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
