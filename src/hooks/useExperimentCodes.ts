import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { ExperimentCode, ExperimentCodeListResponse } from '../types/experimentCode';

export const useExperimentCodes = (experimentId: string, showUsed = true) => {
  return useQuery({
    queryKey: ['experiment-codes', experimentId, showUsed],
    queryFn: async () => {
      const { data } = await api.get<ExperimentCode[]>(
        `/api/v1/experiments/${experimentId}/codes`,
        { params: { show_used: showUsed } }
      );
      return {
        items: data || [],
        total: data?.length || 0,
      } as ExperimentCodeListResponse;
    },
    enabled: !!experimentId,
  });
};

export const useExperimentCodeManagement = (experimentId: string) => {
  const queryClient = useQueryClient();

  const generateCodes = useMutation({
    mutationFn: async (count: number) => {
      const { data } = await api.post<ExperimentCode[]>(
        `/api/v1/experiments/${experimentId}/codes`,
        { count }
      );
      return {
        items: data || [],
        total: data?.length || 0,
      } as ExperimentCodeListResponse;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['experiment-codes', experimentId] });
      queryClient.invalidateQueries({ queryKey: ['experiments'] });
    },
  });

  return { generateCodes };
};