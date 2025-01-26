import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { TopicFile } from '../types/file';

interface UploadFileData {
    topicId: string;
    file: File;
    title: string;
    description?: string;
    file_search: boolean;
}

export const useFileManagement = () => {
    const queryClient = useQueryClient();

    const uploadFile = useMutation({
        mutationFn: async ({ topicId, file, title, description, file_search }: UploadFileData) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('file_search', file_search.toString());
            if (description) {
                formData.append('description', description);
            }

            const { data } = await api.post(`/api/v1/files/upload?topic_id=${topicId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        },
        onSuccess: (_, { topicId }) => {
            queryClient.invalidateQueries({ queryKey: ['files', topicId] });
            queryClient.invalidateQueries({ queryKey: ['topics'] });
        },
    });

    const deleteFile = useMutation({
        mutationFn: async (fileId: string) => {
            await api.delete(`/api/v1/files/${fileId}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['files'] });
            queryClient.invalidateQueries({ queryKey: ['topics'] });
        },
    });

    return {
        uploadFile,
        deleteFile,
    };
};