import type { DrillDefinition } from "./types";

export const warmupArmCircles: DrillDefinition = {
  slug: "warmup-arm-circles",
  name: "Shoulder Activation",
  category: "warmup",
  difficulty: "beginner",
  description:
    "Progressive shoulder activation following the Thrower's Ten protocol principles (Wilk et al., validated in PMC12633846). Increases synovial fluid in the shoulder joint and prepares the rotator cuff for overhead shots — the Bern Consensus Statement 2022 identifies shoulder load management as key to injury prevention in overhead sports.",
  shortDescription: "Rotator cuff activation — Bern Consensus protocol.",
  instructions: [
    "Stand with feet hip-width apart, arms extended to the sides at shoulder height",
    "Begin making small circles with both arms — 10 forward, 10 backward",
    "Gradually increase circle size over 15 seconds",
    "Add external rotation: elbows bent 90°, rotate forearms outward (5 reps)",
    "Keep your core engaged and torso still — only the arms move",
    "Finish with 5 large, slow circles in each direction",
    "Total time: 60 seconds — part of your RAMP Activate phase",
  ],
  thumbnailEmoji: "💪",
  estimatedDuration: 60,
  phases: [
    {
      name: "Arms Extended",
      description: "Hold arms at shoulder height while making circles",
      constraints: [
        {
          joint: "leftShoulder",
          min: 70,
          max: 120,
          weight: 1.5,
          label: "Left Shoulder Lift",
          correctionBelow: "Raise your left arm higher — shoulder height",
          correctionAbove: "Lower your left arm to shoulder level",
        },
        {
          joint: "rightShoulder",
          min: 70,
          max: 120,
          weight: 1.5,
          label: "Right Shoulder Lift",
          correctionBelow: "Raise your right arm higher — shoulder height",
          correctionAbove: "Lower your right arm to shoulder level",
        },
        {
          joint: "leftElbow",
          min: 150,
          max: 180,
          weight: 1.0,
          label: "Left Arm Straight",
          correctionBelow: "Straighten your left arm more",
          correctionAbove: "Good extension",
        },
        {
          joint: "rightElbow",
          min: 150,
          max: 180,
          weight: 1.0,
          label: "Right Arm Straight",
          correctionBelow: "Straighten your right arm more",
          correctionAbove: "Good extension",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 0.8,
          label: "Core Stability",
          correctionBelow: "Don't lean forward — keep your core tight",
          correctionAbove: "Don't lean back — stay neutral",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "ac-shoulders",
      check: (scores) =>
        (scores["Left Shoulder Lift"] ?? 100) < 60 ||
        (scores["Right Shoulder Lift"] ?? 100) < 60,
      message: "Arms up to shoulder height! Keep them parallel to the ground.",
      type: "correction",
      priority: 10,
    },
    {
      id: "ac-elbows",
      check: (scores) =>
        (scores["Left Arm Straight"] ?? 100) < 60 ||
        (scores["Right Arm Straight"] ?? 100) < 60,
      message: "Keep your arms straight — don't bend at the elbows.",
      type: "correction",
      priority: 8,
    },
    {
      id: "ac-core",
      check: (scores) => (scores["Core Stability"] ?? 100) < 60,
      message: "Engage your core — only your arms should be moving.",
      type: "correction",
      priority: 6,
    },
  ],
  scoreWeights: {
    "Left Shoulder Lift": 1.5,
    "Right Shoulder Lift": 1.5,
    "Left Arm Straight": 1.0,
    "Right Arm Straight": 1.0,
    "Core Stability": 0.8,
  },
};
