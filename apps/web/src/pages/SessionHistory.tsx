import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { formatDate, formatTime, formatDuration, scoreColor } from "@/lib/utils";

const mockSessions = [
  { id: "1", drillSlug: "forehand-volley", drillName: "Forehand Volley", startedAt: "2026-03-27T10:30:00Z", duration: 180, averageScore: 82, totalReps: 12 },
  { id: "2", drillSlug: "bandeja", drillName: "Bandeja", startedAt: "2026-03-26T16:15:00Z", duration: 240, averageScore: 71, totalReps: 8 },
  { id: "3", drillSlug: "ready-position", drillName: "Ready Position", startedAt: "2026-03-25T09:00:00Z", duration: 120, averageScore: 91, totalReps: 15 },
  { id: "4", drillSlug: "smash", drillName: "Smash", startedAt: "2026-03-24T14:45:00Z", duration: 300, averageScore: 68, totalReps: 10 },
  { id: "5", drillSlug: "backhand-volley", drillName: "Backhand Volley", startedAt: "2026-03-23T11:20:00Z", duration: 200, averageScore: 77, totalReps: 11 },
  { id: "6", drillSlug: "vibora", drillName: "Vibora", startedAt: "2026-03-22T17:00:00Z", duration: 260, averageScore: 63, totalReps: 7 },
  { id: "7", drillSlug: "forehand-volley", drillName: "Forehand Volley", startedAt: "2026-03-21T08:30:00Z", duration: 150, averageScore: 75, totalReps: 9 },
  { id: "8", drillSlug: "ready-position", drillName: "Ready Position", startedAt: "2026-03-20T15:10:00Z", duration: 100, averageScore: 88, totalReps: 14 },
];

export function SessionHistory() {
  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Session History</h1>
          <p className="text-gray-600 mt-1">Review your past training sessions and track your progress.</p>
        </div>

        <Card noPadding>
          <div className="divide-y divide-gray-100">
            {mockSessions.map((session) => (
              <Link
                key={session.id}
                to={`/history/${session.id}`}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600 shrink-0">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 group-hover:text-brand-700 transition-colors">
                      {session.drillName}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatDate(session.startedAt)} at {formatTime(session.startedAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-xs text-gray-500">{formatDuration(session.duration)}</p>
                    <p className="text-xs text-gray-400">{session.totalReps} reps</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${scoreColor(session.averageScore)}`}>
                      {session.averageScore}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase">score</p>
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-gray-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </Card>

        {mockSessions.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-500 mb-4">No sessions yet. Start your first training!</p>
            <Link to="/drills">
              <button className="text-brand-600 font-medium hover:text-brand-700">
                Browse Drills
              </button>
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
