import { Box, Typography, useTheme } from '@mui/material';
import { Clock } from 'lucide-react';

interface SessionTimerProps {
  remainingTime: string | null;
  isExpired: boolean;
}

const SessionTimer = ({ remainingTime, isExpired }: SessionTimerProps) => {
  const theme = useTheme();

  if (isExpired || !remainingTime) return null;

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
      }}
    >
      <Clock size={16} />
      <Typography variant="body2">
        Time remaining: {remainingTime}
      </Typography>
    </Box>
  );
};

export default SessionTimer