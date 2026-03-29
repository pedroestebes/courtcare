import { useParams, Link, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ScoreGauge } from "@/components/pose/ScoreGauge";
import { formatDate, formatTime, formatDuration, scoreColor, cn } from "@/lib/utils";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";

const mockSessionData: Record<string, {
  id: string;
  drillName: string;
  startedAt: string;
  duration: number;
  averageScore: number;
  bestScore: number;
  totalReps: number;
  feedbackHighlights: { text: string; type: "correction" | "encouragement" | "info" }[];
  scoreOverTime: { time: string; score: number }[];
}> = {
  "1": {
    id: "1",
    drillName: "Forehand Volley",
    startedAt: "2026-03-27T10:30:00Z",
    duration: 180,
    averageScore: 82,
    bestScore: 94,
    totalReps: 12,
    feedbackHighlights: [
      { text: "Great arm extension at contact -- keep it up!", type: "encouragement" },
      { text: "Remember to step forward into the volley", type: "correction" },
      { text: "Elbow position improved significantly during the session", type: "info" },
      { text: "Keep the racket at chest height during preparation", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 55 }, { time: "0:15", score: 62 }, { time: "0:30", score: 70 },
      { time: "0:45", score: 68 }, { time: "1:00", score: 78 }, { time: "1:15", score: 82 },
      { time: "1:30", score: 85 }, { time: "1:45", score: 80 }, { time: "2:00", score: 88 },
      { time: "2:15", score: 91 }, { time: "2:30", score: 87 }, { time: "2:45", score: 94 },
      { time: "3:00", score: 90 },
    ],
  },
};

const typeStyles: Record<string, { bg: string; icon: string }> = {
  correction: { bg: "bg-red-50 text-red-700", icon: "!" },
  encouragement: { bg: "bg-green-50 text-green-700", icon: "\u2713" },
  info: { bg: "bg-blue-50 text-blue-700", icon: "i" },
};

export function SessionReview() {
  const { id } = useParams<{ id: string }>();
  const session = id ? mockSessionData[id] : undefined;

  // For mock: create a generic session if the ID isn't in our mock data
  const data = session ?? {
    id: id ?? "0",
    drillName: "Training Session",
    startedAt: "2026-03-25T12:00:00Z",
    duration: 200,
    averageScore: 75,
    bestScore: 88,
    totalReps: 10,
    feedbackHighlights: [
      { text: "Good overall form throughout the session", type: "encouragement" as const },
      { text: "Watch your knee bend -- stay lower in the athletic stance", type: "correction" as const },
      { text: "Consistency improving over time", type: "info" as const },
    ],
    scoreOverTime: [
      { time: "0:00", score: 50 }, { time: "0:30", score: 60 }, { time: "1:00", score: 68 },
      { time: "1:30", score: 72 }, { time: "2:00", score: 78 }, { time: "2:30", score: 80 },
      { time: "3:00", score: 75 }, { time: "3:20", score: 82 },
    ],
  };

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/history"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to History
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
          <ScoreGauge score={data.averageScore} size={100} className="bg-brand-950 rounded-2xl p-3" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{data.drillName}</h1>
            <p className="text-gray-500 mt-1">
              {formatDate(data.startedAt)} at {formatTime(data.startedAt)}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Average Score", value: data.averageScore, color: scoreColor(data.averageScore) },
            { label: "Best Score", value: data.bestScore, color: scoreColor(data.bestScore) },
            { label: "Duration", value: formatDuration(data.duration), color: "text-gray-900" },
            { label: "Total Reps", value: data.totalReps, color: "text-gray-900" },
          ].map((stat) => (
            <Card key={stat.label}>
              <p className={cn("text-2xl font-bold", stat.color)}>{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </Card>
          ))}
        </div>

        {/* Score over time */}
        <Card header="Score Over Time" className="mb-8">
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.scoreOverTime}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="time" tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <YAxis domain={[0, 100]} tick={{ fontSize: 12 }} stroke="#9ca3af" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e5e7eb",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                  }}
                />
                <ReferenceLine y={data.averageScore} stroke="#9ca3af" strokeDasharray="4 4" label={{ value: "Avg", position: "right", fontSize: 11, fill: "#9ca3af" }} />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#07c3a6"
                  strokeWidth={2.5}
                  dot={{ r: 3, fill: "#07c3a6", strokeWidth: 0 }}
                  activeDot={{ r: 6, fill: "#07c3a6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Feedback highlights */}
        <Card header="Feedback Highlights">
          <div className="space-y-3">
            {data.feedbackHighlights.map((fb, i) => {
              const style = typeStyles[fb.type];
              return (
                <div
                  key={i}
                  className={cn("flex items-start gap-3 rounded-xl px-4 py-3", style.bg)}
                >
                  <span className="shrink-0 w-5 h-5 rounded-full bg-white/60 flex items-center justify-center text-xs font-bold mt-0.5">
                    {style.icon}
                  </span>
                  <p className="text-sm leading-relaxed">{fb.text}</p>
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
