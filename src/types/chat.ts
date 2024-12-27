export interface ChatMessage {
    id: string;
    session_id: string;
    role: 'system' | 'assistant' | 'user';
    content: string;
    created_at: string;
}

export interface SendMessageRequest {
    content: string;
}

export interface ChatHistoryResponse {
    messages: ChatMessage[];
}