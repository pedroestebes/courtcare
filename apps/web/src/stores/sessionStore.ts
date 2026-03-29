import { create } from "zustand";
import type { SessionStatus, FeedbackMessage, SessionFrame } from "@/types/session";

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
}));
