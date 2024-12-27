export interface TopicFile {
    id: string;
    title: string;
    description: string;
    filename: string;
    file_path: string;
    content_type: string;
    size: number;
    created_at: string;
    topic_id: string;
}

export interface FileListResponse {
    items: TopicFile[];
    total: number;
}