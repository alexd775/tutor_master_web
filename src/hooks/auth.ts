import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../lib/api';
import { useAuthStore } from '../stores/authStore';
import { LoginRequest, RegisterRequest, AuthResponse, User } from '../types/auth';

export const useLogin = () => {
  const navigate = useNavigate();
  const { setTokens, setUser } = useAuthStore();

  return useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      try {
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        const { data: authData } = await api.post<AuthResponse>('/api/v1/auth/login', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });

        setTokens(authData.access_token, authData.refresh_token);

        const { data: userData } = await api.get<User>('/api/v1/users/me');
        return { auth: authData, user: userData };
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 401) {
            throw new Error('Invalid email or password');
          }
          throw new Error(error.response?.data?.message || 'Login failed');
        }
        throw new Error('An unexpected error occurred');
      }
    },
    onSuccess: ({ auth, user }) => {
      setUser({
        id: user.id,
        email: user.email,
        fullName: user.full_name,
        role: user.role,
      });
      navigate('/');
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      try {
        const response = await api.post<User>('/api/v1/auth/register', data);
        return response.data;
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status === 422) {
            throw new Error(JSON.stringify(error.response.data));
          }
          throw new Error(error.response?.data?.detail || 'Registration failed');
        }
        throw new Error('An unexpected error occurred');
      }
    },
    onSuccess: () => {
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    },
  });
};