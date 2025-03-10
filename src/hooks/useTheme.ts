import { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import api from '../lib/api';
import { useAuthStore } from '../stores/authStore';

export const useTheme = () => {
  const { user, isAuthenticated } = useAuthStore();
  
  const { mutate: updateTheme } = useMutation({
    mutationFn: async (mode: 'light' | 'dark') => {
      if (!isAuthenticated) return;
      
      const response = await api.put('/api/v1/users/me/preferences', {
        theme: mode,
      });
      return response.data;
    },
    onMutate: async (newMode) => {
      // Apply theme change immediately for better UX
      document.documentElement.setAttribute('data-theme', newMode);
      
      // Use the setState method to properly update the store
      const state = useAuthStore.getState();
      if (state.user) {
        useAuthStore.setState({
          user: {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              theme: newMode
            }
          }
        });
      }
      
      return { previousMode: user?.preferences?.theme || 'light' };
    },
    onError: (_, __, context) => {
      // Revert theme if mutation fails
      if (context?.previousMode) {
        document.documentElement.setAttribute('data-theme', context.previousMode);
      }
    },
    onSuccess: (data) => {
      // Update auth store with response data using setState
      const state = useAuthStore.getState();
      if (state.user) {
        useAuthStore.setState({
          user: {
            ...state.user,
            preferences: {
              ...state.user.preferences,
              ...data
            }
          }
        });
      }
    }
  });

  // Set initial theme on component mount
  useEffect(() => {
    if (isAuthenticated && user?.preferences?.theme) {
      document.documentElement.setAttribute('data-theme', user.preferences.theme);
    } else {
      // Default to system preference if no user preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
    }
  }, [user?.preferences?.theme, isAuthenticated]);

  return {
    mode: user?.preferences?.theme || 'light',
    setMode: updateTheme,
  };
};