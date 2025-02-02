import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { Experiment, ExperimentFormData, ExperimentListResponse } from '../types/experiment';

export const useExperiments = (includeExpired = false) => {
  return useQuery({
    queryKey: ['experiments', { includeExpired }],
    queryFn: async () => {
      const { data } = await api.get<Experiment[]>('/api/v1/experiments', {
        params: { include_expired: includeExpired }
      });
      return {
        items: data,
        total: data?.length || 0,
      };
    },
  });
};

export const useExperimentManagement = () => {
  const queryClient = useQueryClient();

  const createExperiment = useMutation({
    mutationFn: async (data: ExperimentFormData) => {
      const { data: response } = await api.post('/api/v1/experiments', data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  const updateExperiment = useMutation({
    mutationFn: async ({ id, ...data }: ExperimentFormData & { id: string }) => {
      const { data: response } = await api.put(`/api/v1/experiments/${id}`, data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  const deleteExperiment = useMutation({
    mutationFn: async (id: string) => {
      await api.delete(`/api/v1/experiments/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  return {
    createExperiment,
    updateExperiment,
    deleteExperiment,
  };
};

export const useCurrentExperiments = () => {
  return useQuery({
    queryKey: ['experiments', 'current'],
    queryFn: async () => {
      const { data } = await api.get<Experiment[]>('/api/v1/experiments/current');
      return data;
    },
  });
};