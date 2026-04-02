import { useState, useRef, useCallback, useEffect } from "react";
import type { Landmark } from "@/types/pose";
import type { FeedbackMessage, HealthMetrics } from "@/types/session";
import type { DrillDefinition } from "@/engine/drills/types";
import { extractJointAngles } from "@/engine/angles";
import { scoreConstraints } from "@/engine/drills/types";
import { EMAScoreSmoother, RepCounter } from "@/engine/scoring";
import {
  evaluateFeedback,
  FeedbackThrottler,
  getEncouragement,
  topNFeedback,
} from "@/engine/feedback";
import {
  assessInjuryRisks,
  FatigueTracker,
  compileHealthMetrics,
} from "@/engine/injury";

interface UseFormAnalysisOptions {
  drill: DrillDefinition | null;
  landmarks: Landmark[] | null;
  enabled: boolean;
}

interface UseFormAnalysisReturn {
  rawScore: number;
  smoothedScore: number;
  bestScore: number;
  feedback: FeedbackMessage[];
  repCount: number;
  scores: Record<string, number>;
  healthMetrics: HealthMetrics | null;
  reset: () => void;
}

let injuryMessageId = 0;

function createInjuryFeedback(
  text: string,
  type: "warning" | "danger",
  priority: number
): FeedbackMessage {
  return {
    id: `injury-${++injuryMessageId}-${Date.now()}`,
    text,
    type,
    priority,
    timestamp: Date.now(),
  };
}

export function useFormAnalysis({
  drill,
  landmarks,
  enabled,
}: UseFormAnalysisOptions): UseFormAnalysisReturn {
  const [rawScore, setRawScore] = useState(0);
  const [smoothedScore, setSmoothedScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [feedback, setFeedback] = useState<FeedbackMessage[]>([]);
  const [repCount, setRepCount] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const [healthMetrics, setHealthMetrics] = useState<HealthMetrics | null>(
    null
  );

  const smootherRef = useRef(new EMAScoreSmoother(0.25));
  const repCounterRef = useRef(new RepCounter(60));
  const throttlerRef = useRef(new FeedbackThrottler(3000));
  const fatigueTrackerRef = useRef(new FatigueTracker(30, 15));
  const injuryThrottlerRef = useRef(new FeedbackThrottler(5000));

  const reset = useCallback(() => {
    smootherRef.current.reset();
    repCounterRef.current.reset();
    throttlerRef.current.reset();
    fatigueTrackerRef.current.reset();
    injuryThrottlerRef.current.reset();
    setRawScore(0);
    setSmoothedScore(0);
    setBestScore(0);
    setFeedback([]);
    setRepCount(0);
    setScores({});
    setHealthMetrics(null);
  }, []);

  useEffect(() => {
    if (!enabled || !drill || !landmarks || landmarks.length < 33) return;

    const angles = extractJointAngles(landmarks);
    if (!angles) return;

    // --- Form scoring ---
    const allConstraints = drill.phases.flatMap((phase) => phase.constraints);
    const result = scoreConstraints(angles, allConstraints);

    setRawScore(result.overall);
    setScores(result.scores);

    const smoothed = smootherRef.current.push(result.overall);
    setSmoothedScore(smoothed);

    setBestScore((prev) => Math.max(prev, smoothed));

    const repCompleted = repCounterRef.current.update(smoothed);
    if (repCompleted) {
      setRepCount(repCounterRef.current.getCount());
    }

    // --- Injury risk assessment ---
    const injuryRisks = assessInjuryRisks(angles);

    // --- Fatigue tracking ---
    fatigueTrackerRef.current.push(smoothed);
    const fatigueLevel = fatigueTrackerRef.current.getFatigueLevel();
    const formDegradation = fatigueTrackerRef.current.getFormDegradation();

    // --- Compile health metrics ---
    const health = compileHealthMetrics(
      injuryRisks,
      fatigueLevel,
      formDegradation
    );
    setHealthMetrics(health);

    // --- Build feedback (form + injury) ---
    const ruleMessages = evaluateFeedback(drill.feedbackRules, result.scores);
    const encouragement = getEncouragement(smoothed);
    const allFormMessages = encouragement
      ? [...ruleMessages, encouragement]
      : ruleMessages;

    // Add injury warnings/dangers as feedback messages
    const injuryMessages: FeedbackMessage[] = [];

    for (const risk of injuryRisks) {
      if (risk.level === "danger") {
        injuryMessages.push(
          createInjuryFeedback(risk.description, "danger", 20)
        );
      } else if (risk.level === "warning") {
        injuryMessages.push(
          createInjuryFeedback(risk.description, "warning", 15)
        );
      }
    }

    if (fatigueLevel >= 60) {
      injuryMessages.push(
        createInjuryFeedback(
          "Fatigue detected — your form is dropping. Take a break to avoid injury.",
          "warning",
          18
        )
      );
    }

    // Injury messages take priority over form corrections
    const allMessages = [...injuryMessages, ...allFormMessages].sort(
      (a, b) => b.priority - a.priority
    );

    const throttled = [
      ...injuryThrottlerRef.current.filter(
        allMessages.filter(
          (m) => m.type === "warning" || m.type === "danger"
        )
      ),
      ...throttlerRef.current.filter(
        allMessages.filter(
          (m) => m.type !== "warning" && m.type !== "danger"
        )
      ),
    ];

    const top = topNFeedback(throttled, 4);

    if (top.length > 0) {
      setFeedback(top);
    }
  }, [enabled, drill, landmarks]);

  return {
    rawScore,
    smoothedScore,
    bestScore,
    feedback,
    repCount,
    scores,
    healthMetrics,
    reset,
  };
}
