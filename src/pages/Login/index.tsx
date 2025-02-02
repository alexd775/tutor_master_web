import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';
import AuthLayout from '../../components/common/Layout/AuthLayout';

const Login = () => {
  return (
    <AuthLayout title="Welcome to Tutor Master">
      <LoginForm />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Don't have an account?{' '}
        <Link component={RouterLink} to="/register">
          Register here
        </Link>
      </Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Have an experiment access code?{' '}
        <Link component={RouterLink} to="/experiment">
          Login to experiment
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Login