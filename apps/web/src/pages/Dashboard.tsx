import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AppShell } from "@/components/layout/AppShell";
import { BodyMap, getPlayReadiness, type BodyZone } from "@/components/health/BodyMap";
import { CoachChat } from "@/components/health/CoachChat";
import { ProgressCard } from "@/components/health/ProgressCard";
import { WarmupCard } from "@/components/health/WarmupCard";
import { formatDate, formatDuration, scoreColor, cn } from "@/lib/utils";
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";

const mockStats = {
  totalSessions: 14,
  safeSessions: 8,
  injuriesPrevented: 9,
  avgScore: 79,
  bestScore: 96,
  streak: 7,
  injuryFreeStreak: 4,
  totalTrainingMinutes: 170,
};

const mockRecent = [
  { id: "1", drillName: "Forehand Volley", date: "2026-03-29", score: 88, duration: 180, safe: true },
  { id: "2", drillName: "Bandeja", date: "2026-03-28", score: 82, duration: 240, safe: true },
  { id: "3", drillName: "Smash", date: "2026-03-27", score: 74, duration: 300, safe: false },
  { id: "4", drillName: "Ready Position", date: "2026-03-26", score: 93, duration: 120, safe: true },
  { id: "5", drillName: "Vibora", date: "2026-03-25", score: 71, duration: 260, safe: false },
  { id: "6", drillName: "Backhand Volley", date: "2026-03-24", score: 85, duration: 200, safe: true },
];

const mockProgress = [
  { date: "Mar 15", score: 52, injuryRisk: 45 },
  { date: "Mar 16", score: 55, injuryRisk: 42 },
  { date: "Mar 17", score: 58, injuryRisk: 38 },
  { date: "Mar 18", score: 61, injuryRisk: 35 },
  { date: "Mar 19", score: 59, injuryRisk: 40 },
  { date: "Mar 20", score: 65, injuryRisk: 30 },
  { date: "Mar 21", score: 68, injuryRisk: 28 },
  { date: "Mar 22", score: 72, injuryRisk: 22 },
  { date: "Mar 23", score: 74, injuryRisk: 25 },
  { date: "Mar 24", score: 78, injuryRisk: 18 },
  { date: "Mar 25", score: 76, injuryRisk: 32 },
  { date: "Mar 26", score: 82, injuryRisk: 15 },
  { date: "Mar 27", score: 79, injuryRisk: 20 },
  { date: "Mar 28", score: 85, injuryRisk: 12 },
  { date: "Mar 29", score: 88, injuryRisk: 8 },
];

const bodyZones: BodyZone[] = [
  { area: "Right Shoulder", status: "healthy", detail: "No impingement detected in last 12 sessions. External rotation stays within 45-90\u00b0 safe zone consistently.", sessions: 12, trend: "improving", healthScore: 96, recentScores: [82, 88, 91, 94, 96], recommendation: "Keep up your rotator cuff warm-ups — they're clearly working." },
  { area: "Left Shoulder", status: "healthy", detail: "Safe range maintained across all drills. Internal rotation improved since week 1.", sessions: 10, trend: "stable", healthScore: 92, recentScores: [90, 88, 92, 91, 92], recommendation: "Maintain current form. Consider adding light resistance band work." },
  { area: "Right Elbow", status: "healthy", detail: "No hyperextension in last 8 sessions. Wrist pronation within safe limits during volleys.", sessions: 8, trend: "improving", healthScore: 95, recentScores: [78, 82, 88, 92, 95], recommendation: "Great progress! Elbow strain risk dropped 62\u219295 in 14 days." },
  { area: "Left Elbow", status: "healthy", detail: "Within safe flexion range. Mild excessive flexion detected once in session #12 but not repeated.", sessions: 6, trend: "stable", healthScore: 88, recentScores: [85, 82, 88, 86, 88], recommendation: "Monitor backhand technique — keep elbow slightly bent at contact." },
  { area: "Right Knee", status: "healthy", detail: "Good bend on landings — shock absorption improving. Valgus stress minimal.", sessions: 14, trend: "improving", healthScore: 92, recentScores: [58, 72, 80, 88, 92], recommendation: "Your landing technique is much safer now. Keep practicing soft landings." },
  { area: "Left Knee", status: "healthy", detail: "No strain detected in recent sessions. Consistent knee bend across all stances.", sessions: 14, trend: "stable", healthScore: 90, recentScores: [86, 88, 89, 90, 90], recommendation: "Stable and healthy. Continue quad strengthening exercises." },
  { area: "Lower Back", status: "watch", detail: "Slight backward lean detected on overhead shots (bandeja & smash). Lumbar compression stress at 42\u00b0 — safe threshold is 35\u00b0.", recovery: "Light training for 10 days", sessions: 6, trend: "improving", healthScore: 64, recentScores: [45, 48, 55, 58, 64], estimatedClearance: "Apr 12", recommendation: "Focus on core stability: planks and dead bugs 3x/week. Avoid aggressive smashes." },
  { area: "Right Hip", status: "healthy", detail: "Good hip mobility and rotation. Flexion angles safe during ready position and lunges.", sessions: 8, trend: "stable", healthScore: 91, recentScores: [88, 90, 89, 91, 91], recommendation: "Hip mobility is solid. Add hip circles to your warm-up routine." },
  { area: "Left Hip", status: "healthy", detail: "Normal flexion angles across all stances. No impingement risk detected.", sessions: 8, trend: "stable", healthScore: 89, recentScores: [86, 87, 88, 89, 89], recommendation: "Healthy range of motion. Clamshell exercises will keep glutes activated." },
];

