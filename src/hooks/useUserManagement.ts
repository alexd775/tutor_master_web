import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';

export const useUserManagement = () => {
    const queryClient = useQueryClient();

    const deactivateUser = useMutation({
        mutationFn: async (userId: string) => {
            await api.post(`/api/v1/users/${userId}/deactivate`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['users'] });
        },
    });

    return { deactivateUser };
};