import type { DrillDefinition } from "./types";

export const stretchHamstring: DrillDefinition = {
  slug: "stretch-hamstring",
  name: "Standing Hamstring Stretch",
  category: "stretching",
  difficulty: "beginner",
  description:
    "Release tension in your hamstrings and lower back with this essential post-match stretch. Tight hamstrings are the #1 contributor to lower back pain in racket sport athletes. Hold each side for 30 seconds, breathing deeply to deepen the stretch progressively.",
  shortDescription: "Release hamstring tension to protect your lower back.",
  instructions: [
    "Stand tall, then extend one leg forward with the heel on the ground",
    "Keep the extended leg straight with toes pointing up",
    "Hinge at the hips and lean your torso forward slowly",
    "Reach toward your toes — feel the stretch behind the extended leg",
    "Keep your back flat, not rounded — hinge from the hips",
    "Hold for 30 seconds per side, breathing deeply",
  ],
  thumbnailEmoji: "🧘",
  estimatedDuration: 90,
  phases: [
    {
      name: "Forward Fold",
      description: "Hinge forward at hips with one leg extended",
      constraints: [
        {
          joint: "torsoInclination",
          min: -70,
          max: -30,
          weight: 1.5,
          label: "Forward Lean",
          correctionBelow: "Lean further forward — hinge at the hips",
          correctionAbove: "You're leaning too far — maintain a flat back",
        },
        {
          joint: "leftKnee",
          min: 155,
          max: 180,
          weight: 1.2,
          label: "Left Leg Straight",
          correctionBelow: "Straighten your left leg for a deeper stretch",
          correctionAbove: "Good leg extension",
        },
        {
          joint: "rightKnee",
          min: 155,
          max: 180,
          weight: 1.2,
          label: "Right Leg Straight",
          correctionBelow: "Straighten your right leg for a deeper stretch",
          correctionAbove: "Good leg extension",
        },
        {
          joint: "leftHip",
          min: 60,
          max: 140,
          weight: 1.0,
          label: "Left Hip Hinge",
          correctionBelow: "Hinge more from your hip joint",
          correctionAbove: "Ease up slightly — don't force it",
        },
        {
          joint: "rightHip",
          min: 60,
          max: 140,
          weight: 1.0,
          label: "Right Hip Hinge",
          correctionBelow: "Hinge more from your hip joint",
          correctionAbove: "Ease up slightly — don't force it",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "sh-lean",
      check: (scores) => (scores["Forward Lean"] ?? 100) < 60,
      message: "Hinge from your hips — lean forward with a flat back.",
      type: "correction",
      priority: 10,
    },
    {
      id: "sh-knees",
      check: (scores) =>
        (scores["Left Leg Straight"] ?? 100) < 60 ||
        (scores["Right Leg Straight"] ?? 100) < 60,
      message: "Keep the stretching leg straight — no bending the knee.",
      type: "correction",
      priority: 8,
    },
    {
      id: "sh-breathe",
      check: (scores) =>
        (scores["Forward Lean"] ?? 0) >= 70 &&
        (scores["Left Leg Straight"] ?? 0) >= 70,
      message: "Great position! Breathe deeply to deepen the stretch.",
      type: "encouragement",
      priority: 3,
    },
  ],
  scoreWeights: {
    "Forward Lean": 1.5,
    "Left Leg Straight": 1.2,
    "Right Leg Straight": 1.2,
    "Left Hip Hinge": 1.0,
    "Right Hip Hinge": 1.0,
  },
};
