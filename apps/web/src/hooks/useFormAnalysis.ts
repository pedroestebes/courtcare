import { useState, useRef, useCallback, useEffect } from "react";
import type { Landmark } from "@/types/pose";
import type { FeedbackMessage } from "@/types/session";
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
  reset: () => void;
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

  const smootherRef = useRef(new EMAScoreSmoother(0.25));
  const repCounterRef = useRef(new RepCounter(60));
  const throttlerRef = useRef(new FeedbackThrottler(3000));

  const reset = useCallback(() => {
    smootherRef.current.reset();
    repCounterRef.current.reset();
    throttlerRef.current.reset();
    setRawScore(0);
    setSmoothedScore(0);
    setBestScore(0);
    setFeedback([]);
    setRepCount(0);
    setScores({});
  }, []);

  useEffect(() => {
    if (!enabled || !drill || !landmarks || landmarks.length < 33) return;

    const angles = extractJointAngles(landmarks);

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

    const ruleMessages = evaluateFeedback(drill.feedbackRules, result.scores);
    const encouragement = getEncouragement(smoothed);
    const allMessages = encouragement
      ? [...ruleMessages, encouragement]
      : ruleMessages;

    const throttled = throttlerRef.current.filter(allMessages);
    const top = topNFeedback(throttled, 3);

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
    reset,
  };
}
