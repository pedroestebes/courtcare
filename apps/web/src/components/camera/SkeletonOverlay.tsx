import { useEffect } from "react";
import type { Landmark } from "@/types/pose";
import { POSE_CONNECTIONS } from "@/types/pose";

interface SkeletonOverlayProps {
  canvas: HTMLCanvasElement | null;
  landmarks: Landmark[] | null;
  score?: number;
}

function getScoreColor(score: number): string {
  if (score >= 85) return "#22c55e";
  if (score >= 70) return "#eab308";
  if (score >= 50) return "#f97316";
  return "#ef4444";
}

export function SkeletonOverlay({ canvas, landmarks, score = 75 }: SkeletonOverlayProps) {
  useEffect(() => {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (!landmarks || landmarks.length === 0) return;

    const w = canvas.width;
    const h = canvas.height;
    const color = getScoreColor(score);

    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.lineCap = "round";

    for (const [startIdx, endIdx] of POSE_CONNECTIONS) {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];

      if (start.visibility < 0.4 || end.visibility < 0.4) continue;

      ctx.beginPath();
      ctx.moveTo(start.x * w, start.y * h);
      ctx.lineTo(end.x * w, end.y * h);
      ctx.stroke();
    }

    for (let i = 0; i < landmarks.length; i++) {
      const lm = landmarks[i];
      if (lm.visibility < 0.4) continue;

      const x = lm.x * w;
      const y = lm.y * h;

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
  }, [canvas, landmarks, score]);

  return null;
}