const playReadiness = getPlayReadiness(bodyZones);

const statCards = [
  { label: "Safe Sessions", value: `${mockStats.safeSessions}/${mockStats.totalSessions}`, icon: "\u2764\uFE0F", sub: `${Math.round((mockStats.safeSessions / mockStats.totalSessions) * 100)}% safe rate` },
  { label: "Injuries Prevented", value: mockStats.injuriesPrevented, icon: "\uD83D\uDEE1\uFE0F", sub: "dangerous form alerts" },
  { label: "Injury-Free Streak", value: `${mockStats.injuryFreeStreak} days`, icon: "\uD83D\uDD25", sub: "keep it going!" },
  { label: "Training Time", value: `${Math.round(mockStats.totalTrainingMinutes / 60)}h ${mockStats.totalTrainingMinutes % 60}m`, icon: "\u23F1\uFE0F", sub: `${mockStats.totalSessions} sessions` },
];

// Readiness ring color
const ringColor = playReadiness.status === "play" ? "#22c55e" : playReadiness.status === "caution" ? "#f59e0b" : "#ef4444";
const ringGlow = playReadiness.status === "play" ? "rgba(34,197,94,0.4)" : playReadiness.status === "caution" ? "rgba(245,158,11,0.4)" : "rgba(239,68,68,0.4)";

