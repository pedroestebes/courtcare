import { cn } from "@/lib/utils";

interface AccuracyBadgeProps {
  landmarks: Array<{ visibility: number }> | null;
  className?: string;
  compact?: boolean;
}

/**
 * Shows pose detection accuracy based on MediaPipe landmark visibility scores.
 * Visibility is 0-1 per landmark; we average the key body landmarks to get a confidence %.
 */
export function AccuracyBadge({ landmarks, className, compact = false }: AccuracyBadgeProps) {
  if (!landmarks || landmarks.length === 0) return null;

  // Key body landmarks for court sports (skip face landmarks 0-10)
  const keyIndices = [
    11, 12, // shoulders
    13, 14, // elbows
    15, 16, // wrists
    23, 24, // hips
    25, 26, // knees
    27, 28, // ankles
  ];

  const keyLandmarks = keyIndices
    .filter((i) => i < landmarks.length)
    .map((i) => landmarks[i]);

  if (keyLandmarks.length === 0) return null;

  const avgVisibility = keyLandmarks.reduce((sum, lm) => sum + (lm.visibility ?? 0), 0) / keyLandmarks.length;
  const accuracy = Math.round(avgVisibility * 100);

  const color = accuracy >= 90
    ? "text-green-400 bg-green-500/15 border-green-500/20"
    : accuracy >= 70
      ? "text-amber-400 bg-amber-500/15 border-amber-500/20"
      : "text-red-400 bg-red-500/15 border-red-500/20";

  const label = accuracy >= 90 ? "Excellent" : accuracy >= 70 ? "Good" : "Low";

  if (compact) {
    return (
      <div className={cn("flex items-center gap-1.5 px-2 py-1 rounded-lg border text-xs font-medium", color, className)}>
        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5M20.25 16.5V18A2.25 2.25 0 0 1 18 20.25h-1.5M3.75 16.5V18A2.25 2.25 0 0 0 6 20.25h1.5" />
        </svg>
        {accuracy}%
      </div>
    );
  }

  return (
    <div className={cn("rounded-xl border p-3", color, className)}>
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75H6A2.25 2.25 0 0 0 3.75 6v1.5M16.5 3.75H18A2.25 2.25 0 0 1 20.25 6v1.5M20.25 16.5V18A2.25 2.25 0 0 1 18 20.25h-1.5M3.75 16.5V18A2.25 2.25 0 0 0 6 20.25h1.5" />
          </svg>
          <span className="text-xs font-semibold">Detection Accuracy</span>
        </div>
        <span className="text-sm font-black tabular-nums">{accuracy}%</span>
      </div>
      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden mb-1">
        <div
          className={cn("h-full rounded-full transition-all duration-500",
            accuracy >= 90 ? "bg-green-400" : accuracy >= 70 ? "bg-amber-400" : "bg-red-400"
          )}
          style={{ width: `${accuracy}%` }}
        />
      </div>
      <p className="text-xs opacity-70">{label} — {keyLandmarks.length} joints tracked at {accuracy}% confidence</p>
    </div>
  );
}

/**
 * Calculates average accuracy from landmarks for use in session summaries.
 */
export function calculateAccuracy(landmarks: Array<{ visibility: number }> | null): number {
  if (!landmarks || landmarks.length === 0) return 0;
  const keyIndices = [11, 12, 13, 14, 15, 16, 23, 24, 25, 26, 27, 28];
  const keyLandmarks = keyIndices.filter((i) => i < landmarks.length).map((i) => landmarks[i]);
  if (keyLandmarks.length === 0) return 0;
  return Math.round(keyLandmarks.reduce((sum, lm) => sum + (lm.visibility ?? 0), 0) / keyLandmarks.length * 100);
}
