export interface Experiment {
    id: string;
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    is_active: boolean;
    code_single_use: boolean;
    topic_ids: string[];
    total_codes: number;
    used_codes: number;
    created_at: string;
  }
  
  export interface ExperimentFormData {
    title: string;
    description: string;
    start_date: string;
    end_date: string;
    topic_ids: string[];
    is_active: boolean;
    code_single_use: boolean;
  }
  
  export interface ExperimentListResponse {
    items: Experiment[];
    total: number;
  }