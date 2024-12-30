export interface Agent {
    id: string;
    name: string;
    description?: string;
    type: string;
    is_active: boolean;
    config: Record<string, any>;
    system_prompt: string;
    welcome_message: string;
    reminder_message?: string;
    created_at: string;
    updated_at: string;
}

export interface AgentListResponse {
    items: Agent[];
    total: number;
}