import { cn } from "@/lib/utils";

interface ScoreGaugeProps {
  score: number;
  size?: number;
  className?: string;
}

function getColor(score: number): { stroke: string; text: string } {
  if (score >= 85) return { stroke: "#22c55e", text: "text-green-500" };
  if (score >= 70) return { stroke: "#eab308", text: "text-yellow-500" };
  if (score >= 50) return { stroke: "#f97316", text: "text-orange-500" };
  return { stroke: "#ef4444", text: "text-red-500" };
}

export function ScoreGauge({ score, size = 120, className }: ScoreGaugeProps) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(100, score));
  const offset = circumference - (progress / 100) * circumference;
  const { stroke, text } = getColor(score);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth={8}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={stroke}
          strokeWidth={8}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-300 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className={cn("text-2xl font-bold", text)}>
          {Math.round(score)}
        </span>
        <span className="text-xs text-white/60 uppercase tracking-wider">
          Score
        </span>
      </div>
    </div>
  );
}
