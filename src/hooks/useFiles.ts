import { useQuery } from '@tanstack/react-query';
import api from '../lib/api';
import { FileListResponse } from '../types/file';

export const useTopicFiles = (topicId: string) => {
    return useQuery({
        queryKey: ['files', topicId],
        queryFn: async () => {
            const { data } = await api.get<FileListResponse>('/api/v1/files', {
                params: { topic_id: topicId }
            });
            return data;
        },
        enabled: !!topicId,
    });
};