import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { Session } from '../types/session';

export const useSessions = () => {
    return useQuery({
        queryKey: ['sessions'],
        queryFn: async () => {
            const { data } = await api.get<Session[]>('/api/v1/sessions/me');
            return data;
        },
    });
};