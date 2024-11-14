// components/CustomSnackbar.tsx

import React, { useEffect, useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { AlertColor } from "@mui/material/Alert";

interface CustomSnackbarProps {
  message: string;
  severity?: AlertColor;
  autoHideDuration?: number;
}

const CustomSnackbar: React.FC<CustomSnackbarProps> = ({
  message,
  severity = "info",
  autoHideDuration = 1500,
}) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Set a timer to automatically close the Snackbar after `autoHideDuration`
    const timer = setTimeout(() => {
      setOpen(false);
    }, autoHideDuration);

    // Clear timer on component unmount
    return () => clearTimeout(timer);
  }, [autoHideDuration]);

  if (!open) return null;

  return (
    <Snackbar
      open={open}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={severity}
        sx={{
          bgcolor: severity === "error" ? "red" : "#124766",
          color: "white",
          fontWeight: "bold",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
