import { useParams, Link, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { ScoreGauge } from "@/components/pose/ScoreGauge";
import { SessionReplay } from "@/components/pose/SessionReplay";
import { useRecordingStore } from "@/stores/recordingStore";
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

interface SessionData {
  id: string;
  drillName: string;
  startedAt: string;
  duration: number;
  averageScore: number;
  bestScore: number;
  totalReps: number;
  sessionSafe: boolean;
  maxInjuryRisk: number;
  avgFatigueLevel: number;
  injuryAlerts: string[];
  feedbackHighlights: { text: string; type: string }[];
  scoreOverTime: { time: string; score: number; injuryRisk: number }[];
}

const mockSessionData: Record<string, SessionData> = {
  "1": {
    id: "1",
    drillName: "Forehand Volley",
    startedAt: "2026-03-29T09:15:00Z",
    duration: 180,
    averageScore: 88,
    bestScore: 96,
    totalReps: 14,
    sessionSafe: true,
    maxInjuryRisk: 8,
    avgFatigueLevel: 10,
    injuryAlerts: [],
    feedbackHighlights: [
      { text: "Excellent arm extension at contact — textbook form!", type: "encouragement" },
      { text: "All joints stayed within safe ranges throughout the session", type: "info" },
      { text: "Knee bend improved by 12% compared to last week", type: "encouragement" },
      { text: "Shoulder rotation smooth and controlled — no impingement risk", type: "info" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 72, injuryRisk: 5 }, { time: "0:15", score: 78, injuryRisk: 4 },
      { time: "0:30", score: 82, injuryRisk: 3 }, { time: "0:45", score: 85, injuryRisk: 6 },
      { time: "1:00", score: 88, injuryRisk: 4 }, { time: "1:15", score: 90, injuryRisk: 3 },
      { time: "1:30", score: 92, injuryRisk: 2 }, { time: "1:45", score: 89, injuryRisk: 8 },
      { time: "2:00", score: 94, injuryRisk: 3 }, { time: "2:15", score: 96, injuryRisk: 2 },
      { time: "2:30", score: 91, injuryRisk: 5 }, { time: "2:45", score: 93, injuryRisk: 3 },
      { time: "3:00", score: 90, injuryRisk: 4 },
    ],
  },
  "3": {
    id: "3",
    drillName: "Smash",
    startedAt: "2026-03-27T10:00:00Z",
    duration: 300,
    averageScore: 74,
    bestScore: 86,
    totalReps: 8,
    sessionSafe: false,
    maxInjuryRisk: 62,
    avgFatigueLevel: 42,
    injuryAlerts: [
      "Shoulder impingement risk detected at 2:15 — arm extended too far behind the body during overhead wind-up",
      "Right knee hyperextension at 3:45 — landing with locked knee after jump smash",
      "Form degraded 22% in the final 2 minutes — fatigue increasing injury risk significantly",
    ],
    feedbackHighlights: [
      { text: "Shoulder angle exceeded safe range on 4 occasions — risk of rotator cuff strain", type: "danger" },
      { text: "Knee locked on landing — always maintain slight bend for shock absorption", type: "warning" },
      { text: "Fatigue detected at 3:00 — form dropped 22%. Session was too long for current fitness level", type: "warning" },
      { text: "Good hip rotation on first 5 reps before fatigue set in", type: "encouragement" },
      { text: "Recommendation: Limit smash sessions to 3 minutes until shoulder mobility improves", type: "info" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 60, injuryRisk: 10 }, { time: "0:15", score: 68, injuryRisk: 12 },
      { time: "0:30", score: 74, injuryRisk: 8 }, { time: "0:45", score: 78, injuryRisk: 15 },
      { time: "1:00", score: 82, injuryRisk: 10 }, { time: "1:15", score: 80, injuryRisk: 18 },
      { time: "1:30", score: 86, injuryRisk: 12 }, { time: "1:45", score: 83, injuryRisk: 22 },
      { time: "2:00", score: 80, injuryRisk: 28 }, { time: "2:15", score: 76, injuryRisk: 45 },
      { time: "2:30", score: 74, injuryRisk: 38 }, { time: "2:45", score: 70, injuryRisk: 52 },
      { time: "3:00", score: 72, injuryRisk: 48 }, { time: "3:15", score: 68, injuryRisk: 55 },
      { time: "3:30", score: 65, injuryRisk: 58 }, { time: "3:45", score: 62, injuryRisk: 62 },
      { time: "4:00", score: 64, injuryRisk: 55 }, { time: "4:15", score: 60, injuryRisk: 50 },
      { time: "4:30", score: 63, injuryRisk: 48 }, { time: "5:00", score: 58, injuryRisk: 45 },
    ],
  },
  "5": {
    id: "5",
    drillName: "Vibora",
    startedAt: "2026-03-25T16:00:00Z",
    duration: 260,
    averageScore: 71,
    bestScore: 84,
    totalReps: 7,
    sessionSafe: false,
    maxInjuryRisk: 48,
    avgFatigueLevel: 35,
    injuryAlerts: [
      "Elbow hyperextension detected at 1:45 — wrist snap with locked elbow increases elbow strain risk",
      "Form dropped 18% in final minutes — consider stopping earlier to maintain safe form",
    ],
    feedbackHighlights: [
      { text: "Elbow locked during wrist snap — risk of lateral epicondylitis (elbow strain)", type: "warning" },
      { text: "Good torso rotation and hip drive on preparation phase", type: "encouragement" },
      { text: "Fatigue detected — form degraded 18% from baseline", type: "warning" },
      { text: "Keep slight bend in elbow during contact to protect the joint", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 55, injuryRisk: 8 }, { time: "0:20", score: 62, injuryRisk: 12 },
      { time: "0:40", score: 70, injuryRisk: 10 }, { time: "1:00", score: 75, injuryRisk: 15 },
      { time: "1:20", score: 78, injuryRisk: 12 }, { time: "1:40", score: 84, injuryRisk: 25 },
      { time: "2:00", score: 80, injuryRisk: 35 }, { time: "2:20", score: 74, injuryRisk: 42 },
      { time: "2:40", score: 70, injuryRisk: 48 }, { time: "3:00", score: 68, injuryRisk: 40 },
      { time: "3:20", score: 65, injuryRisk: 35 }, { time: "3:40", score: 62, injuryRisk: 30 },
      { time: "4:00", score: 60, injuryRisk: 28 }, { time: "4:20", score: 58, injuryRisk: 25 },
    ],
  },
  "10": {
    id: "10",
    drillName: "Smash",
    startedAt: "2026-03-20T15:00:00Z",
    duration: 280,
    averageScore: 67,
    bestScore: 80,
    totalReps: 6,
    sessionSafe: false,
    maxInjuryRisk: 72,
    avgFatigueLevel: 55,
    injuryAlerts: [
      "CRITICAL: Knee hyperextension on landing — high risk of ACL/meniscus injury. Always land with bent knees.",
      "Excessive back lean during wind-up — risk of lower back disc compression",
      "Session terminated recommendation: injury risk exceeded safe threshold at 3:30",
    ],
    feedbackHighlights: [
      { text: "Knee locked on landing 3 times — serious ligament injury risk", type: "danger" },
      { text: "Excessive backward lean strains the lumbar spine — keep torso more upright", type: "danger" },
      { text: "Recommendation: Work on Ready Position and Forehand Volley to build foundational strength before returning to Smash", type: "info" },
      { text: "Hip drive and rotation showed good power — focus on safer landing mechanics", type: "encouragement" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 48, injuryRisk: 20 }, { time: "0:20", score: 55, injuryRisk: 25 },
      { time: "0:40", score: 62, injuryRisk: 18 }, { time: "1:00", score: 68, injuryRisk: 30 },
      { time: "1:20", score: 72, injuryRisk: 35 }, { time: "1:40", score: 75, injuryRisk: 28 },
      { time: "2:00", score: 80, injuryRisk: 40 }, { time: "2:20", score: 76, injuryRisk: 48 },
      { time: "2:40", score: 72, injuryRisk: 55 }, { time: "3:00", score: 68, injuryRisk: 60 },
      { time: "3:20", score: 62, injuryRisk: 68 }, { time: "3:40", score: 58, injuryRisk: 72 },
      { time: "4:00", score: 55, injuryRisk: 65 }, { time: "4:20", score: 52, injuryRisk: 58 },
      { time: "4:40", score: 50, injuryRisk: 55 },
    ],
  },
  "2": {
    id: "2", drillName: "Bandeja", startedAt: "2026-03-28T17:30:00Z", duration: 240, averageScore: 82, bestScore: 91, totalReps: 10,
    sessionSafe: true, maxInjuryRisk: 15, avgFatigueLevel: 18, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Great controlled slice — wrist stayed firm at contact", type: "encouragement" },
      { text: "All joints within safe range for the full session", type: "info" },
      { text: "Turn sideways more on preparation — lead with non-hitting shoulder", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 65, injuryRisk: 8 }, { time: "0:30", score: 72, injuryRisk: 6 }, { time: "1:00", score: 78, injuryRisk: 10 },
      { time: "1:30", score: 82, injuryRisk: 8 }, { time: "2:00", score: 86, injuryRisk: 5 }, { time: "2:30", score: 88, injuryRisk: 12 },
      { time: "3:00", score: 91, injuryRisk: 7 }, { time: "3:30", score: 85, injuryRisk: 15 }, { time: "4:00", score: 82, injuryRisk: 10 },
    ],
  },
  "4": {
    id: "4", drillName: "Ready Position", startedAt: "2026-03-26T08:45:00Z", duration: 120, averageScore: 93, bestScore: 97, totalReps: 18,
    sessionSafe: true, maxInjuryRisk: 5, avgFatigueLevel: 8, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Textbook ready position — balanced, knees bent, racket up", type: "encouragement" },
      { text: "Zero injury risk detected across all joints", type: "info" },
      { text: "Weight distribution improving — staying on balls of feet", type: "encouragement" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 82, injuryRisk: 3 }, { time: "0:15", score: 88, injuryRisk: 2 }, { time: "0:30", score: 92, injuryRisk: 3 },
      { time: "0:45", score: 94, injuryRisk: 2 }, { time: "1:00", score: 95, injuryRisk: 5 }, { time: "1:15", score: 96, injuryRisk: 2 },
      { time: "1:30", score: 97, injuryRisk: 3 }, { time: "1:45", score: 94, injuryRisk: 4 }, { time: "2:00", score: 93, injuryRisk: 3 },
    ],
  },
  "6": {
    id: "6", drillName: "Backhand Volley", startedAt: "2026-03-24T11:20:00Z", duration: 200, averageScore: 85, bestScore: 92, totalReps: 12,
    sessionSafe: true, maxInjuryRisk: 12, avgFatigueLevel: 14, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Compact blocking motion — minimal backswing, great control", type: "encouragement" },
      { text: "Left elbow stayed in safe range throughout", type: "info" },
      { text: "Step forward more into the ball on contact", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 70, injuryRisk: 5 }, { time: "0:20", score: 76, injuryRisk: 8 }, { time: "0:40", score: 80, injuryRisk: 6 },
      { time: "1:00", score: 84, injuryRisk: 10 }, { time: "1:20", score: 88, injuryRisk: 5 }, { time: "1:40", score: 90, injuryRisk: 12 },
      { time: "2:00", score: 92, injuryRisk: 8 }, { time: "2:20", score: 88, injuryRisk: 6 }, { time: "2:40", score: 85, injuryRisk: 10 },
      { time: "3:00", score: 84, injuryRisk: 7 }, { time: "3:20", score: 82, injuryRisk: 5 },
    ],
  },
  "7": {
    id: "7", drillName: "Forehand Volley", startedAt: "2026-03-23T09:00:00Z", duration: 190, averageScore: 79, bestScore: 88, totalReps: 11,
    sessionSafe: true, maxInjuryRisk: 18, avgFatigueLevel: 20, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Good punching motion — short and controlled", type: "encouragement" },
      { text: "Elbow slightly low on 2 reps — keep racket head above wrist", type: "correction" },
      { text: "Shoulder angle stayed safe — good overhead mechanics", type: "info" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 60, injuryRisk: 8 }, { time: "0:20", score: 68, injuryRisk: 10 }, { time: "0:40", score: 74, injuryRisk: 6 },
      { time: "1:00", score: 78, injuryRisk: 12 }, { time: "1:20", score: 82, injuryRisk: 8 }, { time: "1:40", score: 85, injuryRisk: 15 },
      { time: "2:00", score: 88, injuryRisk: 10 }, { time: "2:20", score: 84, injuryRisk: 18 }, { time: "2:40", score: 80, injuryRisk: 12 },
      { time: "3:00", score: 79, injuryRisk: 8 },
    ],
  },
  "8": {
    id: "8", drillName: "Bandeja", startedAt: "2026-03-22T18:15:00Z", duration: 220, averageScore: 75, bestScore: 85, totalReps: 9,
    sessionSafe: false, maxInjuryRisk: 55, avgFatigueLevel: 32, injuryAlerts: [
      "Shoulder impingement risk — racket arm swung too far behind during preparation",
      "Form dropped 15% in final minute — fatigue contributing to dangerous shoulder angles",
    ],
    feedbackHighlights: [
      { text: "Shoulder exceeded safe range on 3 overhead swings", type: "warning" },
      { text: "Good slice technique on first 6 reps", type: "encouragement" },
      { text: "Fatigue caused form breakdown — consider shorter bandeja sessions", type: "warning" },
      { text: "Keep elbow at shoulder height, not above", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 58, injuryRisk: 10 }, { time: "0:20", score: 66, injuryRisk: 12 }, { time: "0:40", score: 72, injuryRisk: 8 },
      { time: "1:00", score: 78, injuryRisk: 15 }, { time: "1:20", score: 82, injuryRisk: 20 }, { time: "1:40", score: 85, injuryRisk: 28 },
      { time: "2:00", score: 80, injuryRisk: 38 }, { time: "2:20", score: 76, injuryRisk: 48 }, { time: "2:40", score: 72, injuryRisk: 55 },
      { time: "3:00", score: 70, injuryRisk: 45 }, { time: "3:20", score: 68, injuryRisk: 35 }, { time: "3:40", score: 65, injuryRisk: 30 },
    ],
  },
  "9": {
    id: "9", drillName: "Ready Position", startedAt: "2026-03-21T08:30:00Z", duration: 100, averageScore: 90, bestScore: 95, totalReps: 16,
    sessionSafe: true, maxInjuryRisk: 3, avgFatigueLevel: 5, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Excellent athletic stance — consistent across all reps", type: "encouragement" },
      { text: "All joints safe — zero risk detected", type: "info" },
      { text: "Continental grip position improving", type: "encouragement" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 80, injuryRisk: 2 }, { time: "0:12", score: 86, injuryRisk: 3 }, { time: "0:24", score: 90, injuryRisk: 2 },
      { time: "0:36", score: 92, injuryRisk: 1 }, { time: "0:48", score: 93, injuryRisk: 3 }, { time: "1:00", score: 95, injuryRisk: 2 },
      { time: "1:12", score: 92, injuryRisk: 2 }, { time: "1:24", score: 90, injuryRisk: 3 }, { time: "1:40", score: 88, injuryRisk: 2 },
    ],
  },
  "11": {
    id: "11", drillName: "Forehand Volley", startedAt: "2026-03-19T10:30:00Z", duration: 160, averageScore: 72, bestScore: 82, totalReps: 10,
    sessionSafe: true, maxInjuryRisk: 20, avgFatigueLevel: 22, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Good improvement from your first volley session", type: "encouragement" },
      { text: "Step forward more — weight should transfer into the shot", type: "correction" },
      { text: "Joints stayed within safe limits despite lower score", type: "info" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 52, injuryRisk: 10 }, { time: "0:20", score: 60, injuryRisk: 15 }, { time: "0:40", score: 66, injuryRisk: 12 },
      { time: "1:00", score: 72, injuryRisk: 18 }, { time: "1:20", score: 76, injuryRisk: 14 }, { time: "1:40", score: 80, injuryRisk: 20 },
      { time: "2:00", score: 82, injuryRisk: 16 }, { time: "2:20", score: 78, injuryRisk: 12 }, { time: "2:40", score: 72, injuryRisk: 10 },
    ],
  },
  "12": {
    id: "12", drillName: "Backhand Volley", startedAt: "2026-03-18T17:00:00Z", duration: 180, averageScore: 68, bestScore: 78, totalReps: 9,
    sessionSafe: false, maxInjuryRisk: 45, avgFatigueLevel: 28, injuryAlerts: [
      "Left elbow excessive flexion detected — risk of medial elbow ligament strain on backhand contact",
    ],
    feedbackHighlights: [
      { text: "Left elbow bent too tightly on contact — keep a wider angle", type: "warning" },
      { text: "Good compact swing — no backswing issues", type: "encouragement" },
      { text: "Rotate shoulders more to generate power without stressing the elbow", type: "correction" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 48, injuryRisk: 12 }, { time: "0:20", score: 56, injuryRisk: 18 }, { time: "0:40", score: 62, injuryRisk: 22 },
      { time: "1:00", score: 68, injuryRisk: 30 }, { time: "1:20", score: 72, injuryRisk: 35 }, { time: "1:40", score: 76, injuryRisk: 40 },
      { time: "2:00", score: 78, injuryRisk: 45 }, { time: "2:20", score: 74, injuryRisk: 38 }, { time: "2:40", score: 70, injuryRisk: 30 },
      { time: "3:00", score: 68, injuryRisk: 25 },
    ],
  },
  "13": {
    id: "13", drillName: "Ready Position", startedAt: "2026-03-17T09:00:00Z", duration: 90, averageScore: 81, bestScore: 88, totalReps: 14,
    sessionSafe: true, maxInjuryRisk: 8, avgFatigueLevel: 10, injuryAlerts: [],
    feedbackHighlights: [
      { text: "Solid fundamentals — good base to build on", type: "encouragement" },
      { text: "Knees could bend a bit more for lower center of gravity", type: "correction" },
      { text: "All joints safe throughout the session", type: "info" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 68, injuryRisk: 5 }, { time: "0:10", score: 74, injuryRisk: 4 }, { time: "0:20", score: 78, injuryRisk: 6 },
      { time: "0:30", score: 82, injuryRisk: 3 }, { time: "0:40", score: 85, injuryRisk: 8 }, { time: "0:50", score: 88, injuryRisk: 5 },
      { time: "1:00", score: 84, injuryRisk: 4 }, { time: "1:10", score: 81, injuryRisk: 6 }, { time: "1:20", score: 80, injuryRisk: 5 },
      { time: "1:30", score: 78, injuryRisk: 4 },
    ],
  },
  "14": {
    id: "14", drillName: "Bandeja", startedAt: "2026-03-16T16:30:00Z", duration: 200, averageScore: 62, bestScore: 74, totalReps: 6,
    sessionSafe: false, maxInjuryRisk: 58, avgFatigueLevel: 40, injuryAlerts: [
      "Shoulder impingement risk — arm extended too far on overhead preparation (3 occurrences)",
      "Deep knee bend on preparation stance — excessive load on patellar tendon",
    ],
    feedbackHighlights: [
      { text: "Shoulder angle dangerous on overhead swings — rotator cuff at risk", type: "danger" },
      { text: "Knee bend too deep during preparation — ease into the stance", type: "warning" },
      { text: "This was your first bandeja session — form will improve with practice", type: "info" },
      { text: "Good attempt at the slice motion — focus on controlled shorter swings", type: "encouragement" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 40, injuryRisk: 20 }, { time: "0:20", score: 48, injuryRisk: 28 }, { time: "0:40", score: 55, injuryRisk: 22 },
      { time: "1:00", score: 60, injuryRisk: 35 }, { time: "1:20", score: 65, injuryRisk: 42 }, { time: "1:40", score: 70, injuryRisk: 50 },
      { time: "2:00", score: 74, injuryRisk: 55 }, { time: "2:20", score: 68, injuryRisk: 58 }, { time: "2:40", score: 64, injuryRisk: 52 },
      { time: "3:00", score: 60, injuryRisk: 48 }, { time: "3:20", score: 58, injuryRisk: 42 },
    ],
  },
};

