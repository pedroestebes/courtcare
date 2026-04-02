import { create } from "zustand";
import type { SessionStatus, FeedbackMessage, SessionFrame } from "@/types/session";

/** Persisted session result for local history */
export interface CompletedSession {
  id: string;
  drillSlug: string;
  drillName: string;
  startedAt: string;
  durationSeconds: number;
  averageScore: number;
  bestScore: number;
  totalReps: number;
  safe: boolean;
}

const HISTORY_KEY = "courtcare-session-history";

/** Read completed sessions from localStorage */
export function getSessionHistory(): CompletedSession[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

/** Save a completed session to localStorage */
export function saveSessionToHistory(session: CompletedSession): void {
  const history = getSessionHistory();
  history.unshift(session);
  // Keep last 100 sessions
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history.slice(0, 100)));
}

interface SessionState {
  status: SessionStatus;
  drillSlug: string | null;
  currentScore: number;
  smoothedScore: number;
  bestScore: number;
  totalReps: number;
  feedback: FeedbackMessage[];
  frames: SessionFrame[];
  elapsedSeconds: number;
  countdownValue: number;
  sessionSafe: boolean;

  startSession: (drillSlug: string) => void;
  setCountdown: (value: number) => void;
  activate: () => void;
  pause: () => void;
  resume: () => void;
  complete: () => void;
  reset: () => void;
  updateScore: (raw: number, smoothed: number) => void;
  setBestScore: (score: number) => void;
  incrementReps: () => void;
  setFeedback: (messages: FeedbackMessage[]) => void;
  addFrame: (frame: SessionFrame) => void;
  tick: () => void;
  markUnsafe: () => void;
}

export const useSessionStore = create<SessionState>()((set) => ({
  status: "idle",
  drillSlug: null,
  currentScore: 0,
  smoothedScore: 0,
  bestScore: 0,
  totalReps: 0,
  feedback: [],
  frames: [],
  elapsedSeconds: 0,
  countdownValue: 3,
  sessionSafe: true,

  startSession: (drillSlug) =>
    set({
      status: "countdown",
      drillSlug,
      currentScore: 0,
      smoothedScore: 0,
      bestScore: 0,
      totalReps: 0,
      feedback: [],
      frames: [],
      elapsedSeconds: 0,
      countdownValue: 3,
      sessionSafe: true,
    }),

  setCountdown: (value) => set({ countdownValue: value }),

  activate: () => set({ status: "active" }),

  pause: () => set({ status: "paused" }),

  resume: () => set({ status: "active" }),

  complete: () => set({ status: "completed" }),

  reset: () =>
    set({
      status: "idle",
      drillSlug: null,
      currentScore: 0,
      smoothedScore: 0,
      bestScore: 0,
      totalReps: 0,
      feedback: [],
      frames: [],
      elapsedSeconds: 0,
      countdownValue: 3,
      sessionSafe: true,
    }),

  updateScore: (raw, smoothed) =>
    set({ currentScore: raw, smoothedScore: smoothed }),

  setBestScore: (score) =>
    set((state) => ({
      bestScore: Math.max(state.bestScore, score),
    })),

  incrementReps: () =>
    set((state) => ({ totalReps: state.totalReps + 1 })),

  setFeedback: (messages) => set({ feedback: messages }),

  addFrame: (frame) =>
    set((state) => ({ frames: [...state.frames, frame] })),

  tick: () =>
    set((state) => ({ elapsedSeconds: state.elapsedSeconds + 1 })),

  markUnsafe: () => set({ sessionSafe: false }),
}));
