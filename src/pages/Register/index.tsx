import { Typography, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import RegisterForm from '../../components/auth/RegisterForm';
import AuthLayout from '../../components/common/Layout/AuthLayout';

const Register = () => {
  return (
    <AuthLayout title="Create an Account">
      <RegisterForm />
      <Typography variant="body2" sx={{ mt: 2 }}>
        Already have an account?{' '}
        <Link component={RouterLink} to="/login">
          Login here
        </Link>
      </Typography>
    </AuthLayout>
  );
};

export default Register;