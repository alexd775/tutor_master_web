export interface SessionInteractionData {
    "total_messages": number;
    "last_updated": string;
}

export interface Session {
    id: string;
    topic_id: string;
    user_id: string;
    duration: number;
    completion_rate: number;
    interaction_data: SessionInteractionData;
    feedback_score: number;
    created_at: string;
    topic_title: string;
    user_full_name: string;
}