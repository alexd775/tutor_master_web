import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { User } from '../types/auth';
import { UserFilters } from '../types/user';

export const useUsers = (filters: UserFilters = {}) => {
    return useQuery({
        queryKey: ['users', filters],
        queryFn: async () => {
            const { data } = await api.get<User[]>('/api/v1/users/all', {
                params: filters
            });
            return data;
        },
    });
};