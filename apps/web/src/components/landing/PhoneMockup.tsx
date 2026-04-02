import { useEffect, useState } from "react";

const coachingCues = [
  { text: "Keep your elbow higher on the bandeja!", type: "correction" as const },
  { text: "Great shoulder rotation!", type: "encouragement" as const },
  { text: "Shoulder safe — no impingement risk", type: "safe" as const },
  { text: "Bend your knees more for stability", type: "correction" as const },
  { text: "Fatigue detected — take a break", type: "warning" as const },
];

/**
 * Animated phone mockup showing CourtCare in action:
 * - Phone frame with skeleton overlay
 * - Floating coaching cue bubbles
 * - Health status indicator
 * - Drill reference card
 */
export function PhoneMockup() {
  const [cueIndex, setCueIndex] = useState(0);
  const [score, setScore] = useState(78);

  useEffect(() => {
    const interval = setInterval(() => {
      setCueIndex((prev) => (prev + 1) % coachingCues.length);
      setScore((prev) => {
        const delta = Math.floor(Math.random() * 10) - 4;
        return Math.max(60, Math.min(98, prev + delta));
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const cue = coachingCues[cueIndex];

  return (
    <div className="relative w-full max-w-[700px] mx-auto mt-12">
      {/* Drill reference card - left side */}
      <div className="absolute -left-2 sm:left-4 top-12 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 w-32 sm:w-36 shadow-xl z-10 animate-float-slow hidden sm:block">
        <div className="text-3xl mb-2 text-center">🥎</div>
        <p className="text-xs font-semibold text-white text-center">Bandeja</p>
        <p className="text-xs text-white/50 text-center mt-0.5">Overhead Slice</p>
        <div className="mt-2 flex items-center justify-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <span className="text-xs text-yellow-300">Intermediate</span>
        </div>
      </div>

      {/* Phone frame */}
      <div className="relative mx-auto w-[260px] sm:w-[280px]">
        {/* Phone outer shell */}
        <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl shadow-black/40 border border-gray-700/50">
          {/* Notch */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl z-20" />
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-gray-800 border border-gray-700 z-30" />

          {/* Screen */}
          <div className="relative bg-gradient-to-b from-brand-900 to-brand-950 rounded-[2.25rem] overflow-hidden aspect-[9/19]">
            {/* Court background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-teal-800/30 via-brand-900/50 to-brand-950" />

            {/* Skeleton figure */}
            <svg
              viewBox="0 0 200 380"
              className="absolute inset-0 w-full h-full"
              fill="none"
            >
              {/* Head */}
              <circle cx="100" cy="60" r="18" stroke="#07c3a6" strokeWidth="2" fill="#07c3a6" fillOpacity="0.15" />
              <circle cx="100" cy="60" r="4" fill="#07c3a6" />

              {/* Neck */}
              <line x1="100" y1="78" x2="100" y2="95" stroke="#07c3a6" strokeWidth="2" />

              {/* Shoulders */}
              <line x1="65" y1="95" x2="135" y2="95" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="65" cy="95" r="5" fill="#07c3a6" />
              <circle cx="135" cy="95" r="5" fill="#07c3a6" />

              {/* Torso */}
              <line x1="100" y1="95" x2="100" y2="180" stroke="#07c3a6" strokeWidth="2" />

              {/* Left arm - raised for bandeja */}
              <line x1="65" y1="95" x2="50" y2="135" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="50" cy="135" r="4" fill="#07c3a6" />
              <line x1="50" y1="135" x2="45" y2="170" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="45" cy="170" r="3" fill="#07c3a6" />

              {/* Right arm - racket arm up */}
              <line x1="135" y1="95" x2="155" y2="70" stroke="#07c3a6" strokeWidth="2.5">
                <animate attributeName="x2" values="155;150;155" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y2" values="70;65;70" dur="2s" repeatCount="indefinite" />
              </line>
              <circle cx="155" cy="70" r="4" fill="#07c3a6">
                <animate attributeName="cx" values="155;150;155" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="70;65;70" dur="2s" repeatCount="indefinite" />
              </circle>
              <line x1="155" y1="70" x2="170" y2="45" stroke="#07c3a6" strokeWidth="2.5">
                <animate attributeName="x1" values="155;150;155" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y1" values="70;65;70" dur="2s" repeatCount="indefinite" />
                <animate attributeName="x2" values="170;165;170" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y2" values="45;40;45" dur="2s" repeatCount="indefinite" />
              </line>
              <circle cx="170" cy="45" r="3" fill="#07c3a6">
                <animate attributeName="cx" values="170;165;170" dur="2s" repeatCount="indefinite" />
                <animate attributeName="cy" values="45;40;45" dur="2s" repeatCount="indefinite" />
              </circle>

              {/* Hips */}
              <line x1="80" y1="180" x2="120" y2="180" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="80" cy="180" r="5" fill="#07c3a6" />
              <circle cx="120" cy="180" r="5" fill="#07c3a6" />

              {/* Left leg */}
              <line x1="80" y1="180" x2="70" y2="260" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="70" cy="260" r="4" fill="#07c3a6" />
              <line x1="70" y1="260" x2="65" y2="340" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="65" cy="340" r="3" fill="#07c3a6" />

              {/* Right leg */}
              <line x1="120" y1="180" x2="130" y2="255" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="130" cy="255" r="4" fill="#07c3a6" />
              <line x1="130" y1="255" x2="140" y2="335" stroke="#07c3a6" strokeWidth="2" />
              <circle cx="140" cy="335" r="3" fill="#07c3a6" />

              {/* Angle arc on right shoulder */}
              <path
                d="M 150 80 A 20 20 0 0 1 140 100"
                stroke="#f59e0b"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                fill="none"
              />
              <text x="152" y="92" fill="#f59e0b" fontSize="8" fontWeight="bold">
                142°
              </text>

              {/* Angle arc on right knee */}
              <path
                d="M 140 245 A 15 15 0 0 0 125 260"
                stroke="#22c55e"
                strokeWidth="1.5"
                strokeDasharray="3 2"
                fill="none"
              />
              <text x="140" y="258" fill="#22c55e" fontSize="8" fontWeight="bold">
                155°
              </text>
            </svg>

            {/* Score display - top left */}
            <div className="absolute top-5 left-4 z-10">
              <div className="bg-black/40 backdrop-blur-sm rounded-xl px-3 py-2 border border-white/10">
                <p className="text-2xl font-bold text-white font-mono transition-all duration-500">
                  {score}
                </p>
                <p className="text-[8px] text-white/50 uppercase tracking-wider">Score</p>
              </div>
            </div>

            {/* Health status - top right */}
            <div className="absolute top-5 right-4 z-10">
              <div className={`rounded-lg px-2.5 py-1.5 border backdrop-blur-sm transition-all duration-500 ${
                cueIndex === 4
                  ? "bg-amber-500/20 border-amber-400/40"
                  : "bg-green-500/20 border-green-400/40"
              }`}>
                <p className={`text-[9px] font-bold uppercase tracking-wider ${
                  cueIndex === 4 ? "text-amber-300" : "text-green-300"
                }`}>
                  {cueIndex === 4 ? "CAUTION" : "SAFE"}
                </p>
                <p className="text-[7px] text-white/40">Injury Risk</p>
              </div>
            </div>

            {/* Rep counter - bottom */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-black/50 backdrop-blur-sm rounded-full px-5 py-2 border border-white/10">
                <span className="text-xl font-bold text-white">3</span>
                <span className="text-sm text-white/40">/10</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Coaching cue bubble - right side */}
      <div className="absolute -right-2 sm:right-4 top-1/3 z-10 w-44 sm:w-52">
        <div
          key={cueIndex}
          className={`rounded-2xl px-4 py-3 shadow-xl border backdrop-blur-md transition-all duration-500 animate-fade-in ${
            cue.type === "correction"
              ? "bg-red-500/20 border-red-400/30"
              : cue.type === "encouragement"
                ? "bg-green-500/20 border-green-400/30"
                : cue.type === "warning"
                  ? "bg-amber-500/20 border-amber-400/30"
                  : "bg-green-500/15 border-green-400/20"
          }`}
        >
          <div className="flex items-start gap-2">
            <span className="text-sm mt-0.5">
              {cue.type === "correction" ? "!" : cue.type === "encouragement" ? "\u2713" : cue.type === "warning" ? "\u26A0\uFE0F" : "\u2764\uFE0F"}
            </span>
            <p className="text-xs text-white/90 leading-snug">{cue.text}</p>
          </div>
        </div>
      </div>

      {/* Health monitoring card - bottom left */}
      <div className="absolute -left-2 sm:left-8 bottom-16 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-3 w-36 sm:w-40 shadow-xl z-10 hidden sm:block">
        <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-2">Monitoring</p>
        <div className="space-y-1.5">
          {[
            { joint: "Shoulder", status: "safe" },
            { joint: "Elbow", status: "safe" },
            { joint: "Knee", status: "safe" },
            { joint: "Spine", status: cueIndex === 4 ? "caution" : "safe" },
          ].map((item) => (
            <div key={item.joint} className="flex items-center justify-between">
              <span className="text-xs text-white/60">{item.joint}</span>
              <span className={`text-xs font-semibold ${
                item.status === "safe" ? "text-green-400" : "text-amber-400"
              }`}>
                {item.status === "safe" ? "\u2713 Safe" : "\u26A0 Caution"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
