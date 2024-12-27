export interface Session {
    id: string;
    topic_id: string;
    user_id: string;
    duration: number;
    completion_rate: number;
    interaction_data: Record<string, any>;
    feedback_score: number;
    created_at: string;
    topic_title: string;
}