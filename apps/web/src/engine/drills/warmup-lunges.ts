import type { DrillDefinition } from "./types";

export const warmupLunges: DrillDefinition = {
  slug: "warmup-lunges",
  name: "Dynamic Lunges",
  category: "warmup",
  difficulty: "beginner",
  description:
    "Activate your quads, glutes, and hip flexors with alternating forward lunges. This functional warm-up mimics the split-stance movements common in padel and tennis — preparing your legs for quick lateral steps, deep returns, and explosive court coverage.",
  shortDescription: "Fire up quads, glutes and hip flexors for court movement.",
  instructions: [
    "Stand tall with feet together, hands on your hips or in front for balance",
    "Step forward with one leg into a deep lunge position",
    "Lower your back knee toward the ground — front knee stays over your ankle",
    "Keep your torso upright throughout the movement",
    "Push off your front foot to return to the starting position",
    "Alternate legs — aim for 10 lunges per side",
  ],
  thumbnailEmoji: "🏃",
  estimatedDuration: 90,
  phases: [
    {
      name: "Lunge Position",
      description: "Deep lunge with proper knee alignment and upright torso",
      constraints: [
        {
          joint: "leftKnee",
          min: 80,
          max: 120,
          weight: 1.5,
          label: "Front Knee Bend",
          correctionBelow: "Don't go too deep — protect your knee",
          correctionAbove: "Bend your front knee more — go deeper",
        },
        {
          joint: "rightKnee",
          min: 80,
          max: 120,
          weight: 1.5,
          label: "Back Knee Bend",
          correctionBelow: "Don't collapse your back knee to the floor",
          correctionAbove: "Lower your back knee more toward the ground",
        },
        {
          joint: "leftHip",
          min: 70,
          max: 130,
          weight: 1.2,
          label: "Left Hip Angle",
          correctionBelow: "Open your hip angle more",
          correctionAbove: "Deepen the lunge — lower your hips",
        },
        {
          joint: "rightHip",
          min: 70,
          max: 130,
          weight: 1.2,
          label: "Right Hip Angle",
          correctionBelow: "Open your hip angle more",
          correctionAbove: "Deepen the lunge — lower your hips",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.0,
          label: "Torso Upright",
          correctionBelow: "Don't lean forward — keep your chest up",
          correctionAbove: "Slight forward lean is OK — don't lean back",
        },
        {
          joint: "hipWidth",
          min: 0.1,
          max: 0.4,
          weight: 0.8,
          label: "Stance Width",
          correctionBelow: "Step wider for better balance",
          correctionAbove: "Keep feet roughly hip-width apart",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "lu-knees",
      check: (scores) =>
        (scores["Front Knee Bend"] ?? 100) < 60 ||
        (scores["Back Knee Bend"] ?? 100) < 60,
      message: "Both knees to about 90 degrees — front knee over ankle.",
      type: "correction",
      priority: 10,
    },
    {
      id: "lu-torso",
      check: (scores) => (scores["Torso Upright"] ?? 100) < 60,
      message: "Keep your chest up and torso tall during the lunge.",
      type: "correction",
      priority: 8,
    },
    {
      id: "lu-hips",
      check: (scores) =>
        (scores["Left Hip Angle"] ?? 100) < 50 ||
        (scores["Right Hip Angle"] ?? 100) < 50,
      message: "Lower your hips — feel the stretch in your hip flexors.",
      type: "correction",
      priority: 7,
    },
    {
      id: "lu-balance",
      check: (scores) => (scores["Stance Width"] ?? 100) < 50,
      message: "Adjust your stance for better balance.",
      type: "correction",
      priority: 6,
    },
  ],
  scoreWeights: {
    "Front Knee Bend": 1.5,
    "Back Knee Bend": 1.5,
    "Left Hip Angle": 1.2,
    "Right Hip Angle": 1.2,
    "Torso Upright": 1.0,
    "Stance Width": 0.8,
  },
};
