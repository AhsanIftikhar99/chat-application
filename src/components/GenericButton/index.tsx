import React from "react";
import Button from "@mui/material/Button";
import { SxProps, Theme } from "@mui/system";
import { SvgIconComponent } from "@mui/icons-material";

type CustomButtonProps = {
  title?: string;
  icon?: React.ReactElement<SvgIconComponent>;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  type?: "button" | "submit" | "reset";
  className?: string; // New prop for custom CSS class
};

const defaultButtonStyles: SxProps<Theme> = {
  backgroundColor: "#08344D",
  color: "white",
  fontWeight: "bold",
  textTransform: "none",
};

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  icon,
  onClick,
  sx,
  type,
  className, // Accept custom class name
}) => {
  return (
    <Button
      type={type || "button"}
      sx={{ ...defaultButtonStyles, ...sx }}
      onClick={onClick}
      endIcon={icon}
      className={className} // Pass custom class name to MUI Button
    >
      {title}
    </Button>
  );
};

export default CustomButton;
