export interface TopicResponse {
  id: string;
  title: string;
  description?: string;
  content: Record<string, any>;
  agent_id: string;
  difficulty_level: number;
  parent_id?: string;
  engagement_score: number;
  duration: number;
  created_at: string;
  updated_at: string;
  subtopic_count: number;
  total_sessions: number;
  average_completion_rate: number;
  is_hidden?: boolean;
  session_opening_message?: string;
  session_time_limit?: number;
}

export interface TopicCreate {
  title: string;
  description?: string;
  content: Record<string, any>;
  agent_id: string;
  difficulty_level?: number;
  parent_id?: string;
  is_hidden?: boolean;
  session_opening_message?: string;
  session_time_limit?: number;
}