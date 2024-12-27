import { Card, CardContent, Typography, Box, useTheme } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  trend: string;
  color: string;
}

const StatCard = ({ icon: Icon, title, value, trend, color }: StatCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        height: '100%',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(135deg, #1f2937 0%, #111827 100%)'
          : 'linear-gradient(135deg, white 0%, #f8fafc 100%)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Box
            sx={{
              p: 1,
              borderRadius: 1,
              bgcolor: `${color}15`,
              color: color,
              display: 'flex',
            }}
          >
            <Icon size={24} />
          </Box>
          <Typography variant="h6" color="text.secondary">
            {title}
          </Typography>
        </Box>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="text.primary">
          {value}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {trend}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default StatCard;