import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BodyZone {
  area: string;
  status: "healthy" | "watch" | "injured";
  detail: string;
  recovery?: string;
  sessions?: number;
  trend?: "improving" | "stable" | "declining";
  healthScore?: number; // 0-100
  recentScores?: number[]; // last 5 session scores for sparkline
  recommendation?: string;
  estimatedClearance?: string; // e.g. "Apr 12"
}

interface BodyMapProps {
  zones: BodyZone[];
  className?: string;
  darkMode?: boolean;
}

const statusColors = {
  healthy: { stroke: "#22c55e", fill: "#22c55e", bg: "bg-green-50", text: "text-green-700", darkText: "text-green-400", border: "border-green-200", label: "Healthy" },
  watch: { stroke: "#f59e0b", fill: "#f59e0b", bg: "bg-amber-50", text: "text-amber-700", darkText: "text-amber-400", border: "border-amber-200", label: "Watch" },
  injured: { stroke: "#ef4444", fill: "#ef4444", bg: "bg-red-50", text: "text-red-700", darkText: "text-red-400", border: "border-red-200", label: "Injured" },
};

function getZone(zones: BodyZone[], area: string): BodyZone | undefined {
  return zones.find((z) => z.area === area);
}

function getStatus(zones: BodyZone[], area: string) {
  return statusColors[getZone(zones, area)?.status ?? "healthy"];
}

// Mini sparkline SVG for trend visualization
function Sparkline({ data, color }: { data: number[]; color: string }) {
  if (!data || data.length < 2) return null;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const w = 60;
  const h = 20;
  const padding = 2;

  const points = data
    .map((v, i) => {
      const x = padding + (i / (data.length - 1)) * (w - padding * 2);
      const y = h - padding - ((v - min) / range) * (h - padding * 2);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dot on last point */}
      {data.length > 0 && (() => {
        const lastX = padding + ((data.length - 1) / (data.length - 1)) * (w - padding * 2);
        const lastY = h - padding - ((data[data.length - 1] - min) / range) * (h - padding * 2);
        return <circle cx={lastX} cy={lastY} r="2" fill={color} />;
      })()}
    </svg>
  );
}

// Health score progress bar
function HealthBar({ score, status }: { score: number; status: "healthy" | "watch" | "injured" }) {
  const barColor = status === "healthy"
    ? "bg-green-400"
    : status === "watch"
      ? "bg-amber-400"
      : "bg-red-400";

  return (
    <div className="flex items-center gap-2 w-full">
      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className={cn("h-full rounded-full transition-all duration-700", barColor)}
          style={{ width: `${score}%` }}
        />
      </div>
      <span className={cn("text-xs font-bold tabular-nums w-7 text-right", statusColors[status].darkText)}>
        {score}
      </span>
    </div>
  );
}

interface JointDotProps {
  cx: number;
  cy: number;
  zones: BodyZone[];
  area: string;
  selected: string | null;
  onSelect: (area: string) => void;
  r?: number;
}

