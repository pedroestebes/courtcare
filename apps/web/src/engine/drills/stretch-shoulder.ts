import type { DrillDefinition } from "./types";

export const stretchShoulder: DrillDefinition = {
  slug: "stretch-shoulder",
  name: "Cross-Body Shoulder Stretch",
  category: "stretching",
  difficulty: "beginner",
  description:
    "Relieve shoulder tension and improve posterior deltoid flexibility with this essential cool-down stretch. After intense overhead shots like bandejas and smashes, your rotator cuff muscles need this recovery stretch to prevent impingement and maintain healthy shoulder mechanics.",
  shortDescription: "Relieve shoulder tension after overhead shots.",
  instructions: [
    "Stand tall with feet shoulder-width apart",
    "Bring one arm across your chest at shoulder height",
    "Use the opposite hand to gently pull the arm closer to your body",
    "Keep the stretching arm straight — feel the stretch in the back of the shoulder",
    "Hold for 30 seconds, then switch arms",
    "Don't shrug your shoulders — keep them relaxed and down",
  ],
  thumbnailEmoji: "🤸",
  estimatedDuration: 60,
  phases: [
    {
      name: "Cross-Body Hold",
      description: "Arm across chest with gentle pull from opposite hand",
      constraints: [
        {
          joint: "leftShoulder",
          min: 50,
          max: 100,
          weight: 1.5,
          label: "Left Shoulder Stretch",
          correctionBelow: "Bring your arm higher — shoulder level",
          correctionAbove: "Lower your arm to shoulder height",
        },
        {
          joint: "rightShoulder",
          min: 50,
          max: 100,
          weight: 1.5,
          label: "Right Shoulder Stretch",
          correctionBelow: "Bring your arm higher — shoulder level",
          correctionAbove: "Lower your arm to shoulder height",
        },
        {
          joint: "leftElbow",
          min: 140,
          max: 180,
          weight: 1.0,
          label: "Left Arm Extension",
          correctionBelow: "Keep the stretching arm straighter",
          correctionAbove: "Good arm extension",
        },
        {
          joint: "rightElbow",
          min: 140,
          max: 180,
          weight: 1.0,
          label: "Right Arm Extension",
          correctionBelow: "Keep the stretching arm straighter",
          correctionAbove: "Good arm extension",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 0.8,
          label: "Torso Neutral",
          correctionBelow: "Stand upright — don't lean into the stretch",
          correctionAbove: "Keep a neutral posture",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "ss-shoulder",
      check: (scores) =>
        (scores["Left Shoulder Stretch"] ?? 100) < 60 ||
        (scores["Right Shoulder Stretch"] ?? 100) < 60,
      message: "Arm at shoulder height — pull it gently across your chest.",
      type: "correction",
      priority: 10,
    },
    {
      id: "ss-elbow",
      check: (scores) =>
        (scores["Left Arm Extension"] ?? 100) < 60 ||
        (scores["Right Arm Extension"] ?? 100) < 60,
      message: "Keep the stretching arm straight for maximum effect.",
      type: "correction",
      priority: 8,
    },
    {
      id: "ss-posture",
      check: (scores) => (scores["Torso Neutral"] ?? 100) < 60,
      message: "Stay upright — relax your shoulders down and back.",
      type: "correction",
      priority: 6,
    },
  ],
  scoreWeights: {
    "Left Shoulder Stretch": 1.5,
    "Right Shoulder Stretch": 1.5,
    "Left Arm Extension": 1.0,
    "Right Arm Extension": 1.0,
    "Torso Neutral": 0.8,
  },
};
