export interface Score {
  overall: number;
  breakdown: Record<string, number>;
  timestamp: number;
}

export interface FeedbackMessage {
  id: string;
  text: string;
  type: "correction" | "encouragement" | "info" | "warning" | "danger";
  priority: number;
  timestamp: number;
}

export interface InjuryRisk {
  joint: string;
  level: "safe" | "caution" | "warning" | "danger";
  score: number; // 0-100, higher = more risk
  description: string;
}

export interface HealthMetrics {
  overallRisk: number; // 0-100
  injuryRisks: InjuryRisk[];
  fatigueLevel: number; // 0-100
  formDegradation: number; // percentage drop from initial form
  dangerAlerts: string[];
  sessionSafe: boolean;
}

export interface SessionFrame {
  timestamp: number;
  score: number;
  feedback: FeedbackMessage[];
  healthMetrics?: HealthMetrics;
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
  healthSummary?: HealthMetrics;
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
