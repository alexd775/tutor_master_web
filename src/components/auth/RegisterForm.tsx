import { useState } from 'react';
import { Button, Alert, FormControl, InputLabel, Select, MenuItem, Snackbar, TextField } from '@mui/material';
import { useRegister } from '../../hooks/auth';
import { UserRole } from '../../types/auth';
import FormTextField from '../common/Form/FormTextField';
import { env } from '../../config/env';

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    role: UserRole.STUDENT,
    inviteCode: '',
  });

  const { mutate: register, isError, error, isSuccess } = useRegister();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      email: formData.email,
      password: formData.password,
      full_name: formData.fullName,
      ...(env.features.enableInviteCode && { invite_code: formData.inviteCode }),
    });
  };

  const getErrorMessage = (error: Error) => {
    try {
      const errorData = JSON.parse(error.message);
      if (errorData.detail) {
        if (Array.isArray(errorData.detail)) {
          return errorData.detail.map((err: any) => err.msg).join(', ');
        }
        return errorData.detail;
      }
    } catch {
      return error.message;
    }
    return 'Registration failed. Please try again.';
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {isError && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {getErrorMessage(error as Error)}
          </Alert>
        )}
        <FormTextField
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />
        <FormTextField
          label="Email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <FormTextField
          label="Password"
          type="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
        {env.features.enableInviteCode && (
          <FormTextField
            label="Invite Code"
            value={formData.inviteCode}
            onChange={(e) => setFormData({ ...formData, inviteCode: e.target.value })}
            required
            helperText="Please enter your invitation code"
          />
        )}
        <FormControl fullWidth margin="normal">
          <InputLabel>Role</InputLabel>
          <Select
            value={formData.role}
            label="Role"
            onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
          >
            <MenuItem value={UserRole.STUDENT}>Student</MenuItem>
            <MenuItem value={UserRole.TUTOR}>Tutor</MenuItem>
          </Select>
        </FormControl>
        <Button
          fullWidth
          type="submit"
          variant="contained"
          size="large"
          sx={{ mt: 2 }}
        >
          Register
        </Button>
      </form>
      <Snackbar
        open={isSuccess}
        autoHideDuration={6000}
        message="Registration successful! You can now log in."
      />
    </>
  );
};

export default RegisterForm;