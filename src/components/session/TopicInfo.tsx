import { Paper, Typography, Chip, Box, useTheme } from '@mui/material';
import { BookOpen, Clock } from 'lucide-react';

interface TopicInfoProps {
  title: string;
  description?: string;
  difficulty: number;
  duration?: string;
}

const TopicInfo = ({ title, description, difficulty, duration }: TopicInfoProps) => {
  const theme = useTheme();

  return (
    <Paper sx={{
      p: 3,
      mb: 3,
      borderRadius: 2,
      background: theme.palette.mode === 'dark'
        ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
        : 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box>
          <Typography
            variant="h6"
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              mb: 1,
              color: theme.palette.text.primary,
            }}
          >
            <BookOpen size={20} />
            {title}
          </Typography>
          {description && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {description}
            </Typography>
          )}
          <Chip
            label={`Level ${difficulty}`}
            size="small"
            color="primary"
          />
        </Box>
        {duration && (
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: theme.palette.text.secondary,
          }}>
            <Clock size={16} />
            <Typography variant="body2" color="inherit">
              {duration}
            </Typography>
          </Box>
        )}
      </Box>
    </Paper>
  );
};

export default TopicInfo;