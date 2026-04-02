import type { JointAngles } from "@/engine/angles";
import type { InjuryRisk, HealthMetrics } from "@/types/session";

/**
 * Danger thresholds for padel-specific injury risks.
 *
 * Evidence basis:
 * - Shoulder: Bern Consensus Statement 2022 (Schwank et al., JOSPT);
 *   Elliott 2006 (BJSM) — shoulder lateral rotation 130±27° during serve
 * - Elbow: Lateral epicondylitis meta-analysis (JCM 2021, PMC8432114);
 *   Elliott 2006 — elbow flexion 30±16° at ball contact
 * - Knee: NATA ACL Prevention Position Statement 2018;
 *   Hewett 2005 (AJSM) — neuromuscular training reduces ACL risk 50–88%
 * - Ankle: Rivera et al. 2017 (CJSM, PMC5737043) — proprioceptive training
 *   reduces sprains RR=0.57; Riva et al. 2016 (PMC4750505) 6-year study
 * - Padel epidemiology: Jansen et al. 2023 (BMJ Open Sport Exerc Med,
 *   PMC10277135) — 85% injury prevalence, elbow most affected (30–74%)
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
  // ── SHOULDER — overhead shots load rotator cuff (Bern Consensus 2022) ──
  // Elliott 2006: shoulder elevation 110±17° during serve; >170° = impingement zone
  {
    joint: "shoulder",
    label: "Shoulder Impingement",
    description:
      "Arm raised too high — risk of rotator cuff impingement (Bern Consensus 2022)",
    dangerAbove: 170,
    rampDegrees: 15,
    angleKey: "rightShoulder",
  },
  {
    joint: "shoulder",
    label: "Shoulder Overextension (Left)",
    description:
      "Non-hitting arm overextended — protect the shoulder joint (DSSF Guidelines 2023)",
    dangerAbove: 160,
    rampDegrees: 20,
    angleKey: "leftShoulder",
  },

  // ── ELBOW — most affected joint in padel: 30–74% of injuries (Jansen 2023) ──
  // Elliott 2006: elbow flexion 30±16° at ball contact; hyperextension increases
  // rotatory stress (PMC2465285). Eccentric loading is protective (PMC8432114)
  {
    joint: "elbow",
    label: "Elbow Hyperextension",
    description:
      "Arm too straight on contact — risk of lateral epicondylitis (Jansen et al. 2023)",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "rightElbow",
  },
  {
    joint: "elbow",
    label: "Elbow Excessive Flexion",
    description:
      "Elbow too bent on overhead shots — increased medial ligament stress (Elliott 2006)",
    dangerBelow: 40,
    rampDegrees: 15,
    angleKey: "rightElbow",
  },

  // ── KNEE — ACL, meniscus, patella ──
  // NATA 2018: compliant athletes show 88% ACL injury reduction
  // Elliott 2006: front knee flexion 64.5±9.7° during serve — below 60° is risk zone
  // Neuromuscular training reduces dynamic knee valgus ~12° (PMC12581765)
  {
    joint: "knee",
    label: "Right Knee Hyperextension",
    description:
      "Knee too straight — ligament strain risk. Maintain slight bend (NATA 2018)",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "rightKnee",
  },
  {
    joint: "knee",
    label: "Left Knee Hyperextension",
    description:
      "Knee too straight — ligament strain risk. Maintain slight bend (NATA 2018)",
    dangerAbove: 175,
    rampDegrees: 10,
    angleKey: "leftKnee",
  },
  {
    joint: "knee",
    label: "Deep Knee Bend (Right)",
    description:
      "Excessive knee bend — increased patellar tendon and meniscus load (Elliott 2006)",
    dangerBelow: 60,
    rampDegrees: 20,
    angleKey: "rightKnee",
  },
  {
    joint: "knee",
    label: "Deep Knee Bend (Left)",
    description:
      "Excessive knee bend — increased patellar tendon and meniscus load (Elliott 2006)",
    dangerBelow: 60,
    rampDegrees: 20,
    angleKey: "leftKnee",
  },

  // ── ANKLE — sprains from lateral movement on padel court ──
  // Rivera et al. 2017 (PMC5737043): proprioceptive training reduces sprains RR=0.57
  // Riva et al. 2016: 6-year study — balance programs significantly reduce ankle sprains
  // Schiftan et al. 2015 (JSAMS) meta-analysis confirms protective effect
  {
    joint: "ankle",
    label: "Right Ankle Inversion Risk",
    description:
      "Ankle rolling inward — high sprain risk (Rivera et al. 2017, RR=0.57 with training)",
    dangerBelow: 70,
    rampDegrees: 15,
    angleKey: "rightAnkle",
  },
  {
    joint: "ankle",
    label: "Left Ankle Inversion Risk",
    description:
      "Ankle rolling inward — high sprain risk (Rivera et al. 2017, RR=0.57 with training)",
    dangerBelow: 70,
    rampDegrees: 15,
    angleKey: "leftAnkle",
  },
  {
    joint: "ankle",
    label: "Right Ankle Overextension",
    description:
      "Excessive dorsiflexion — Achilles tendon strain risk during lunges",
    dangerAbove: 160,
    rampDegrees: 15,
    angleKey: "rightAnkle",
  },
  {
    joint: "ankle",
    label: "Left Ankle Overextension",
    description:
      "Excessive dorsiflexion — Achilles tendon strain risk during lunges",
    dangerAbove: 160,
    rampDegrees: 15,
    angleKey: "leftAnkle",
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
