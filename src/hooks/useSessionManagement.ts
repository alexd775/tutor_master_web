import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Session } from '../types/session';

export const useSessionManagement = () => {
    const queryClient = useQueryClient();

    const restartSession = useMutation({
        mutationFn: async (sessionId: string) => {
            const { data } = await api.post<Session>(`/api/v1/sessions/${sessionId}/disable`);
            return data;
        },
        onSuccess: (newSession) => {
            // Update the session data in the cache
            queryClient.setQueryData(['session', newSession.topic_id], newSession);
            // Invalidate the chat history for the new session
            queryClient.invalidateQueries({ queryKey: ['chat', newSession.id] });
        },
    });

    return { restartSession };
};