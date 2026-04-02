import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { formatDate, formatTime, formatDuration } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { getSessionHistory } from "@/stores/sessionStore";

export function SessionHistory() {
  const realHistory = getSessionHistory();
  const sessions = realHistory.length > 0
    ? realHistory.map((s) => ({
        id: s.id,
        drillName: s.drillName,
        startedAt: s.startedAt,
        duration: s.durationSeconds,
        averageScore: s.averageScore,
        totalReps: s.totalReps,
        sessionSafe: s.safe,
      }))
    : [];

  const safeCount = sessions.filter((s) => s.sessionSafe).length;
  const riskCount = sessions.filter((s) => !s.sessionSafe).length;
  const avgScore = sessions.length > 0 ? Math.round(sessions.reduce((sum, s) => sum + s.averageScore, 0) / sessions.length) : 0;
  const totalTrainingMins = Math.round(sessions.reduce((sum, s) => sum + s.duration, 0) / 60);
  const totalReps = sessions.reduce((sum, s) => sum + s.totalReps, 0);

  const summaryCards = [
    { label: "Total Sessions", value: sessions.length, icon: "\uD83C\uDFAF", color: "text-brand-400" },
    { label: "Safe Rate", value: sessions.length > 0 ? `${Math.round((safeCount / sessions.length) * 100)}%` : "\u2014", icon: "\u2764\uFE0F", color: "text-green-400" },
    { label: "Avg Score", value: avgScore || "\u2014", icon: "\uD83D\uDCC8", color: "text-amber-400" },
    { label: "Training Time", value: `${totalTrainingMins}m`, icon: "\u23F1\uFE0F", color: "text-purple-400" },
    { label: "Total Reps", value: totalReps, icon: "\uD83D\uDD01", color: "text-blue-400" },
  ];
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Session History</h1>
            <p className="text-white/50 mt-1">
              {sessions.length} sessions &middot;{" "}
              <span className="text-green-400 font-medium">{safeCount} safe</span> &middot;{" "}
              <span className="text-red-400 font-medium">{riskCount} with risks</span>
            </p>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-6">
            {summaryCards.map((card, i) => (
              <div key={card.label} className={`rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-3 text-center animate-scale-in stagger-${i + 1}`}>
                <span className="text-lg block">{card.icon}</span>
                <p className={cn("text-lg font-bold", card.color)}>{card.value}</p>
                <p className="text-xs text-white/30">{card.label}</p>
              </div>
            ))}
          </div>

          {sessions.length === 0 ? (
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-12 text-center">
              <p className="text-white/50 mb-4">No sessions yet. Start training to see your history.</p>
              <Link to="/drills">
                <button className="px-6 py-2 rounded-xl bg-brand-500 text-white font-semibold hover:bg-brand-600 transition-colors">
                  Start Training
                </button>
              </Link>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 overflow-hidden">
              <div className="divide-y divide-white/5">
                {sessions.map((session) => (
                  <div
                    key={session.id}
                    className="flex items-center justify-between px-6 py-4 hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-lg border",
                        session.sessionSafe ? "bg-green-500/10 border-green-500/20" : "bg-red-500/10 border-red-500/20"
                      )}>
                        {session.sessionSafe ? "\u2764\uFE0F" : "\u26A0\uFE0F"}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {session.drillName}
                        </p>
                        <p className="text-xs text-white/40">
                          {formatDate(session.startedAt)} &middot; {formatDuration(session.duration)}
                        </p>
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
                          {session.sessionSafe ? "Safe" : "Risk"}
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">
                          {session.averageScore}
                        </p>
                        <p className="text-xs text-white/30 uppercase">score</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
