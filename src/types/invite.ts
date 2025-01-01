export interface InviteCode {
    id: string;
    code: string;
    is_used: boolean;
    created_at: string;
    used_by_id?: string;
    created_by_id: string;
}

export interface InviteListResponse {
    items: InviteCode[];
    total: number;
}