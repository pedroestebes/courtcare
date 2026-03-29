import { Link } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { AppShell } from "@/components/layout/AppShell";
import { formatDate, formatDuration, scoreColor } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockStats = {
  totalSessions: 24,
  avgScore: 76,
  bestScore: 94,
  streak: 5,
};

const mockRecent = [
  { id: "1", drillName: "Forehand Volley", date: "2026-03-27", score: 82, duration: 180 },
  { id: "2", drillName: "Bandeja", date: "2026-03-26", score: 71, duration: 240 },
  { id: "3", drillName: "Ready Position", date: "2026-03-25", score: 91, duration: 120 },
  { id: "4", drillName: "Smash", date: "2026-03-24", score: 68, duration: 300 },
  { id: "5", drillName: "Backhand Volley", date: "2026-03-23", score: 77, duration: 200 },
];

const mockProgress = [
  { date: "Mar 18", score: 58 },
  { date: "Mar 19", score: 62 },
  { date: "Mar 20", score: 65 },
  { date: "Mar 21", score: 61 },
  { date: "Mar 22", score: 70 },
  { date: "Mar 23", score: 74 },
  { date: "Mar 24", score: 68 },
  { date: "Mar 25", score: 78 },
  { date: "Mar 26", score: 76 },
  { date: "Mar 27", score: 82 },
];

const statCards = [
  { label: "Total Sessions", value: mockStats.totalSessions, icon: "\uD83C\uDFBE" },
  { label: "Avg Score", value: mockStats.avgScore, icon: "\uD83C\uDFAF" },
  { label: "Best Score", value: mockStats.bestScore, icon: "\uD83C\uDFC6" },
  { label: "Day Streak", value: mockStats.streak, icon: "\uD83D\uDD25" },
];

export function Dashboard() {
  const user = useAuthStore((s) => s.user);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.name ?? "Player"}
            </h1>
            <p className="text-gray-600 mt-1">Here is your training overview.</p>
          </div>
          <Link to="/drills">
            <Button size="lg">Start Training</Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((stat) => (
            <Card key={stat.label}>
              <div className="flex items-center gap-3">
                <span className="text-2xl">{stat.icon}</span>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Chart */}
          <div className="lg:col-span-2">
            <Card header="Score Trend">
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockProgress}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="score"
                      stroke="#07c3a6"
                      strokeWidth={2.5}
                      dot={{ r: 4, fill: "#07c3a6", strokeWidth: 0 }}
                      activeDot={{ r: 6, fill: "#07c3a6" }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recent Sessions */}
          <div>
            <Card header="Recent Sessions" noPadding>
              <div className="divide-y divide-gray-50">
                {mockRecent.map((session) => (
                  <Link
                    key={session.id}
                    to={`/history/${session.id}`}
                    className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50 transition-colors"
                  >
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {session.drillName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatDate(session.date)} &middot;{" "}
                        {formatDuration(session.duration)}
                      </p>
                    </div>
                    <span className={`text-sm font-bold ${scoreColor(session.score)}`}>
                      {session.score}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="px-6 py-3 border-t border-gray-100">
                <Link
                  to="/history"
                  className="text-sm text-brand-600 font-medium hover:text-brand-700"
                >
                  View all sessions
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
