import { create } from "zustand";

interface RecordedFrame {
  timestamp: number;
  imageDataUrl: string; // canvas snapshot as data URL (low quality JPEG)
  score: number;
  injuryRisk: number;
}

interface RecordingState {
  isRecording: boolean;
  frames: RecordedFrame[];
  startRecording: () => void;
  stopRecording: () => void;
  addFrame: (frame: RecordedFrame) => void;
  clear: () => void;
}

// Capture at 2fps to keep memory usage reasonable
export const CAPTURE_INTERVAL_MS = 500;
// Cap at 20 minutes of footage (2fps * 60s * 20min = 2400 frames)
const MAX_FRAMES = 2400;

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  frames: [],
  startRecording: () => set({ isRecording: true, frames: [] }),
  stopRecording: () => set({ isRecording: false }),
  addFrame: (frame) =>
    set((state) => ({
      frames: state.frames.length >= MAX_FRAMES
        ? [...state.frames.slice(1), frame]
        : [...state.frames, frame],
    })),
  clear: () => set({ isRecording: false, frames: [] }),
}));

/**
 * Captures a low-quality snapshot from a canvas element.
 */
export function captureCanvasFrame(canvas: HTMLCanvasElement | null): string | null {
  if (!canvas) return null;
  try {
    // Low quality JPEG to keep size small (~5-10KB per frame)
    return canvas.toDataURL("image/jpeg", 0.3);
  } catch {
    return null;
  }
}
