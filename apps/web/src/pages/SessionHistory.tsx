import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { formatDate, formatTime, formatDuration, scoreColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

const mockSessions = [
  { id: "1", drillSlug: "forehand-volley", drillName: "Forehand Volley", startedAt: "2026-03-29T09:15:00Z", duration: 180, averageScore: 88, totalReps: 14, sessionSafe: true, maxInjuryRisk: 8, alerts: [] },
  { id: "2", drillSlug: "bandeja", drillName: "Bandeja", startedAt: "2026-03-28T17:30:00Z", duration: 240, averageScore: 82, totalReps: 10, sessionSafe: true, maxInjuryRisk: 15, alerts: [] },
  { id: "3", drillSlug: "smash", drillName: "Smash", startedAt: "2026-03-27T10:00:00Z", duration: 300, averageScore: 74, totalReps: 8, sessionSafe: false, maxInjuryRisk: 62, alerts: ["Shoulder impingement risk on overhead extension"] },
  { id: "4", drillSlug: "ready-position", drillName: "Ready Position", startedAt: "2026-03-26T08:45:00Z", duration: 120, averageScore: 93, totalReps: 18, sessionSafe: true, maxInjuryRisk: 5, alerts: [] },
  { id: "5", drillSlug: "vibora", drillName: "Vibora", startedAt: "2026-03-25T16:00:00Z", duration: 260, averageScore: 71, totalReps: 7, sessionSafe: false, maxInjuryRisk: 48, alerts: ["Elbow hyperextension detected", "Fatigue — form dropped 18%"] },
  { id: "6", drillSlug: "backhand-volley", drillName: "Backhand Volley", startedAt: "2026-03-24T11:20:00Z", duration: 200, averageScore: 85, totalReps: 12, sessionSafe: true, maxInjuryRisk: 12, alerts: [] },
  { id: "7", drillSlug: "forehand-volley", drillName: "Forehand Volley", startedAt: "2026-03-23T09:00:00Z", duration: 190, averageScore: 79, totalReps: 11, sessionSafe: true, maxInjuryRisk: 18, alerts: [] },
  { id: "8", drillSlug: "bandeja", drillName: "Bandeja", startedAt: "2026-03-22T18:15:00Z", duration: 220, averageScore: 75, totalReps: 9, sessionSafe: false, maxInjuryRisk: 55, alerts: ["Shoulder impingement risk — arm too far back"] },
  { id: "9", drillSlug: "ready-position", drillName: "Ready Position", startedAt: "2026-03-21T08:30:00Z", duration: 100, averageScore: 90, totalReps: 16, sessionSafe: true, maxInjuryRisk: 3, alerts: [] },
  { id: "10", drillSlug: "smash", drillName: "Smash", startedAt: "2026-03-20T15:00:00Z", duration: 280, averageScore: 67, totalReps: 6, sessionSafe: false, maxInjuryRisk: 72, alerts: ["Knee hyperextension on landing", "Excessive back lean on wind-up"] },
  { id: "11", drillSlug: "forehand-volley", drillName: "Forehand Volley", startedAt: "2026-03-19T10:30:00Z", duration: 160, averageScore: 72, totalReps: 10, sessionSafe: true, maxInjuryRisk: 20, alerts: [] },
  { id: "12", drillSlug: "backhand-volley", drillName: "Backhand Volley", startedAt: "2026-03-18T17:00:00Z", duration: 180, averageScore: 68, totalReps: 9, sessionSafe: false, maxInjuryRisk: 45, alerts: ["Left elbow excessive flexion"] },
  { id: "13", drillSlug: "ready-position", drillName: "Ready Position", startedAt: "2026-03-17T09:00:00Z", duration: 90, averageScore: 81, totalReps: 14, sessionSafe: true, maxInjuryRisk: 8, alerts: [] },
  { id: "14", drillSlug: "bandeja", drillName: "Bandeja", startedAt: "2026-03-16T16:30:00Z", duration: 200, averageScore: 62, totalReps: 6, sessionSafe: false, maxInjuryRisk: 58, alerts: ["Shoulder impingement risk", "Deep knee bend on preparation"] },
];

const safeCount = mockSessions.filter((s) => s.sessionSafe).length;
const riskCount = mockSessions.filter((s) => !s.sessionSafe).length;

export function SessionHistory() {
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        {/* Ambient orbs */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.3), transparent 70%)" }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Session History</h1>
            <p className="text-white/50 mt-1">
              {mockSessions.length} sessions over 14 days &middot;{" "}
              <span className="text-green-400 font-medium">{safeCount} safe</span> &middot;{" "}
              <span className="text-red-400 font-medium">{riskCount} with risks detected</span>
            </p>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
            <div className="divide-y divide-white/5">
              {mockSessions.map((session) => (
                <Link
                  key={session.id}
                  to={`/history/${session.id}`}
                  className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg border",
                      session.sessionSafe ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                    )}>
                      {session.sessionSafe ? "\u2764\uFE0F" : "\u26A0\uFE0F"}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white group-hover:text-brand-300 transition-colors">
                        {session.drillName}
                      </p>
                      <p className="text-xs text-white/40">
                        {formatDate(session.startedAt)} at {formatTime(session.startedAt)} &middot; {formatDuration(session.duration)}
                      </p>
                      {session.alerts.length > 0 && (
                        <p className="text-xs text-red-400/70 mt-0.5">
                          {session.alerts[0]}{session.alerts.length > 1 ? ` (+${session.alerts.length - 1} more)` : ""}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-white/40">{session.totalReps} reps</p>
                    </div>
                    <div className="text-center">
                      <span className={cn(
                        "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold border",
                        session.sessionSafe
                          ? "bg-green-500/10 text-green-400 border-green-500/20"
                          : "bg-red-500/10 text-red-400 border-red-500/20"
                      )}>
                        {session.sessionSafe ? "Safe" : `Risk ${session.maxInjuryRisk}%`}
                      </span>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-white">
                        {session.averageScore}
                      </p>
                      <p className="text-xs text-white/30 uppercase">score</p>
                    </div>
                    <svg className="w-4 h-4 text-white/20 group-hover:text-white/50 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
