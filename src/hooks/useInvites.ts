import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { InviteListResponse } from '../types/invite';

export const useInvites = (unused?: boolean) => {
    return useQuery({
        queryKey: ['invites', { unused }],
        queryFn: async () => {
            const { data } = await api.get<InviteListResponse>('/api/v1/invites', {
                params: { unused },
            });
            return data;
        },
    });
};

export const useInviteManagement = () => {
    const queryClient = useQueryClient();

    const generateInvites = useMutation({
        mutationFn: async (count: number) => {
            const { data } = await api.post('/api/v1/invites', { count });
            return data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['invites'] });
        },
    });

    return { generateInvites };
};