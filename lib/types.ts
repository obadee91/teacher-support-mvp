export interface ConcernOption {
  id: string;
  label: string;
}

export interface GenerateRequest {
  concern: string;
  observations: string[];
  teacherNotes: string;
  ageGroup?: string;
  setting?: string;
  frequency?: string;
}

export interface GenerateResponse {
  response: string;
  strategies: string[];
  followUp: string;
}

export interface SavedNote {
  id: string;
  studentName: string;
  concern: string;
  response: string;
  strategies: string[];
  followUp: string;
  createdAt: string;
}
