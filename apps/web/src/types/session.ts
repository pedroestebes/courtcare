export interface Score {
  overall: number;
  breakdown: Record<string, number>;
  timestamp: number;
}

export interface FeedbackMessage {
  id: string;
  text: string;
  type: "correction" | "encouragement" | "info";
  priority: number;
  timestamp: number;
}

export interface SessionFrame {
  timestamp: number;
  score: number;
  feedback: FeedbackMessage[];
}

export type SessionStatus = "idle" | "countdown" | "active" | "paused" | "completed";

export interface Session {
  id: string;
  drillSlug: string;
  drillName: string;
  startedAt: string;
  completedAt: string | null;
  duration: number;
  averageScore: number;
  bestScore: number;
  totalReps: number;
  frames: SessionFrame[];
  feedbackHighlights: FeedbackMessage[];
}

export interface SessionSummary {
  id: string;
  drillSlug: string;
  drillName: string;
  startedAt: string;
  duration: number;
  averageScore: number;
  totalReps: number;
}
