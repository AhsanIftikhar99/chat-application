import React from 'react';
import Button from '@mui/material/Button';
import { SxProps, Theme } from '@mui/system';

// Define the prop types
interface CustomButtonProps {
  title: string;
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

const CustomButton: React.FC<CustomButtonProps> = ({ title, onClick, sx }) => {
  return (
    <Button type='submit' sx={{ ...defaultButtonStyles, ...sx }} onClick={onClick}>
      {title}
    </Button>
  );
};

export default CustomButton;