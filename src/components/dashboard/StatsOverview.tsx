import { Grid } from '@mui/material';
import { BookOpen, Clock, Trophy, Users } from 'lucide-react';
import StatCard from '../common/Card/StatCard';

const stats = [
  {
    icon: BookOpen,
    title: 'Topics',
    value: '12',
    trend: '+2 this week',
    color: '#2563eb',
  },
  {
    icon: Clock,
    title: 'Hours Spent',
    value: '24',
    trend: '5 hours today',
    color: '#7c3aed',
  },
  {
    icon: Trophy,
    title: 'Completed',
    value: '8',
    trend: '75% success rate',
    color: '#059669',
  },
  {
    icon: Users,
    title: 'Active Sessions',
    value: '3',
    trend: '2 pending reviews',
    color: '#dc2626',
  },
];

const StatsOverview = () => {
  return (
    <Grid container spacing={3}>
      {stats.map((stat) => (
        <Grid item xs={12} sm={6} md={3} key={stat.title}>
          <StatCard {...stat} />
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsOverview;