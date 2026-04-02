import { useState } from "react";
import { cn } from "@/lib/utils";

export interface BodyZone {
  area: string;
  status: "healthy" | "watch" | "injured";
  detail: string;
  recovery?: string;
  sessions?: number;
  trend?: "improving" | "stable" | "declining";
}

interface BodyMapProps {
  zones: BodyZone[];
  className?: string;
  darkMode?: boolean;
}

const statusColors = {
  healthy: { stroke: "#22c55e", fill: "#22c55e", bg: "bg-green-50", text: "text-green-700", border: "border-green-200", label: "Healthy" },
  watch: { stroke: "#f59e0b", fill: "#f59e0b", bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Watch" },
  injured: { stroke: "#ef4444", fill: "#ef4444", bg: "bg-red-50", text: "text-red-700", border: "border-red-200", label: "Injured" },
};

function getZone(zones: BodyZone[], area: string): BodyZone | undefined {
  return zones.find((z) => z.area === area);
}

function getStatus(zones: BodyZone[], area: string) {
  return statusColors[getZone(zones, area)?.status ?? "healthy"];
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
        {/* Selected joint detail */}
        {selectedZone && selectedColors && (
          <div className={cn(
            "rounded-xl border p-4 mb-4 transition-all duration-300 animate-fade-in",
            darkMode
              ? "bg-white/5 border-white/10"
              : `${selectedColors.bg} border-2 ${selectedColors.border}`
          )}>
            <div className="flex items-center justify-between mb-2">
              <h4 className={cn("text-sm font-bold", darkMode ? "text-white" : selectedColors.text)}>{selectedZone.area}</h4>
              <span className={cn(
                "px-2.5 py-0.5 rounded-full text-xs font-semibold",
                selectedColors.bg, selectedColors.text
              )}>
                {statusColors[selectedZone.status].label}
              </span>
            </div>
            <p className={cn("text-sm mb-1", darkMode ? "text-white/60" : "text-gray-600")}>{selectedZone.detail}</p>
            {selectedZone.recovery && (
              <p className="text-xs text-amber-500 font-medium">Recovery: {selectedZone.recovery}</p>
            )}
            {selectedZone.sessions && (
              <p className={cn("text-xs mt-1", darkMode ? "text-white/30" : "text-gray-400")}>{selectedZone.sessions} sessions tracked</p>
            )}
            {selectedZone.trend && (
              <p className={cn("text-xs mt-0.5", darkMode ? "text-white/40" : "text-gray-500")}>
                Trend: {selectedZone.trend === "improving" ? "\u2191 Improving" : selectedZone.trend === "stable" ? "\u2192 Stable" : "\u2193 Declining"}
              </p>
            )}
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

        {/* All zones summary */}
        <div className="space-y-2">
          {zones.map((zone) => (
            <button
              key={zone.area}
              onClick={() => setSelected(zone.area)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2.5 rounded-lg border transition-all text-left",
                selected === zone.area
                  ? darkMode
                    ? "bg-white/10 border-white/20"
                    : `${statusColors[zone.status].bg} ${statusColors[zone.status].border}`
                  : darkMode
                    ? "border-white/5 hover:border-white/15 hover:bg-white/5"
                    : "border-gray-100 hover:border-gray-200 hover:bg-gray-50"
              )}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: statusColors[zone.status].fill, boxShadow: `0 0 6px ${statusColors[zone.status].fill}60` }}
                />
                <span className={cn("text-sm", darkMode ? "text-white/80" : "text-gray-900")}>{zone.area}</span>
              </div>
              <span className={cn(
                "text-xs font-semibold",
                statusColors[zone.status].text
              )}>
                {statusColors[zone.status].label}
              </span>
            </button>
          ))}
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
