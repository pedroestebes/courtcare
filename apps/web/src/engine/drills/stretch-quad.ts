import type { DrillDefinition } from "./types";

export const stretchQuad: DrillDefinition = {
  slug: "stretch-quad",
  name: "Standing Quad Stretch",
  category: "stretching",
  difficulty: "beginner",
  description:
    "Lengthen your quadriceps and hip flexors after intense court movement. Your quads absorb massive forces during split steps, lunges, and directional changes — this stretch prevents tightness that can lead to knee pain and patellar tendinopathy over time.",
  shortDescription: "Lengthen quads and hip flexors to protect your knees.",
  instructions: [
    "Stand on one leg — use a wall for balance if needed",
    "Bend the other knee and grab your ankle behind you",
    "Pull your heel toward your glute gently",
    "Keep your knees close together — don't let the stretching knee flare out",
    "Push your hips slightly forward to deepen the hip flexor stretch",
    "Hold for 30 seconds per leg, then switch",
  ],
  thumbnailEmoji: "🦿",
  estimatedDuration: 90,
  phases: [
    {
      name: "Quad Hold",
      description: "Stand on one leg with opposite heel pulled to glute",
      constraints: [
        {
          joint: "leftKnee",
          min: 30,
          max: 80,
          weight: 1.5,
          label: "Left Knee Bend (Stretch)",
          correctionBelow: "Pull your heel closer to your glute",
          correctionAbove: "Don't force it — ease into the stretch",
        },
        {
          joint: "rightKnee",
          min: 30,
          max: 80,
          weight: 1.5,
          label: "Right Knee Bend (Stretch)",
          correctionBelow: "Pull your heel closer to your glute",
          correctionAbove: "Don't force it — ease into the stretch",
        },
        {
          joint: "leftHip",
          min: 140,
          max: 180,
          weight: 1.2,
          label: "Left Hip Extension",
          correctionBelow: "Push your hip forward slightly",
          correctionAbove: "Good hip extension",
        },
        {
          joint: "rightHip",
          min: 140,
          max: 180,
          weight: 1.2,
          label: "Right Hip Extension",
          correctionBelow: "Push your hip forward slightly",
          correctionAbove: "Good hip extension",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.0,
          label: "Upright Posture",
          correctionBelow: "Stand tall — don't lean forward",
          correctionAbove: "Keep your torso upright",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "sq-knee",
      check: (scores) =>
        (scores["Left Knee Bend (Stretch)"] ?? 100) < 60 ||
        (scores["Right Knee Bend (Stretch)"] ?? 100) < 60,
      message: "Pull your heel closer to your glute — feel the quad stretch.",
      type: "correction",
      priority: 10,
    },
    {
      id: "sq-hip",
      check: (scores) =>
        (scores["Left Hip Extension"] ?? 100) < 60 ||
        (scores["Right Hip Extension"] ?? 100) < 60,
      message: "Push your hips forward to stretch the hip flexor too.",
      type: "correction",
      priority: 8,
    },
    {
      id: "sq-posture",
      check: (scores) => (scores["Upright Posture"] ?? 100) < 60,
      message: "Stand tall — focus on balance and breathing.",
      type: "correction",
      priority: 7,
    },
    {
      id: "sq-good",
      check: (scores) =>
        (scores["Left Knee Bend (Stretch)"] ?? 0) >= 75 &&
        (scores["Upright Posture"] ?? 0) >= 70,
      message: "Perfect hold! Breathe and let the muscle lengthen.",
      type: "encouragement",
      priority: 3,
    },
  ],
  scoreWeights: {
    "Left Knee Bend (Stretch)": 1.5,
    "Right Knee Bend (Stretch)": 1.5,
    "Left Hip Extension": 1.2,
    "Right Hip Extension": 1.2,
    "Upright Posture": 1.0,
  },
};
