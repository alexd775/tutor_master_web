import { ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { createAppTheme } from '../theme';
import { useTheme } from '../hooks/useTheme';

const queryClient = new QueryClient();

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

// Separate ThemeProvider to avoid the hook call before QueryClientProvider
const ThemeProviderWrapper = ({ children }: ThemeProviderWrapperProps) => {
  const { mode } = useTheme();
  const theme = createAppTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
};

export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
    </QueryClientProvider>
  );
};