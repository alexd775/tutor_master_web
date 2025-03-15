import { Box, Typography, useTheme } from '@mui/material';
import { Clock } from 'lucide-react';
import { useSessionTimer } from '../../hooks/useSessionTimer';

interface SessionTimerProps {
  sessionId: string;
}

const SessionTimer = ({ sessionId }: SessionTimerProps) => {
  const { isExpired, isExpirable, remainingTime } = useSessionTimer(sessionId);
  const theme = useTheme();

  if (!isExpirable || !remainingTime) return null;
  
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        color: theme.palette.text.secondary,
        bgcolor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.05)',
        px: 2,
        py: 1,
        borderRadius: 2,
        mb: 2,
      }}
    >
      <Clock size={16} />
      <Typography variant="body2">
        Time remaining: {remainingTime}
      </Typography>
    </Box>
  );
};

export default SessionTimer;