import { Box, Paper, Typography } from '@mui/material';
import { GraduationCap } from 'lucide-react';
import { env } from '../../../config/env';

interface AuthLayoutProps {
  title: string;
  children: React.ReactNode;
}

const AuthLayout = ({ title, children }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'background.default',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          width: '100%',
          maxWidth: 400,
          textAlign: 'center',
        }}
      >
        <GraduationCap size={48} strokeWidth={1.5} />
        <Typography variant="h5" sx={{ mt: 2, mb: 3 }}>
          {title}
        </Typography>
        {children}
      </Paper>
    </Box>
  );
};

export default AuthLayout;