import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../lib/api';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  user: any | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  setTokens: (accessToken: string, refreshToken: string) => void;
  setUser: (user: any) => void;
  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  getAuthHeader: () => Record<string, string>;
  refreshAccessToken: () => Promise<boolean>;
  fetchUserData: () => Promise<void>;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      setTokens: (accessToken, refreshToken) => set({ accessToken, refreshToken }),
      setUser: (user) => set({ user }),

      login: (accessToken, refreshToken) => {
        set({ accessToken, refreshToken, isAuthenticated: true, error: null });
      },

      logout: () => {
        set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
      },

      getAuthHeader: () => {
        const { accessToken } = get();
        return accessToken ? { Authorization: `Bearer ${accessToken}` } : {} as Record<string, string>;
      },

      refreshAccessToken: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          set({ isAuthenticated: false, accessToken: null });
          return false;
        }

        try {
          const response = await api.post('/api/v1/auth/refresh', { refresh_token: refreshToken });
          const { access_token } = response.data;
          set({ accessToken: access_token, isAuthenticated: true });
          return true;
        } catch (error) {
          set({ accessToken: null, refreshToken: null, user: null, isAuthenticated: false });
          return false;
        }
      },

      fetchUserData: async () => {
        const { accessToken, refreshAccessToken } = get();
        
        // Don't attempt to fetch user data if no token exists
        if (!accessToken) {
          set({ isAuthenticated: false, isLoading: false });
          return;
        }

        set({ isLoading: true });
        
        try {
          const response = await api.get('/api/v1/users/me');
          set({ user: response.data, isLoading: false, isAuthenticated: true });
        } catch (error: any) {
          if (error.response?.status === 401) {
            // Try to refresh token
            const refreshed = await refreshAccessToken();
            if (refreshed) {
              // Retry with new token
              try {
                const response = await api.get('/api/v1/users/me');
                set({ user: response.data, isLoading: false, isAuthenticated: true });
              } catch {
                set({ isLoading: false, isAuthenticated: false, user: null });
              }
            } else {
              set({ isLoading: false, isAuthenticated: false, user: null });
            }
          } else {
            set({ isLoading: false, error: 'Failed to fetch user data' });
          }
        }
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);