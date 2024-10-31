// Layout.js
import Box from '@mui/material/Box';
import React from 'react';
import CustomAppBar from '../common/Appbar';
import Sidebar from '../common/Sidebar';


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', height:'100vh' }}>
      <CustomAppBar />
      <Sidebar />
      {children}
    </Box>
  );
}