export function Dashboard() {
  const user = useAuthStore((s) => s.user);

  // SVG ring calculations
  const ringRadius = 58;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (playReadiness.score / 100) * ringCircumference;

  return (
    <AppShell>
      {/* Dark Hero Section */}
      <div className="relative bg-gradient-to-br from-brand-950 via-gray-900 to-brand-950 overflow-hidden">
        {/* Ambient gradient orbs */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full opacity-20" style={{ background: `radial-gradient(circle, ${ringGlow}, transparent 70%)` }} />
          <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.3), transparent 70%)" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 60%)" }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10">
          {/* Welcome bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-white">
                Welcome back, {user?.name ?? "Pedro"}
              </h1>
              <p className="text-white/50 mt-1">Your body is in good shape. {mockStats.injuryFreeStreak} days injury-free.</p>
            </div>
            <Link to="/drills">
              <Button size="lg" className="shadow-xl shadow-brand-500/30">Start Safe Training</Button>
            </Link>
          </div>

          {/* Hero: Readiness Score + Body Map */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Readiness Ring */}
            <div className="flex flex-col items-center justify-center py-8">
              <div className="relative">
                {/* Glow behind ring */}
                <div className="absolute inset-0 rounded-full blur-2xl opacity-30" style={{ background: ringGlow }} />

                <svg width="160" height="160" viewBox="0 0 160 160" className="relative">
                  {/* Background ring */}
                  <circle cx="80" cy="80" r={ringRadius} stroke="rgba(255,255,255,0.08)" strokeWidth="8" fill="none" />
                  {/* Progress ring */}
                  <circle
                    cx="80" cy="80" r={ringRadius}
                    stroke={ringColor}
                    strokeWidth="8"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={ringCircumference}
                    strokeDashoffset={ringOffset}
                    transform="rotate(-90 80 80)"
                    style={{ filter: `drop-shadow(0 0 8px ${ringGlow})`, transition: "stroke-dashoffset 1s ease-out" }}
                  />
                  {/* Score text */}
                  <text x="80" y="72" textAnchor="middle" className="text-4xl font-black" fill="white" fontSize="42" fontWeight="900">
                    {playReadiness.score}
                  </text>
                  <text x="80" y="96" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="11" fontWeight="600" letterSpacing="2">
                    READINESS
                  </text>
                </svg>
              </div>

              <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm" style={{ background: `${ringGlow}`, border: `1px solid ${ringColor}40` }}>
                  <span className="text-lg">{playReadiness.icon}</span>
                  <span className="text-sm font-bold" style={{ color: ringColor }}>
                    {playReadiness.label}
                  </span>
                </div>
                <p className="text-xs text-white/40 mt-3 max-w-[220px] leading-relaxed">
                  {playReadiness.description}
                </p>
              </div>
            </div>

            {/* Body Map — dark glassmorphism card */}
            <div className="lg:col-span-2 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
              <h2 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Your Body Status</h2>
              <BodyMap zones={bodyZones} darkMode />
            </div>
          </div>

          {/* Stats row — glass cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mt-8">
            {statCards.map((stat, i) => (
              <div key={stat.label} className={`rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-4 animate-slide-up stagger-${i + 1}`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{stat.icon}</span>
                  <div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-white/50">{stat.label}</p>
                    <p className="text-xs text-white/30">{stat.sub}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Weekly Training Goal */}
          <div className="mt-8 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 animate-slide-up stagger-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Weekly Goal</h3>
                <p className="text-xs text-white/30 mt-0.5">5 sessions this week — keep it up!</p>
              </div>
              <span className="text-sm font-bold text-brand-400">5 / 7 sessions</span>
            </div>
            <div className="relative h-3 bg-white/5 rounded-full overflow-hidden mb-3">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 transition-all duration-1000"
                style={{ width: "71%" }}
              />
            </div>
            <div className="flex items-center gap-1">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => {
                const completed = i < 5;
                const isToday = i === 4;
                return (
                  <div key={day} className="flex-1 text-center">
                    <div className={cn(
                      "w-8 h-8 mx-auto rounded-full flex items-center justify-center text-xs font-medium border transition-all",
                      completed
                        ? "bg-brand-500/20 border-brand-500/30 text-brand-400"
                        : isToday
                          ? "bg-white/10 border-white/20 text-white/60 ring-2 ring-brand-500/30"
                          : "bg-white/3 border-white/5 text-white/20"
                    )}>
                      {completed ? "\u2713" : day.charAt(0)}
                    </div>
                    <p className={cn("text-xs mt-1", isToday ? "text-white/60 font-medium" : "text-white/20")}>{day}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Chart + Sessions — still dark */}
      <div className="bg-gradient-to-b from-brand-950 to-gray-900 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Score + Injury Risk Chart */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-8">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Form Score vs Injury Risk (last 15 days)</h3>
            <div className="h-48 sm:h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockProgress}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} stroke="rgba(255,255,255,0.1)" />
                  <YAxis domain={[0, 100]} tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} stroke="rgba(255,255,255,0.1)" />
                  <Tooltip
                    contentStyle={{
                      borderRadius: "12px",
                      background: "rgba(0,0,0,0.8)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      color: "white",
                      backdropFilter: "blur(12px)",
                    }}
                    labelStyle={{ color: "rgba(255,255,255,0.6)" }}
                  />
                  <ReferenceLine y={40} stroke="#f59e0b" strokeDasharray="4 4" label={{ value: "Risk", position: "right", fontSize: 10, fill: "#f59e0b" }} />
                  <Area
                    type="monotone"
                    dataKey="injuryRisk"
                    name="Injury Risk"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.15}
                    strokeWidth={2}
                    strokeDasharray="5 5"
                  />
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Form Score"
                    stroke="#07c3a6"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#07c3a6", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#07c3a6" }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-3 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#07c3a6] rounded" />
                Form Score (improving)
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 border-t-2 border-dashed border-red-400" />
                Injury Risk (decreasing)
              </div>
            </div>
          </div>

          {/* Recent Sessions */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Recent Sessions</h3>
            </div>
            <div className="divide-y divide-white/5">
              {mockRecent.map((session) => (
                <Link
                  key={session.id}
                  to={`/history/${session.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{session.safe ? "\u2764\uFE0F" : "\u26A0\uFE0F"}</span>
                    <div>
                      <p className="text-sm font-medium text-white">
                        {session.drillName}
                      </p>
                      <p className="text-xs text-white/40">
                        {formatDate(session.date)} &middot;{" "}
                        {formatDuration(session.duration)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={cn(
                      "text-xs font-semibold px-2.5 py-1 rounded-full",
                      session.safe ? "bg-green-500/15 text-green-400 border border-green-500/20" : "bg-red-500/15 text-red-400 border border-red-500/20"
                    )}>
                      {session.safe ? "Safe" : "Risk"}
                    </span>
                    <span className="text-sm font-bold text-white">
                      {session.score}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="px-6 py-3 border-t border-white/10">
              <Link
                to="/history"
                className="text-sm text-brand-400 font-medium hover:text-brand-300"
              >
                View all {mockStats.totalSessions} sessions &rarr;
              </Link>
            </div>
          </div>

          {/* Warm-up + Progress */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            <WarmupCard zones={bodyZones} />
            <ProgressCard />
          </div>

          {/* AI Coach */}
          <div className="mt-8">
            <CoachChat />
          </div>
        </div>
      </div>
    </AppShell>
  );
}
