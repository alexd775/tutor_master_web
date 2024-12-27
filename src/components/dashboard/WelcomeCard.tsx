import { Card, CardContent, Typography } from '@mui/material';
import { useAuthStore } from '../../stores/authStore';

const WelcomeCard = () => {
  const { user } = useAuthStore();

  return (
    <Card sx={{ 
      background: 'linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)',
      color: 'white',
      mb: 3
    }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Welcome back, {user?.fullName}!
        </Typography>
        <Typography variant="body2" sx={{ opacity: 0.9 }}>
          Continue your learning journey
        </Typography>
      </CardContent>
    </Card>
  );
};

export default WelcomeCard;