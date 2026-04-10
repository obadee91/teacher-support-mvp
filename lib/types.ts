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
  interpretation: string;
  strategies: string[];
  scripts: string[];
  nextSteps: string[];
  escalation: string;
  disclaimer: string;
}

export interface SavedNote {
  id: string;
  studentName: string;
  concern: string;
  interpretation: string;
  strategies: string[];
  scripts: string[];
  nextSteps: string[];
  escalation: string;
  disclaimer: string;
  createdAt: string;
}
