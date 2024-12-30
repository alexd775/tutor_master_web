import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { AgentListResponse } from '../types/agent';

export const useAgents = () => {
    return useQuery({
        queryKey: ['agents'],
        queryFn: async () => {
            const { data } = await api.get<AgentListResponse>('/api/v1/agents');
            return data.items;
        },
    });
};