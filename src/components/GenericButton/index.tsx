import React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/system';
import { SvgIconComponent } from '@mui/icons-material';

// Define the prop types
interface CustomButtonProps {
  title?: string;
  icon?: React.ReactElement<SvgIconComponent>;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

// Default styles using the sx prop
const defaultButtonStyles: SxProps<Theme> = {
  backgroundColor: '#08344D',
  color: 'white',
  fontWeight: 'bold',
  textTransform: 'none',
};

const CustomButton: React.FC<CustomButtonProps> = ({ title, icon, onClick, sx }) => {
  return (
    <Button
      type='submit'
      sx={{ ...defaultButtonStyles, ...sx }}
      onClick={onClick}
      endIcon={icon} // This will place the icon at the end of the button
    >
      {title}
    </Button>
  );
};

export default CustomButton;
