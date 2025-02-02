export interface ExperimentCode {
    id: string;
    code: string;
    is_used: boolean;
    experiment_id: string;
    used_by_id?: string;
    created_at: string;
  }
  
  export interface ExperimentCodeListResponse {
    items: ExperimentCode[];
    total: number;
  }
  
  export interface GenerateCodesRequest {
    count: number;
  }