import type { FeedbackRule } from "@/engine/feedback";
import type { JointAngles } from "@/engine/angles";

export interface AngleConstraint {
  joint: keyof JointAngles;
  min: number;
  max: number;
  weight: number;
  label: string;
  correctionBelow: string;
  correctionAbove: string;
}

export interface DrillPhase {
  name: string;
  description: string;
  constraints: AngleConstraint[];
  durationHint?: number;
}

export interface DrillDefinition {
  slug: string;
  name: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  description: string;
  shortDescription: string;
  instructions: string[];
  thumbnailEmoji: string;
  estimatedDuration: number;
  phases: DrillPhase[];
  feedbackRules: FeedbackRule[];
  scoreWeights: Record<string, number>;
}

/**
 * Score a set of joint angles against a list of constraints.
 * Returns individual scores for each constraint and a weighted overall score.
 */
export function scoreConstraints(
  angles: JointAngles,
  constraints: AngleConstraint[]
): { scores: Record<string, number>; overall: number } {
  const scores: Record<string, number> = {};
  let totalWeight = 0;
  let totalScore = 0;

  for (const c of constraints) {
    const value = angles[c.joint] as number;
    let score: number;

    if (value >= c.min && value <= c.max) {
      score = 100;
    } else {
      const distance = value < c.min ? c.min - value : value - c.max;
      score = Math.max(0, 100 - (distance / 30) * 100);
    }

    scores[c.label] = Math.round(score * 10) / 10;
    totalWeight += c.weight;
    totalScore += score * c.weight;
  }

  const overall = totalWeight > 0 ? Math.round((totalScore / totalWeight) * 10) / 10 : 0;

  return { scores, overall };
}
