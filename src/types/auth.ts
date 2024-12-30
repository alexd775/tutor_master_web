import { UserPreferences } from "./theme";

export enum UserRole {
  ADMIN = 'admin',
  TUTOR = 'tutor',
  STUDENT = 'student',
}

export enum MessageRole {
  SYSTEM = 'system',
  ASSISTANT = 'assistant',
  USER = 'user',
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  full_name: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}


export interface User {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  is_active: boolean;
  is_verified: boolean;
  preferences: UserPreferences;
  total_sessions: number;
  completed_topics: number;
}