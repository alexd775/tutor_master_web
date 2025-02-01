import { User } from './auth';
import { TopicResponse } from './topic';
import { Session } from './session';

export interface TopicManagement extends TopicResponse {
    user?: User;
}

export interface SessionManagement extends Session {
    user: User;
}

export interface TopicFormData {
    title: string;
    description?: string;
    content: Record<string, any>;
    difficulty_level: number;
    parent_id?: string;
    duration: number;
    is_hidden?: boolean;
    session_opening_message?: string;
}