import { useState } from 'react';
import { Button, Alert } from '@mui/material';
import { useLogin } from '../../hooks/auth';
import FormTextField from '../common/Form/FormTextField';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate: login, isError, error } = useLogin();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login({ username: email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      {isError && <Alert severity="error" sx={{ mb: 2 }}>{error?.message}</Alert>}
      <FormTextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <FormTextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button
        fullWidth
        type="submit"
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
      >
        Login
      </Button>
    </form>
  );
};

export default LoginForm;