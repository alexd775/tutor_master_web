import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { User } from '../types/auth';

export const useTheme = () => {
  const queryClient = useQueryClient();

  const { data: user } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await api.get<User>('/api/v1/users/me');
      return data;
    },
  });

  const { mutate: updateTheme } = useMutation({
    mutationFn: async (mode: 'light' | 'dark') => {
      await api.put('/api/v1/users/me/preferences', {
        theme: mode,
      });
    },
    onMutate: async (newMode) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user'] });

      // Snapshot the previous value
      const previousUser = queryClient.getQueryData<User>(['user']);

      // Optimistically update to the new value
      if (previousUser) {
        queryClient.setQueryData<User>(['user'], {
          ...previousUser,
          preferences: {
            ...previousUser.preferences,
            theme: newMode
          }
        });
      }

      return { previousUser };
    },
    onError: (err, newMode, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousUser) {
        queryClient.setQueryData(['user'], context.previousUser);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  return {
    mode: user?.preferences?.theme || 'light',
    setMode: updateTheme,
  };
};