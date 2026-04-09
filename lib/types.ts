export interface ConcernOption {
  id: string;
  label: string;
  category: string;
}

export interface ObservationOption {
  id: string;
  label: string;
  concernId: string;
}

export interface GenerateRequest {
  concern: string;
  observations: string[];
  teacherNotes: string;
  studentName?: string;
  gradeLevel?: string;
  subject?: string;
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
