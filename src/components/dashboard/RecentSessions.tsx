import { Card, CardContent, Typography, List, ListItem, ListItemText, ListItemIcon, useTheme } from '@mui/material';
import { MessageSquare, Clock } from 'lucide-react';

const RecentSessions = () => {
  const theme = useTheme();

  const sessions = [
    {
      id: 1,
      title: 'Introduction to Python',
      time: '2 hours ago',
    },
    {
      id: 2,
      title: 'JavaScript Fundamentals',
      time: '5 hours ago',
    },
    {
      id: 3,
      title: 'React Hooks Deep Dive',
      time: 'Yesterday',
    },
  ];

  return (
    <Card sx={{
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
        : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
    }}>
      <CardContent>
        <Typography
          variant="h6"
          gutterBottom
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.primary
          }}
        >
          <Clock size={20} />
          Recent Sessions
        </Typography>
        <List>
          {sessions.map((session) => (
            <ListItem key={session.id}>
              <ListItemIcon sx={{ color: theme.palette.text.secondary }}>
                <MessageSquare size={20} />
              </ListItemIcon>
              <ListItemText
                primary={session.title}
                secondary={session.time}
                primaryTypographyProps={{
                  color: theme.palette.text.primary
                }}
                secondaryTypographyProps={{
                  color: theme.palette.text.secondary
                }}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default RecentSessions;