import { Card, CardContent, Typography, Box, Chip } from '@mui/material';
import { BookOpen, Users, BarChart2 } from 'lucide-react';
import { TopicResponse } from '../../../types/topic';

interface TopicCardProps {
  topic: TopicResponse;
  onClick: () => void;
}

const TopicCard = ({ topic, onClick }: TopicCardProps) => {
  return (
    <Card 
      onClick={onClick}
      sx={{ 
        cursor: 'pointer',
        '&:hover': { transform: 'translateY(-2px)', transition: 'transform 0.2s' }
      }}
    >
      <CardContent>
        <Typography variant="h6" gutterBottom>
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