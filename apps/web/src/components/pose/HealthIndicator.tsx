import type { HealthMetrics } from "@/types/session";
import { cn } from "@/lib/utils";

interface HealthIndicatorProps {
  healthMetrics: HealthMetrics | null;
  className?: string;
}

function riskColor(risk: number): string {
  if (risk >= 70) return "text-red-400";
  if (risk >= 40) return "text-amber-400";
  if (risk >= 15) return "text-yellow-300";
  return "text-green-400";
}

function riskBg(risk: number): string {
  if (risk >= 70) return "bg-red-500/30 border-red-500/50";
  if (risk >= 40) return "bg-amber-500/20 border-amber-400/40";
  if (risk >= 15) return "bg-yellow-500/15 border-yellow-400/30";
  return "bg-green-500/15 border-green-400/30";
}

function riskLabel(risk: number): string {
  if (risk >= 70) return "HIGH RISK";
  if (risk >= 40) return "CAUTION";
  if (risk >= 15) return "LOW RISK";
  return "SAFE";
}

function fatigueLabel(level: number): string {
  if (level >= 70) return "High Fatigue";
  if (level >= 40) return "Moderate";
  if (level >= 15) return "Low";
  return "Fresh";
}

export function HealthIndicator({
  healthMetrics,
  className,
}: HealthIndicatorProps) {
  if (!healthMetrics) return null;

  const { overallRisk, injuryRisks, fatigueLevel, sessionSafe, dangerAlerts } =
    healthMetrics;

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {/* Overall Safety Status */}
      <div
        className={cn(
          "flex items-center justify-between px-3 py-2 rounded-lg border backdrop-blur-sm",
          riskBg(overallRisk)
        )}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">
            {sessionSafe ? "\u2764\uFE0F" : "\u26A0\uFE0F"}
          </span>
          <div>
            <p
              className={cn(
                "text-xs font-bold uppercase tracking-wider",
                riskColor(overallRisk)
              )}
            >
              {riskLabel(overallRisk)}
            </p>
            <p className="text-xs text-white/50">Injury Risk</p>
          </div>
        </div>

        {/* Fatigue Meter */}
        <div className="text-right">
          <p
            className={cn("text-xs font-semibold", riskColor(fatigueLevel))}
          >
            {fatigueLabel(fatigueLevel)}
          </p>
          <p className="text-xs text-white/50">Fatigue</p>
        </div>
      </div>

      {/* Danger Alerts */}
      {dangerAlerts.length > 0 && (
        <div className="flex flex-col gap-1">
          {dangerAlerts.map((alert, i) => (
            <div
              key={i}
              className="flex items-start gap-2 px-3 py-2 rounded-lg bg-red-600/30 border border-red-500/50 animate-pulse"
            >
              <span className="text-red-400 text-sm shrink-0">
                {"\u26D4"}
              </span>
              <p className="text-xs text-red-200 leading-snug">{alert}</p>
            </div>
          ))}
        </div>
      )}

      {/* Active Injury Risks */}
      {injuryRisks.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {injuryRisks.slice(0, 3).map((risk, i) => (
            <span
              key={i}
              className={cn(
                "px-2 py-0.5 rounded text-xs font-medium border",
                risk.level === "danger"
                  ? "bg-red-500/20 border-red-500/40 text-red-300"
                  : risk.level === "warning"
                    ? "bg-amber-500/20 border-amber-400/40 text-amber-300"
                    : "bg-yellow-500/15 border-yellow-400/30 text-yellow-300"
              )}
            >
              {risk.joint}: {risk.level}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
