import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box, useTheme } from '@mui/material';
import { Home, BookOpen, MessageCircle, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../../../stores/authStore';
import { UserRole } from '../../../../types/auth';

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const Sidebar = ({ open, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuthStore();
  const theme = useTheme();

  const menuItems = [
    { text: 'Dashboard', icon: <Home />, path: '/' },
    { text: 'Topics', icon: <BookOpen />, path: '/topics' },
    { text: 'Sessions', icon: <MessageCircle />, path: '/sessions' },
    ...(user?.role === UserRole.ADMIN || user?.role === UserRole.TUTOR
      ? [{ text: 'Management', icon: <Settings />, path: '/management' }]
      : []),
  ];

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="persistent"
      sx={{
        width: 240,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          top: ['48px', '56px', '64px'],
          height: 'auto',
          bottom: 0,
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(180deg, #1a1c23 0%, #111827 100%)'
            : 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRight: `1px solid ${theme.palette.divider}`,
        },
      }}
    >
      <Box sx={{ overflow: 'auto', py: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              selected={location.pathname === item.path}
              sx={{
                my: 0.5,
                mx: 1,
                borderRadius: 1,
                color: theme.palette.text.primary,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.text.primary,
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;