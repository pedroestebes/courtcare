import type { DrillDefinition } from "./types";

export const warmupLegSwings: DrillDefinition = {
  slug: "warmup-leg-swings",
  name: "Dynamic Leg Swings",
  category: "warmup",
  difficulty: "beginner",
  description:
    "Activate your hip flexors, hamstrings, and glutes with controlled forward-backward leg swings. This dynamic warm-up increases range of motion and blood flow to the legs — essential before any court sport to prevent hamstring and groin strains.",
  shortDescription: "Activate hips and hamstrings with controlled leg swings.",
  instructions: [
    "Stand tall on one leg, holding a wall or chair for balance if needed",
    "Swing the opposite leg forward and backward in a controlled pendulum motion",
    "Keep your torso upright — don't lean forward or backward",
    "Gradually increase the range of motion with each swing",
    "Perform 15–20 swings per leg, then switch sides",
    "Keep the standing leg slightly bent for stability",
  ],
  thumbnailEmoji: "🦵",
  estimatedDuration: 90,
  phases: [
    {
      name: "Forward Swing",
      description: "Swing leg forward with control — hip opens, knee stays soft",
      constraints: [
        {
          joint: "leftHip",
          min: 50,
          max: 110,
          weight: 1.5,
          label: "Left Hip Range",
          correctionBelow: "Swing your leg higher — open the hip more",
          correctionAbove: "Control the swing — don't overextend",
        },
        {
          joint: "rightHip",
          min: 50,
          max: 110,
          weight: 1.5,
          label: "Right Hip Range",
          correctionBelow: "Swing your leg higher — open the hip more",
          correctionAbove: "Control the swing — don't overextend",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.2,
          label: "Torso Upright",
          correctionBelow: "You're leaning too far forward — stand tall",
          correctionAbove: "Slight forward lean is fine — don't lean back",
        },
        {
          joint: "leftKnee",
          min: 150,
          max: 180,
          weight: 0.8,
          label: "Standing Leg Stability",
          correctionBelow: "Keep your standing leg straighter",
          correctionAbove: "Slight knee bend is fine",
        },
        {
          joint: "rightKnee",
          min: 150,
          max: 180,
          weight: 0.8,
          label: "Swing Leg Extension",
          correctionBelow: "Extend your swinging leg more",
          correctionAbove: "Good leg extension",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "ls-hips",
      check: (scores) =>
        (scores["Left Hip Range"] ?? 100) < 60 ||
        (scores["Right Hip Range"] ?? 100) < 60,
      message: "Swing wider! Open those hips with each rep.",
      type: "correction",
      priority: 10,
    },
    {
      id: "ls-torso",
      check: (scores) => (scores["Torso Upright"] ?? 100) < 60,
      message: "Keep your torso upright — don't lean with the swing.",
      type: "correction",
      priority: 8,
    },
    {
      id: "ls-balance",
      check: (scores) => (scores["Standing Leg Stability"] ?? 100) < 50,
      message: "Stabilize your standing leg — use a wall for support if needed.",
      type: "correction",
      priority: 7,
    },
  ],
  scoreWeights: {
    "Left Hip Range": 1.5,
    "Right Hip Range": 1.5,
    "Torso Upright": 1.2,
    "Standing Leg Stability": 0.8,
    "Swing Leg Extension": 0.8,
  },
};
