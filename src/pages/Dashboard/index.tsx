// import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
// import WelcomeCard from '../../components/dashboard/WelcomeCard';
// import StatsOverview from '../../components/dashboard/StatsOverview';
// import RecentSessions from '../../components/dashboard/RecentSessions';

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/topics');
  }, [navigate]);

  // implement Dashboard page later
  return null;
  // return (
  //   <Box>
  //     <WelcomeCard />
  //     <StatsOverview />
  //     <Box sx={{ mt: 3 }}>
  //       <RecentSessions />
  //     </Box>
  //   </Box>
  // );
};

export default Dashboard;