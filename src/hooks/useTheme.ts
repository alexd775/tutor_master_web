import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { User } from '../types/auth';
import { useAuthStore } from '../stores/authStore';

export const useTheme = () => {
  const queryClient = useQueryClient();
  const { user, isAuthenticated } = useAuthStore();

  const { mutate: updateTheme } = useMutation({
    mutationFn: async (mode: 'light' | 'dark') => {
      if (!isAuthenticated) return;
      
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

  useEffect(() => {
    // Only attempt to set theme if user is authenticated
    if (!isAuthenticated) return;
    
    // Theme setting logic here
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userTheme = user?.preferences?.theme || (prefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', userTheme);
  }, [user, isAuthenticated]);

  return {
    mode: user?.preferences?.theme || 'light',
    setMode: updateTheme,
  };
};