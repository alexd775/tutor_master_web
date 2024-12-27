import { useState } from 'react';
import { Box, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex' }}>
      <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 2,
          mt: ['48px', '56px', '64px'],
          ml: sidebarOpen ? '240px' : 0,
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc',
          minHeight: '100vh',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;