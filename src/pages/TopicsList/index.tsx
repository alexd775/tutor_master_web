import { Grid, Typography, Box, CircularProgress, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTopics } from '../../hooks/topics';
import TopicCard from '../../components/common/Card/TopicCard';

const TopicsList = () => {
  const navigate = useNavigate();
  const { data: topics, isLoading, error } = useTopics();
  const theme = useTheme();

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 4 }}>
        Error loading topics. Please try again later.
      </Typography>
    );
  }

  return (
    <Box sx={{
      minHeight: '100vh',
      bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f3f4f6',
    }}>
      <Typography variant="h4" gutterBottom color="text.primary">
        Available Topics
      </Typography>
      <Grid container spacing={3}>
        {topics?.map((topic) => (
          <Grid item xs={12} sm={6} md={4} key={topic.id}>
            <TopicCard
              topic={topic}
              onClick={() => navigate(`/session/new?topicId=${topic.id}`)}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TopicsList;