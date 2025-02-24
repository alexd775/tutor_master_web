import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';

interface SessionTimeResponse {
  is_valid: boolean;
  remaining_seconds: number | null;
}

export const useSessionTimer = (sessionId: string) => {
  const [showExpirationWarning, setShowExpirationWarning] = useState(false);
  const [isExpired, setIsExpired] = useState(false);
  const [lastWarningTime, setLastWarningTime] = useState<number | null>(null);
  const [isExpirable, setIsExpirable] = useState<boolean>(true);

  const { data, isLoading } = useQuery({
    queryKey: ['session-time', sessionId],
    queryFn: async () => {
      const { data } = await api.get<SessionTimeResponse>(`/api/v1/sessions/${sessionId}/time`);
      return data;
    },
    refetchInterval: isExpired || !isExpirable ? false : 10000, // Check every 10 seconds if not expired and expirable
    enabled: !!sessionId && !isExpired && isExpirable,
  });

  useEffect(() => {
    if (data) {
      // Handle non-expirable sessions
      if (data.remaining_seconds === null) {
        setIsExpirable(false);
        return;
      }

      // Set expired state when time is up
      if (!data.is_valid) {
        setIsExpired(true);
        return;
      }

      // Show warning at specific time thresholds
    //   const shouldShowWarning = (
    //     (data.remaining_seconds <= 300 && data.remaining_seconds > 290) || // 5 minutes
    //     (data.remaining_seconds <= 120 && data.remaining_seconds > 110)    // 2 minutes
    //   );
      const shouldShowWarning = data.remaining_seconds <= 300 && data.remaining_seconds > 290;

      if (shouldShowWarning && (!lastWarningTime || Date.now() - lastWarningTime > 10000)) {
        setShowExpirationWarning(true);
        setLastWarningTime(Date.now());
        // Hide warning after 10 seconds
        setTimeout(() => setShowExpirationWarning(false), 10000);
      }
    }
  }, [data, lastWarningTime]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${remainingSeconds}s`;
  };

  return {
    isLoading,
    isExpired,
    isExpirable,
    showExpirationWarning,
    remainingTime: data?.remaining_seconds ? formatTime(data.remaining_seconds) : null,
    remainingSeconds: data?.remaining_seconds,
  };
};