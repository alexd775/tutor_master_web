import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Session } from '../types/session';
import { TopicResponse } from '../types/topic';

export const useSessionData = (topicId: string) => {
    const { data: session, ...sessionQuery } = useQuery({
        queryKey: ['session', topicId],
        queryFn: async () => {
            const { data } = await api.get<Session>(`/api/v1/topics/${topicId}/session`);
            return data;
        },
        enabled: !!topicId,
    });

    const { data: topic, ...topicQuery } = useQuery({
        queryKey: ['topic', topicId],
        queryFn: async () => {
            const { data } = await api.get<TopicResponse>(`/api/v1/topics/${topicId}`);
            return data;
        },
        enabled: !!topicId,
    });

    return {
        session,
        topic,
        isLoading: sessionQuery.isLoading || topicQuery.isLoading,
        error: sessionQuery.error || topicQuery.error,
        refetch: sessionQuery.refetch || topicQuery.refetch,
    };
};