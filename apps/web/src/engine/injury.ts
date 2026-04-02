import type { JointAngles } from "@/engine/angles";
import type { InjuryRisk, HealthMetrics } from "@/types/session";

/**
 * Danger thresholds for padel-specific injury risks.
 * Based on sports medicine research for overhead racket sports.
 */
interface InjuryThreshold {
  joint: string;
  label: string;
  description: string;
  /** Angle or value below which risk increases */
  dangerBelow?: number;
  /** Angle or value above which risk increases */
  dangerAbove?: number;
  /** How quickly risk increases beyond threshold (degrees) */
  rampDegrees: number;
  /** Which JointAngles key(s) to check */
  angleKey: keyof JointAngles;
}

const PADEL_INJURY_THRESHOLDS: InjuryThreshold[] = [
  // SHOULDER — most common padel injury area
  {
    joint: "shoulder",
    label: "Shoulder Impingement",
    description:
      "Arm raised too high behind the body — risk of shoulder impingement and rotator cuff strain",
    dangerAbove: 170,
    rampDegrees: 15,
    angleKey: "rightShoulder",
  },
  {
    joint: "shoulder",
    label: "Shoulder Overextension (Left)",
    description:
      "Non-hitting arm overextended — maintain control to protect the shoulder joint",
    dangerAbove: 160,
    rampDegrees: 20,
    angleKey: "leftShoulder",
  },

  // ELBOW — tennis elbow / golfer's elbow
  {
    joint: "elbow",
    label: "Elbow Hyperextension",
    description:
      "Arm too straight on contact — risk of tennis elbow (lateral epicondylitis)",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "rightElbow",
  },
  {
    joint: "elbow",
    label: "Elbow Excessive Flexion",
    description:
      "Elbow too bent on overhead shots — increased stress on the medial elbow ligaments",
    dangerBelow: 40,
    rampDegrees: 15,
    angleKey: "rightElbow",
  },

  // KNEE — ACL, meniscus, patella
  {
    joint: "knee",
    label: "Right Knee Hyperextension",
    description:
      "Knee too straight — risk of ligament strain. Keep a slight bend for shock absorption",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "rightKnee",
  },
  {
    joint: "knee",
    label: "Left Knee Hyperextension",
    description:
      "Knee too straight — risk of ligament strain. Keep a slight bend for shock absorption",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "leftKnee",
  },
  {
    joint: "knee",
    label: "Deep Knee Bend (Right)",
    description:
      "Excessive knee bend — increased load on the patellar tendon and meniscus",
    dangerBelow: 70,
    rampDegrees: 20,
    angleKey: "rightKnee",
  },
  {
    joint: "knee",
    label: "Deep Knee Bend (Left)",
    description:
      "Excessive knee bend — increased load on the patellar tendon and meniscus",
    dangerBelow: 70,
    rampDegrees: 20,
    angleKey: "leftKnee",
  },

  // SPINE / TORSO — lower back strain
  {
    joint: "spine",
    label: "Excessive Back Lean",
    description:
      "Leaning back too far — risk of lower back strain and disc compression",
    dangerBelow: -120,
    rampDegrees: 15,
    angleKey: "torsoInclination",
  },
  {
    joint: "spine",
    label: "Forward Trunk Collapse",
    description:
      "Excessive forward lean — strains the lower back and reduces shot power",
    dangerAbove: -55,
    rampDegrees: 15,
    angleKey: "torsoInclination",
  },

  // HIP — hip impingement, groin strain
  {
    joint: "hip",
    label: "Hip Overflexion (Right)",
    description:
      "Excessive hip flexion — risk of hip impingement and groin strain",
    dangerBelow: 70,
    rampDegrees: 20,
    angleKey: "rightHip",
  },
  {
    joint: "hip",
    label: "Hip Overflexion (Left)",
    description:
      "Excessive hip flexion — risk of hip impingement and groin strain",
    dangerBelow: 70,
    rampDegrees: 20,
    angleKey: "leftHip",
  },
];

/**
 * Calculate injury risk score for a single threshold.
 * Returns 0 (safe) to 100 (extreme danger).
 */
function calculateRiskScore(
  value: number,
  threshold: InjuryThreshold
): number {
  if (!Number.isFinite(value)) return 0;

  if (threshold.dangerAbove !== undefined && value > threshold.dangerAbove) {
    const excess = value - threshold.dangerAbove;
    return Math.min(100, (excess / threshold.rampDegrees) * 100);
  }

  if (threshold.dangerBelow !== undefined && value < threshold.dangerBelow) {
    const excess = threshold.dangerBelow - value;
    return Math.min(100, (excess / threshold.rampDegrees) * 100);
  }

  return 0;
}

