import type { DrillDefinition } from "./types";

export const readyPosition: DrillDefinition = {
  slug: "ready-position",
  name: "Ready Position",
  category: "fundamentals",
  difficulty: "beginner",
  description:
    "The foundation of every padel shot. Master the athletic ready position to react faster and move more efficiently on the court. Feet shoulder-width apart, knees bent, weight on the balls of your feet, racket up in front of your body.",
  shortDescription: "Master the athletic stance that powers every shot.",
  instructions: [
    "Stand with feet shoulder-width apart, toes pointing slightly outward",
    "Bend your knees to about 130-150 degrees — stay low and athletic",
    "Keep your torso upright with a slight forward lean",
    "Hold the racket at chest height with both hands, elbows relaxed",
    "Distribute weight evenly on the balls of your feet",
    "Keep your eyes forward, shoulders relaxed but engaged",
  ],
  thumbnailEmoji: "\uD83E\uDDD1\u200D\uD83C\uDFCB\uFE0F",
  estimatedDuration: 60,
  phases: [
    {
      name: "Ready Stance",
      description: "Hold the athletic ready position",
      constraints: [
        {
          joint: "leftKnee",
          min: 125,
          max: 155,
          weight: 1.5,
          label: "Left Knee Bend",
          correctionBelow: "Straighten your left leg a bit — too deep",
          correctionAbove: "Bend your left knee more — get lower",
        },
        {
          joint: "rightKnee",
          min: 125,
          max: 155,
          weight: 1.5,
          label: "Right Knee Bend",
          correctionBelow: "Straighten your right leg a bit — too deep",
          correctionAbove: "Bend your right knee more — get lower",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.0,
          label: "Torso Upright",
          correctionBelow: "You're leaning too far forward",
          correctionAbove: "Lean forward slightly — stay athletic",
        },
        {
          joint: "leftElbow",
          min: 80,
          max: 140,
          weight: 0.8,
          label: "Left Arm Position",
          correctionBelow: "Relax your left arm a bit",
          correctionAbove: "Bring your left arm closer to your body",
        },
        {
          joint: "rightElbow",
          min: 80,
          max: 140,
          weight: 0.8,
          label: "Right Arm Position",
          correctionBelow: "Relax your right arm a bit",
          correctionAbove: "Bring your right arm closer to your body",
        },
        {
          joint: "hipWidth",
          min: 0.15,
          max: 0.35,
          weight: 1.0,
          label: "Stance Width",
          correctionBelow: "Widen your stance — feet shoulder-width apart",
          correctionAbove: "Narrow your stance a bit — too wide",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "rp-knees",
      check: (scores) =>
        (scores["Left Knee Bend"] ?? 100) < 60 ||
        (scores["Right Knee Bend"] ?? 100) < 60,
      message: "Bend your knees more! Stay low and athletic.",
      type: "correction",
      priority: 10,
    },
    {
      id: "rp-torso",
      check: (scores) => (scores["Torso Upright"] ?? 100) < 60,
      message: "Keep your torso upright with a slight forward lean.",
      type: "correction",
      priority: 8,
    },
    {
      id: "rp-stance",
      check: (scores) => (scores["Stance Width"] ?? 100) < 60,
      message: "Adjust your stance width — feet shoulder-width apart.",
      type: "correction",
      priority: 7,
    },
    {
      id: "rp-arms",
      check: (scores) =>
        (scores["Left Arm Position"] ?? 100) < 50 ||
        (scores["Right Arm Position"] ?? 100) < 50,
      message: "Hold the racket up at chest height, elbows relaxed.",
      type: "correction",
      priority: 6,
    },
  ],
  scoreWeights: {
    "Left Knee Bend": 1.5,
    "Right Knee Bend": 1.5,
    "Torso Upright": 1.0,
    "Left Arm Position": 0.8,
    "Right Arm Position": 0.8,
    "Stance Width": 1.0,
  },
};
