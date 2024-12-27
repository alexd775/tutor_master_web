import { Box } from '@mui/material';
import WelcomeCard from '../../components/dashboard/WelcomeCard';
import StatsOverview from '../../components/dashboard/StatsOverview';
import RecentSessions from '../../components/dashboard/RecentSessions';

const Dashboard = () => {
  return (
    <Box>
      <WelcomeCard />
      <StatsOverview />
      <Box sx={{ mt: 3 }}>
        <RecentSessions />
      </Box>
    </Box>
  );
};

export default Dashboard;