/**
 * Map a risk score to a severity level.
 */
function riskLevel(score: number): InjuryRisk["level"] {
  if (score >= 70) return "danger";
  if (score >= 40) return "warning";
  if (score >= 15) return "caution";
  return "safe";
}

/**
 * Assess all injury risks from current joint angles.
 */
export function assessInjuryRisks(angles: JointAngles): InjuryRisk[] {
  const risks: InjuryRisk[] = [];

  for (const threshold of PADEL_INJURY_THRESHOLDS) {
    const value = angles[threshold.angleKey];
    if (value === undefined || !Number.isFinite(value)) continue;
    const score = calculateRiskScore(value, threshold);

    if (score > 10) {
      risks.push({
        joint: threshold.joint,
        level: riskLevel(score),
        score: Math.round(score),
        description: threshold.description,
      });
    }
  }

  return risks.sort((a, b) => b.score - a.score);
}

/**
 * Track fatigue by monitoring form degradation over a session.
 * Compares recent scores against early-session baseline.
 */
export class FatigueTracker {
  private scores: number[] = [];
  private readonly baselineWindow: number;
  private readonly recentWindow: number;

  constructor(baselineWindow = 30, recentWindow = 15) {
    this.baselineWindow = baselineWindow;
    this.recentWindow = recentWindow;
  }

  push(score: number): void {
    this.scores.push(score);
  }

  /**
   * Returns fatigue level 0-100.
   * Based on how much recent form has degraded vs early form.
   */
  getFatigueLevel(): number {
    if (this.scores.length < this.baselineWindow + this.recentWindow) {
      return 0;
    }

    const baseline = this.scores.slice(0, this.baselineWindow);
    const recent = this.scores.slice(-this.recentWindow);

    const baselineAvg =
      baseline.reduce((a, b) => a + b, 0) / baseline.length;
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;

    if (baselineAvg < 1) return 0;

    const degradation = ((baselineAvg - recentAvg) / baselineAvg) * 100;
    return Math.max(0, Math.min(100, Math.round(degradation * 2)));
  }

  /**
   * Returns form degradation as a percentage.
   */
  getFormDegradation(): number {
    if (this.scores.length < this.baselineWindow + this.recentWindow) {
      return 0;
    }

    const baseline = this.scores.slice(0, this.baselineWindow);
    const recent = this.scores.slice(-this.recentWindow);

    const baselineAvg =
      baseline.reduce((a, b) => a + b, 0) / baseline.length;
    const recentAvg = recent.reduce((a, b) => a + b, 0) / recent.length;

    if (baselineAvg < 1) return 0;

    const drop = ((baselineAvg - recentAvg) / baselineAvg) * 100;
    return Math.max(0, Math.round(drop));
  }

  reset(): void {
    this.scores = [];
  }
}

/**
 * Compile all health metrics for a single frame.
 */
export function compileHealthMetrics(
  injuryRisks: InjuryRisk[],
  fatigueLevel: number,
  formDegradation: number
): HealthMetrics {
  const dangerRisks = injuryRisks.filter((r) => r.level === "danger");
  const warningRisks = injuryRisks.filter(
    (r) => r.level === "warning" || r.level === "danger"
  );

  // Overall risk = max individual risk, boosted by fatigue
  const maxRisk = injuryRisks.length > 0 ? injuryRisks[0].score : 0;
  const fatigueBoost = fatigueLevel * 0.3;
  const overallRisk = Math.min(100, Math.round(maxRisk + fatigueBoost));

  const dangerAlerts: string[] = [];

  for (const risk of dangerRisks) {
    dangerAlerts.push(risk.description);
  }

  if (fatigueLevel >= 60) {
    dangerAlerts.push(
      "Significant fatigue detected — form is degrading. Consider taking a break to prevent injury."
    );
  }

  if (formDegradation >= 25) {
    dangerAlerts.push(
      `Form has dropped ${formDegradation}% from your baseline. Fatigue increases injury risk.`
    );
  }

  return {
    overallRisk,
    injuryRisks,
    fatigueLevel,
    formDegradation,
    dangerAlerts,
    sessionSafe: dangerRisks.length === 0 && fatigueLevel < 70,
  };
}
