export interface UserStats {
    total_sessions: number;
    completed_topics: number;
}

export interface UserFilters {
    role?: string;
    is_active?: boolean;
    search?: string;
}