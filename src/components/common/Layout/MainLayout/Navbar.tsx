import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { Menu, LogOut } from 'lucide-react';
import { useAuthStore } from '../../../../stores/authStore';
import ThemeToggle from '../../ThemeToggle';

interface NavbarProps {
  onMenuClick: () => void;
}

const Navbar = ({ onMenuClick }: NavbarProps) => {
  const { logout, user } = useAuthStore();

  return (
    <AppBar 
      position="fixed" 
      sx={{ 
        zIndex: 2000,
        background: (theme) => theme.palette.mode === 'light' 
          ? 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)'
          : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Toolbar>
        <IconButton color="inherit" edge="start" onClick={onMenuClick}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1, ml: 2 }}>
          Tutor Master
        </Typography>
        <Typography variant="body2" sx={{ mr: 2 }}>
          {user?.fullName}
        </Typography>
        <ThemeToggle />
        <IconButton color="inherit" onClick={logout}>
          <LogOut />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;