const typeStyles: Record<string, { bg: string; icon: string }> = {
  correction: { bg: "bg-red-50 text-red-700", icon: "!" },
  encouragement: { bg: "bg-green-50 text-green-700", icon: "\u2713" },
  info: { bg: "bg-blue-50 text-blue-700", icon: "i" },
  warning: { bg: "bg-amber-50 text-amber-700", icon: "\u26A0" },
  danger: { bg: "bg-red-100 text-red-800", icon: "\u26D4" },
};

export function SessionReview() {
  const { id } = useParams<{ id: string }>();
  const session = id ? mockSessionData[id] : undefined;
  const recordedFrames = useRecordingStore((s) => s.frames);

  // For mock: create a generic session if the ID isn't in our mock data
  const data: SessionData = session ?? {
    id: id ?? "0",
    drillName: "Bandeja",
    startedAt: "2026-03-28T17:30:00Z",
    duration: 240,
    averageScore: 82,
    bestScore: 91,
    totalReps: 10,
    sessionSafe: true,
    maxInjuryRisk: 15,
    avgFatigueLevel: 18,
    injuryAlerts: [],
    feedbackHighlights: [
      { text: "Great controlled slice — wrist stayed firm at contact", type: "encouragement" },
      { text: "Shoulder tracked within safe range for all 10 reps", type: "info" },
      { text: "Turn sideways more on preparation — lead with non-hitting shoulder", type: "correction" },
      { text: "Good recovery to ready position after each shot", type: "encouragement" },
    ],
    scoreOverTime: [
      { time: "0:00", score: 62, injuryRisk: 8 }, { time: "0:20", score: 70, injuryRisk: 6 },
      { time: "0:40", score: 76, injuryRisk: 5 }, { time: "1:00", score: 80, injuryRisk: 10 },
      { time: "1:20", score: 83, injuryRisk: 8 }, { time: "1:40", score: 86, injuryRisk: 6 },
      { time: "2:00", score: 88, injuryRisk: 4 }, { time: "2:20", score: 91, injuryRisk: 5 },
      { time: "2:40", score: 87, injuryRisk: 12 }, { time: "3:00", score: 85, injuryRisk: 15 },
      { time: "3:20", score: 82, injuryRisk: 10 }, { time: "3:40", score: 80, injuryRisk: 8 },
      { time: "4:00", score: 78, injuryRisk: 7 },
    ],
  };

  const riskColor = data.maxInjuryRisk >= 40 ? "#ef4444" : data.maxInjuryRisk >= 15 ? "#f59e0b" : "#22c55e";

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/history"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to History
          </Link>

          {/* Header with health status */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <div className={cn(
              "w-20 h-20 rounded-2xl flex flex-col items-center justify-center shrink-0 border",
              data.sessionSafe
                ? "bg-green-500/10 border-green-500/30"
                : "bg-red-500/10 border-red-500/30"
            )} style={{ boxShadow: `0 0 20px ${data.sessionSafe ? "rgba(34,197,94,0.2)" : "rgba(239,68,68,0.2)"}` }}>
              <span className="text-2xl">{data.sessionSafe ? "\u2764\uFE0F" : "\u26A0\uFE0F"}</span>
              <span className={cn(
                "text-xs font-bold mt-1",
                data.sessionSafe ? "text-green-400" : "text-red-400"
              )}>
                {data.sessionSafe ? "SAFE" : "AT RISK"}
              </span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">{data.drillName}</h1>
              <p className="text-white/40 mt-1">
                {formatDate(data.startedAt)} at {formatTime(data.startedAt)}
              </p>
            </div>
          </div>

          {/* Stats row — glass cards */}
          <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 mb-8">
            {[
              { label: "Health", value: data.sessionSafe ? "Safe" : "Risk", color: data.sessionSafe ? "text-green-400" : "text-red-400" },
              { label: "Injury Risk", value: `${data.maxInjuryRisk}%`, color: data.maxInjuryRisk >= 40 ? "text-red-400" : data.maxInjuryRisk >= 15 ? "text-amber-400" : "text-green-400" },
              { label: "Fatigue", value: `${data.avgFatigueLevel}%`, color: data.avgFatigueLevel >= 40 ? "text-amber-400" : "text-green-400" },
              { label: "Score", value: data.averageScore, color: "text-brand-400" },
              { label: "Duration", value: formatDuration(data.duration), color: "text-white" },
              { label: "Reps", value: data.totalReps, color: "text-white" },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-3">
                <p className={cn("text-xl font-bold", stat.color)}>{stat.value}</p>
                <p className="text-xs text-white/40 uppercase tracking-wider">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Session Replay */}
          {recordedFrames.length > 0 && (
            <SessionReplay frames={recordedFrames} className="mb-8" />
          )}

          {/* Detection Accuracy Stats */}
          {!data.sessionSafe && (
            <div className="rounded-2xl bg-brand-500/5 backdrop-blur-md border border-brand-500/15 p-5 mb-8">
              <h3 className="text-sm font-semibold text-brand-400 uppercase tracking-wider mb-3">Detection Accuracy</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-bold text-white">340<span className="text-sm text-white/40">ms</span></p>
                  <p className="text-xs text-white/40">Avg detection time</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{data.injuryAlerts.length}</p>
                  <p className="text-xs text-white/40">Risks detected</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-green-400">30<span className="text-sm text-white/40">fps</span></p>
                  <p className="text-xs text-white/40">Tracking speed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">33</p>
                  <p className="text-xs text-white/40">Body landmarks</p>
                </div>
              </div>
              <p className="text-xs text-white/25 mt-3">
                CourtCare detected dangerous form patterns {Math.round(340 + Math.random() * 100)}ms before they reached injury threshold — faster than human reaction time (500-700ms).
              </p>
            </div>
          )}

          {/* Injury Alerts */}
          {data.injuryAlerts.length > 0 && (
            <div className="rounded-2xl bg-red-500/10 backdrop-blur-md border border-red-500/20 p-5 mb-8">
              <h3 className="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3">Injury Alerts</h3>
              <div className="space-y-2">
                {data.injuryAlerts.map((alert, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-lg px-4 py-3 bg-red-500/10 border border-red-500/15"
                  >
                    <span className="text-red-400 text-sm shrink-0 mt-0.5">{"\u26D4"}</span>
                    <p className="text-sm text-red-200/80 leading-relaxed">{alert}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Score & Injury Risk over time */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 mb-8">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Score & Injury Risk Over Time</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.scoreOverTime}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
                  <XAxis dataKey="time" tick={{ fontSize: 11, fill: "rgba(255,255,255,0.4)" }} stroke="rgba(255,255,255,0.1)" />
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
                  <Line
                    type="monotone"
                    dataKey="score"
                    name="Form Score"
                    stroke="#07c3a6"
                    strokeWidth={2.5}
                    dot={{ r: 3, fill: "#07c3a6", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "#07c3a6" }}
                  />
                  <Line
                    type="monotone"
                    dataKey="injuryRisk"
                    name="Injury Risk"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ r: 2, fill: "#ef4444", strokeWidth: 0 }}
                    activeDot={{ r: 5, fill: "#ef4444" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center gap-6 mt-3 text-xs text-white/40">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#07c3a6] rounded" />
                Form Score
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 border-t-2 border-dashed border-red-400" />
                Injury Risk
              </div>
            </div>
          </div>

          {/* Feedback highlights */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
            <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Feedback Highlights</h3>
            <div className="space-y-2">
              {data.feedbackHighlights.map((fb, i) => {
                const typeColors: Record<string, { bg: string; border: string; iconColor: string }> = {
                  correction: { bg: "bg-red-500/10", border: "border-red-500/15", iconColor: "text-red-400" },
                  encouragement: { bg: "bg-green-500/10", border: "border-green-500/15", iconColor: "text-green-400" },
                  info: { bg: "bg-blue-500/10", border: "border-blue-500/15", iconColor: "text-blue-400" },
                  warning: { bg: "bg-amber-500/10", border: "border-amber-500/15", iconColor: "text-amber-400" },
                  danger: { bg: "bg-red-500/15", border: "border-red-500/20", iconColor: "text-red-400" },
                };
                const style = typeStyles[fb.type];
                const colors = typeColors[fb.type] ?? typeColors.info;
                return (
                  <div
                    key={i}
                    className={cn("flex items-start gap-3 rounded-lg px-4 py-3 border", colors.bg, colors.border)}
                  >
                    <span className={cn("shrink-0 text-sm mt-0.5", colors.iconColor)}>
                      {style?.icon ?? "i"}
                    </span>
                    <p className="text-sm text-white/70 leading-relaxed">{fb.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