function JointDot({ cx, cy, zones, area, selected, onSelect, r = 7 }: JointDotProps) {
  const status = getZone(zones, area)?.status ?? "healthy";
  const colors = statusColors[status];
  const isSelected = selected === area;
  const needsAttention = status !== "healthy";

  return (
    <g
      onClick={() => onSelect(area)}
      className="cursor-pointer"
    >
      {/* Invisible expanded touch target (44px minimum) */}
      <circle cx={cx} cy={cy} r={22} fill="transparent" />
      {/* Pulse ring for non-healthy joints */}
      {needsAttention && (
        <circle
          cx={cx} cy={cy} r={r + 6}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="1.5"
          opacity="0.4"
        >
          <animate attributeName="r" values={`${r + 4};${r + 10};${r + 4}`} dur="2s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="2s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Selection ring */}
      {isSelected && (
        <circle
          cx={cx} cy={cy} r={r + 4}
          fill="none"
          stroke={colors.stroke}
          strokeWidth="2"
          strokeDasharray="4 2"
        >
          <animateTransform attributeName="transform" type="rotate" from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`} dur="8s" repeatCount="indefinite" />
        </circle>
      )}

      {/* Main joint circle */}
      <circle
        cx={cx} cy={cy} r={r}
        stroke={colors.stroke}
        strokeWidth="2.5"
        fill={colors.fill}
        fillOpacity={isSelected ? "0.35" : "0.15"}
        style={{ filter: `drop-shadow(0 0 ${needsAttention ? 8 : 4}px ${colors.fill}60)` }}
      />
      <circle cx={cx} cy={cy} r={r * 0.4} fill={colors.fill} fillOpacity="0.6" />
    </g>
  );
}

export function BodyMap({ zones, className, darkMode = false }: BodyMapProps) {
  const [selected, setSelected] = useState<string | null>(null);

  const selectedZone = selected ? getZone(zones, selected) : null;
  const selectedColors = selected ? getStatus(zones, selected) : null;

  // Limb colors
  const spineColor = getStatus(zones, "Lower Back");
  const defaultColor = statusColors.healthy;

  // Overall body health
  const avgHealth = Math.round(zones.reduce((s, z) => s + (z.healthScore ?? (z.status === "healthy" ? 95 : z.status === "watch" ? 60 : 25)), 0) / zones.length);
  const healthyCount = zones.filter((z) => z.status === "healthy").length;
  const watchCount = zones.filter((z) => z.status === "watch").length;
  const injuredCount = zones.filter((z) => z.status === "injured").length;

  return (
    <div className={cn("flex flex-col lg:flex-row gap-6 items-start", className)}>
      {/* Body visualization */}
      <div className="relative w-48 sm:w-56 shrink-0 mx-auto lg:mx-0">
        <svg viewBox="0 0 200 420" className="w-full h-full" fill="none">
          {/* Head with subtle breathing animation */}
          <circle cx="100" cy="42" r="20" stroke={defaultColor.stroke} strokeWidth="2" fill={defaultColor.fill} fillOpacity="0.08">
            <animate attributeName="r" values="20;21;20" dur="3s" repeatCount="indefinite" />
          </circle>
          <circle cx="100" cy="42" r="4" fill={defaultColor.fill} fillOpacity="0.3" />

          {/* Neck */}
          <line x1="100" y1="62" x2="100" y2="82" stroke={defaultColor.stroke} strokeWidth="2" strokeOpacity="0.6" />

          {/* Shoulder line */}
          <line x1="58" y1="88" x2="142" y2="88" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Spine */}
          <line x1="100" y1="88" x2="100" y2="198" stroke={spineColor.stroke} strokeWidth="2.5" strokeOpacity="0.7"
            style={{ filter: `drop-shadow(0 0 4px ${spineColor.fill}40)` }} />

          {/* Left arm */}
          <line x1="58" y1="88" x2="38" y2="142" stroke={getStatus(zones, "Left Elbow").stroke} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="38" y1="142" x2="28" y2="195" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="28" cy="195" r="3" fill={defaultColor.fill} fillOpacity="0.3" />

          {/* Right arm — animated for padel motion */}
          <line x1="142" y1="88" x2="162" y2="140" stroke={getStatus(zones, "Right Elbow").stroke} strokeWidth="1.5" strokeOpacity="0.5">
            <animate attributeName="x2" values="162;158;162" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y2" values="140;135;140" dur="3s" repeatCount="indefinite" />
          </line>
          <line x1="162" y1="140" x2="175" y2="188" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4">
            <animate attributeName="x1" values="162;158;162" dur="3s" repeatCount="indefinite" />
            <animate attributeName="y1" values="140;135;140" dur="3s" repeatCount="indefinite" />
          </line>
          <circle cx="175" cy="188" r="3" fill={defaultColor.fill} fillOpacity="0.3" />

          {/* Hip line */}
          <line x1="74" y1="198" x2="126" y2="198" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4" />

          {/* Left leg */}
          <line x1="74" y1="198" x2="66" y2="288" stroke={getStatus(zones, "Left Knee").stroke} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="66" y1="288" x2="60" y2="378" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="60" cy="378" r="3" fill={defaultColor.fill} fillOpacity="0.3" />

          {/* Right leg */}
          <line x1="126" y1="198" x2="134" y2="288" stroke={getStatus(zones, "Right Knee").stroke} strokeWidth="1.5" strokeOpacity="0.5" />
          <line x1="134" y1="288" x2="140" y2="378" stroke={defaultColor.stroke} strokeWidth="1.5" strokeOpacity="0.4" />
          <circle cx="140" cy="378" r="3" fill={defaultColor.fill} fillOpacity="0.3" />

          {/* Interactive joint dots */}
          <JointDot cx={58} cy={88} zones={zones} area="Left Shoulder" selected={selected} onSelect={setSelected} r={8} />
          <JointDot cx={142} cy={88} zones={zones} area="Right Shoulder" selected={selected} onSelect={setSelected} r={8} />
          <JointDot cx={38} cy={142} zones={zones} area="Left Elbow" selected={selected} onSelect={setSelected} r={6} />
          <JointDot cx={162} cy={140} zones={zones} area="Right Elbow" selected={selected} onSelect={setSelected} r={6} />
          <JointDot cx={100} cy={150} zones={zones} area="Lower Back" selected={selected} onSelect={setSelected} r={8} />
          <JointDot cx={74} cy={198} zones={zones} area="Left Hip" selected={selected} onSelect={setSelected} r={7} />
          <JointDot cx={126} cy={198} zones={zones} area="Right Hip" selected={selected} onSelect={setSelected} r={7} />
          <JointDot cx={66} cy={288} zones={zones} area="Left Knee" selected={selected} onSelect={setSelected} r={7} />
          <JointDot cx={134} cy={288} zones={zones} area="Right Knee" selected={selected} onSelect={setSelected} r={7} />
        </svg>

        <p className={cn("text-xs text-center mt-1", darkMode ? "text-white/25" : "text-gray-400")}>Tap a joint for details</p>
      </div>

      {/* Joint detail panel */}
      <div className="flex-1 w-full">
        {/* Overall Body Health Summary */}
        <div className={cn(
          "rounded-xl border p-4 mb-4",
          darkMode ? "bg-white/5 border-white/10" : "bg-gray-50 border-gray-200"
        )}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={cn("text-sm font-semibold", darkMode ? "text-white/70" : "text-gray-700")}>Overall Body Health</h4>
            <span className={cn("text-2xl font-black tabular-nums", avgHealth >= 85 ? "text-green-400" : avgHealth >= 60 ? "text-amber-400" : "text-red-400")}>
              {avgHealth}
              <span className={cn("text-xs font-medium ml-0.5", darkMode ? "text-white/30" : "text-gray-400")}>/100</span>
            </span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-3">
            <div
              className={cn("h-full rounded-full transition-all duration-1000", avgHealth >= 85 ? "bg-green-400" : avgHealth >= 60 ? "bg-amber-400" : "bg-red-400")}
              style={{ width: `${avgHealth}%` }}
            />
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className={cn("flex items-center gap-1.5", darkMode ? "text-white/50" : "text-gray-500")}>
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {healthyCount} healthy
            </span>
            {watchCount > 0 && (
              <span className={cn("flex items-center gap-1.5", darkMode ? "text-white/50" : "text-gray-500")}>
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                {watchCount} watch
              </span>
            )}
            {injuredCount > 0 && (
              <span className={cn("flex items-center gap-1.5", darkMode ? "text-white/50" : "text-gray-500")}>
                <span className="w-2 h-2 rounded-full bg-red-400" />
                {injuredCount} injured
              </span>
            )}
          </div>
        </div>

        {/* Selected joint detail — rich panel */}
        {selectedZone && selectedColors && (
          <div className={cn(
            "rounded-xl border p-4 mb-4 transition-all duration-300 animate-fade-in",
            darkMode
              ? "bg-white/5 border-white/10"
              : `${selectedColors.bg} border-2 ${selectedColors.border}`
          )}>
            <div className="flex items-center justify-between mb-3">
              <h4 className={cn("text-sm font-bold", darkMode ? "text-white" : selectedColors.text)}>{selectedZone.area}</h4>
              <div className="flex items-center gap-2">
                {selectedZone.healthScore !== undefined && (
                  <span className={cn("text-lg font-black tabular-nums", statusColors[selectedZone.status].darkText)}>
                    {selectedZone.healthScore}
                  </span>
                )}
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                  selectedColors.bg, selectedColors.text
                )}>
                  {statusColors[selectedZone.status].label}
                </span>
              </div>
            </div>

            {/* Health bar */}
            {selectedZone.healthScore !== undefined && (
              <div className="mb-3">
                <HealthBar score={selectedZone.healthScore} status={selectedZone.status} />
              </div>
            )}

            {/* Trend sparkline */}
            {selectedZone.recentScores && selectedZone.recentScores.length > 1 && (
              <div className={cn("flex items-center gap-2 mb-3 px-2 py-1.5 rounded-lg", darkMode ? "bg-white/3" : "bg-white/50")}>
                <span className={cn("text-xs", darkMode ? "text-white/40" : "text-gray-500")}>Last 5 sessions:</span>
                <Sparkline data={selectedZone.recentScores} color={statusColors[selectedZone.status].stroke} />
                {selectedZone.trend && (
                  <span className={cn("text-xs font-medium ml-auto",
                    selectedZone.trend === "improving" ? "text-green-400" :
                    selectedZone.trend === "declining" ? "text-red-400" : "text-white/40"
                  )}>
                    {selectedZone.trend === "improving" ? "\u2191 Improving" : selectedZone.trend === "stable" ? "\u2192 Stable" : "\u2193 Declining"}
                  </span>
                )}
              </div>
            )}

            <p className={cn("text-sm mb-2", darkMode ? "text-white/60" : "text-gray-600")}>{selectedZone.detail}</p>

            {/* Recommendation */}
            {selectedZone.recommendation && (
              <div className={cn("rounded-lg px-3 py-2 mb-2", darkMode ? "bg-brand-500/10 border border-brand-500/20" : "bg-blue-50 border border-blue-200")}>
                <p className={cn("text-xs font-medium", darkMode ? "text-brand-300" : "text-blue-700")}>
                  {"\uD83D\uDCA1"} {selectedZone.recommendation}
                </p>
              </div>
            )}

            {selectedZone.recovery && (
              <div className={cn("rounded-lg px-3 py-2 mb-2", darkMode ? "bg-amber-500/10 border border-amber-500/20" : "bg-amber-50 border border-amber-200")}>
                <p className="text-xs text-amber-400 font-medium">
                  {"\u23F3"} Recovery: {selectedZone.recovery}
                  {selectedZone.estimatedClearance && (
                    <span className="text-amber-300 ml-1">— Est. clearance: {selectedZone.estimatedClearance}</span>
                  )}
                </p>
              </div>
            )}

            <div className="flex items-center gap-4 mt-2">
              {selectedZone.sessions && (
                <p className={cn("text-xs", darkMode ? "text-white/30" : "text-gray-400")}>{selectedZone.sessions} sessions tracked</p>
              )}
            </div>
          </div>
        )}

        {!selectedZone && (
          <div className={cn(
            "rounded-xl border border-dashed p-4 mb-4 text-center",
            darkMode ? "border-white/15" : "border-gray-200"
          )}>
            <p className={cn("text-sm", darkMode ? "text-white/30" : "text-gray-400")}>Select a joint on the body map to see details</p>
          </div>
        )}

        {/* All zones summary — with health bars and trends */}
        <div className="space-y-1.5">
          {zones.map((zone) => {
            const colors = statusColors[zone.status];
            const score = zone.healthScore ?? (zone.status === "healthy" ? 95 : zone.status === "watch" ? 60 : 25);
            return (
              <button
                key={zone.area}
                onClick={() => setSelected(zone.area)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg border transition-all text-left",
                  selected === zone.area
                    ? darkMode
                      ? "bg-white/10 border-white/20"
                      : `${colors.bg} ${colors.border}`
                    : darkMode
                      ? "border-white/5 hover:border-white/15 hover:bg-white/5"
                      : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
                )}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: colors.fill, boxShadow: `0 0 6px ${colors.fill}60` }}
                />
                <span className={cn("text-sm shrink-0 w-28 sm:w-32", darkMode ? "text-white/80" : "text-gray-900")}>{zone.area}</span>

                {/* Mini health bar */}
                <div className="flex-1 hidden sm:block">
                  <div className="h-1 bg-white/8 rounded-full overflow-hidden">
                    <div
                      className={cn("h-full rounded-full transition-all duration-500",
                        zone.status === "healthy" ? "bg-green-400/60" : zone.status === "watch" ? "bg-amber-400/60" : "bg-red-400/60"
                      )}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                </div>

                {/* Trend arrow */}
                {zone.trend && (
                  <span className={cn("text-xs shrink-0",
                    zone.trend === "improving" ? "text-green-400" : zone.trend === "declining" ? "text-red-400" : "text-white/20"
                  )}>
                    {zone.trend === "improving" ? "\u2191" : zone.trend === "stable" ? "\u2192" : "\u2193"}
                  </span>
                )}

                {/* Score */}
                <span className={cn("text-xs font-bold tabular-nums shrink-0 w-6 text-right", colors.darkText)}>
                  {score}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export type PlayReadiness = "play" | "caution" | "rest";

export function getPlayReadiness(zones: BodyZone[]): {
  status: PlayReadiness;
  label: string;
  description: string;
  color: string;
  bgColor: string;
  borderColor: string;
  icon: string;
  score: number;
} {
  const hasInjured = zones.some((z) => z.status === "injured");
  const watchCount = zones.filter((z) => z.status === "watch").length;
  const healthyCount = zones.filter((z) => z.status === "healthy").length;
  const total = zones.length;
  const healthyPct = Math.round((healthyCount / total) * 100);

  if (hasInjured) {
    return {
      status: "rest",
      label: "Rest Recommended",
      description: "Not advised to play. Rest for at least 1 month and consult a specialist before returning to court.",
      color: "text-red-700",
      bgColor: "bg-red-50",
      borderColor: "border-red-300",
      icon: "\uD83D\uDED1",
      score: Math.max(10, healthyPct - 20),
    };
  }

  if (watchCount >= 2) {
    return {
      status: "caution",
      label: "Play With Caution",
      description: "Some areas need attention. Light training only for the next 10 days. Avoid overhead shots and high-impact drills.",
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      icon: "\u26A0\uFE0F",
      score: healthyPct,
    };
  }

  if (watchCount === 1) {
    return {
      status: "caution",
      label: "Almost Ready",
      description: "One area needs monitoring. You can train but avoid stressing the flagged joint. Full clearance expected in a few days.",
      color: "text-amber-700",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-300",
      icon: "\u26A0\uFE0F",
      score: healthyPct,
    };
  }

  return {
    status: "play",
    label: "Ready to Play",
    description: "All joints are healthy. You're cleared for full training including overhead shots, smashes, and competitive play.",
    color: "text-green-700",
    bgColor: "bg-green-50",
    borderColor: "border-green-300",
    icon: "\u2705",
    score: 100,
  };
}
