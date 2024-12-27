import { Card, CardContent, Typography, Box, Chip, useTheme } from '@mui/material';
import { BookOpen, Users, BarChart2 } from 'lucide-react';
import { TopicResponse } from '../../../types/topic';

interface TopicCardProps {
  topic: TopicResponse;
  onClick: () => void;
}

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
          : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
        '&:hover': {
          transform: 'translateY(-2px)',
          transition: 'transform 0.2s'
        }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom color="text.primary">
          {topic.title}
        </Typography>
        {topic.description && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {topic.description}
          </Typography>
        )}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          <Chip
            size="small"
            label={`Level ${topic.difficulty_level}`}
            color="primary"
          />
          {topic.subtopic_count > 0 && (
            <Chip
              size="small"
              label={`${topic.subtopic_count} subtopics`}
              variant="outlined"
              sx={{
                borderColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : undefined,
                color: theme.palette.text.secondary
              }}
            />
          )}
        </Box>
        <Box sx={{ display: 'flex', gap: 2, color: 'text.secondary' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BookOpen size={16} />
            <Typography variant="body2">{topic.total_sessions}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <BarChart2 size={16} />
            <Typography variant="body2">
              {Math.round(topic.average_completion_rate * 100)}%
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TopicCard;