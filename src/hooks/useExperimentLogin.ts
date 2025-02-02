import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../stores/authStore';
import api from '../lib/api';
import { AuthResponse } from '../types/auth';

interface ExperimentLoginRequest {
  code: string;
  password?: string;
  email?: string;
  name?: string;
  experiment_id: string;
}

export const useExperimentLogin = ({ onSuccess, onError }: {
  onSuccess?: () => void;
  onError?: (error: any) => void;
}) => {
  const { setTokens } = useAuthStore();

  return useMutation({
    mutationFn: async (data: ExperimentLoginRequest) => {
      const { data: response } = await api.post<AuthResponse>(
        `/api/v1/experiments/activate/`,
        {
          code: data.code,
          password: data.password || undefined,
          email: data.email || undefined,
          name: data.name || undefined,
          experiment_id: data.experiment_id,
        }
      );
      return response;
    },
    onSuccess: (data) => {
      setTokens(data.access_token, data.refresh_token);
      onSuccess?.();
    },
    onError,
  });
};