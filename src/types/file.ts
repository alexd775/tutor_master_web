export interface TopicFile {
    id: string;
    title: string;
    description: string;
    filename: string;
    content_type: string;
    size: number;
    created_at: string;
    topic_id: string;
    file_search: boolean;
    downloadable: boolean;
}

export interface FileListResponse {
    items: TopicFile[];
    total: number;
}