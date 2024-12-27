import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../lib/api';
import { ChatMessage, ChatHistoryResponse, SendMessageRequest } from '../types/chat';

export const useChatHistory = (sessionId: string) => {
    return useQuery({
        queryKey: ['chat', sessionId],
        queryFn: async () => {
            const { data } = await api.get<ChatHistoryResponse>(
                `/api/v1/chat/sessions/${sessionId}/chat`
            );
            return data.messages;
        },
        enabled: !!sessionId,
    });
};

export const useSendMessage = (sessionId: string) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (message: SendMessageRequest) => {
            const { data } = await api.post<ChatMessage[]>(
                `/api/v1/chat/sessions/${sessionId}/chat`,
                message
            );
            return data;
        },
        onSuccess: (newMessages) => {
            queryClient.setQueryData<ChatMessage[]>(['chat', sessionId], (old = []) => [
                ...old,
                ...newMessages,
            ]);
        },
    });
}