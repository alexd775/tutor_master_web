import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { TopicManagement, SessionManagement, TopicFormData } from '../types/management';

export const useAllSessions = (userId?: string, topicId?: string) => {
    return useQuery({
        queryKey: ['management', 'sessions', userId, topicId],
        queryFn: async () => {
            const { data } = await api.get<SessionManagement[]>('/api/v1/sessions/all', {
                params: {
                    user_id: userId,
                    topic_id: topicId
                }
            });
            return data;
        },
    });
};

export const useTopicManagement = () => {
    const queryClient = useQueryClient();

    const createTopic = useMutation({
        mutationFn: async (data: TopicFormData) => {
            const { data: response } = await api.post('/api/v1/topics', data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
        },
    });

    const updateTopic = useMutation({
        mutationFn: async (data: TopicFormData & { id: string }) => {
            const { id, ...updateData } = data;
            const { data: response } = await api.put(`/api/v1/topics/${id}`, updateData);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
        },
    });

    const deleteTopic = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/api/v1/topics/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['topics'] });
        },
    });

    return {
        createTopic,
        updateTopic,
        deleteTopic,
    };
};