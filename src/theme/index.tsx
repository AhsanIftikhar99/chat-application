// theme.ts
"use client"

import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#08344D', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif', // Default font
  },
});

export default theme;
