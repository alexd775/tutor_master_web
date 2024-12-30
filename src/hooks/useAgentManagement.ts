import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Agent } from '../types/agent';

export const useAgentManagement = () => {
    const queryClient = useQueryClient();

    const createAgent = useMutation({
        mutationFn: async (data: Omit<Agent, 'id' | 'created_at' | 'updated_at'>) => {
            const { data: response } = await api.post('/api/v1/agents', data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });

    const updateAgent = useMutation({
        mutationFn: async ({ id, ...data }: Omit<Agent, 'created_at' | 'updated_at'>) => {
            const { data: response } = await api.put(`/api/v1/agents/${id}`, data);
            return response;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });

    const deleteAgent = useMutation({
        mutationFn: async (id: string) => {
            await api.delete(`/api/v1/agents/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['agents'] });
        },
    });

    return {
        createAgent,
        updateAgent,
        deleteAgent,
    };
};