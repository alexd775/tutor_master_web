import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { TopicResponse } from '../types/topic';

export const useTopics = (parentId?: string) => {
  return useQuery({
    queryKey: ['topics', parentId],
    queryFn: async () => {
      const { data } = await api.get<TopicResponse[]>('/api/v1/topics', {
        params: { parent_id: parentId },
      });
      return data;
    },
  });
};

export const useTopic = (topicId: string) => {
  return useQuery({
    queryKey: ['topics', topicId],
    queryFn: async () => {
      const { data } = await api.get<TopicResponse>(`/api/v1/topics/${topicId}`);
      return data;
    },
  });
};