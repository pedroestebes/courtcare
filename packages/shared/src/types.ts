export interface User {
  id: string;
  email: string;
  displayName: string;
  createdAt: string;
}

export interface Drill {
  id: string;
  slug: string;
  name: string;
  sport: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  instructions: string[];
  referenceAngles: Record<string, number>;
}

export interface Session {
  id: string;
  userId: string;
  drillId: string;
  drillName: string;
  startedAt: string;
  endedAt: string | null;
  overallScore: number | null;
  durationSeconds: number | null;
}

export interface SessionFrame {
  id: string;
  sessionId: string;
  timestampMs: number;
  landmarks: Record<string, { x: number; y: number; z: number }>;
  scores: Record<string, number>;
  feedback: string[];
}

export interface SessionSummary {
  id: string;
  sessionId: string;
  avgScore: number;
  bestScore: number;
  weakAreas: string[];
  tips: string[];
}
