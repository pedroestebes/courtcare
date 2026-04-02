import type { DrillDefinition } from "./types";

export const stretchHipFlexor: DrillDefinition = {
  slug: "stretch-hip-flexor",
  name: "Kneeling Hip Flexor Stretch",
  category: "stretching",
  difficulty: "beginner",
  description:
    "Deep hip flexor stretch targeting the psoas and iliacus — shortened by padel's low ready position (García-González 2020). Tight hip flexors restrict stride length, reduce power generation, and increase lumbar spine stress. ACSM recommends 15–30 second holds with 2–4 repetitions for optimal flexibility gains.",
  shortDescription: "ACSM protocol — deep hip flexor and psoas release.",
  instructions: [
    "Start in a half-kneeling position — one knee on the ground, other foot forward",
    "Keep your front knee at 90°, directly over your ankle",
    "Shift your weight forward gently until you feel the stretch in the back hip",
    "Keep your torso upright and core engaged throughout",
    "Raise the same-side arm as the back knee overhead for a deeper stretch",
    "Hold 30 seconds per side (ACSM guideline)",
    "Repeat 2 times per side — breathe deeply into the stretch",
    "Never force — ease into the stretch progressively over each hold",
  ],
  thumbnailEmoji: "🧎",
  estimatedDuration: 90,
  phases: [
    {
      name: "Half-Kneeling Stretch",
      description: "Deep hip flexor stretch in half-kneeling position",
      constraints: [
        {
          joint: "leftKnee",
          min: 75,
          max: 110,
          weight: 1.5,
          label: "Front Knee Angle",
          correctionBelow: "Don't let your knee go past your toes",
          correctionAbove: "Shift forward more — feel the stretch",
        },
        {
          joint: "rightKnee",
          min: 75,
          max: 110,
          weight: 1.5,
          label: "Back Knee Position",
          correctionBelow: "Adjust your back knee position",
          correctionAbove: "Lower your back knee more",
        },
        {
          joint: "leftHip",
          min: 80,
          max: 140,
          weight: 1.3,
          label: "Left Hip Stretch",
          correctionBelow: "Push your hips forward to deepen the stretch",
          correctionAbove: "Ease back slightly — don't overstretch",
        },
        {
          joint: "rightHip",
          min: 80,
          max: 140,
          weight: 1.3,
          label: "Right Hip Stretch",
          correctionBelow: "Push your hips forward to deepen the stretch",
          correctionAbove: "Ease back slightly — don't overstretch",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.0,
          label: "Torso Tall",
          correctionBelow: "Stay upright — don't fold forward",
          correctionAbove: "Keep your chest lifted",
        },
        {
          joint: "leftShoulder",
          min: 30,
          max: 170,
          weight: 0.6,
          label: "Arm Reach",
          correctionBelow: "Raise your arm overhead for a deeper stretch",
          correctionAbove: "Good arm position",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "hf-knee",
      check: (scores) =>
        (scores["Front Knee Angle"] ?? 100) < 60 ||
        (scores["Back Knee Position"] ?? 100) < 60,
      message: "Front knee at 90° over your ankle — adjust your stance.",
      type: "correction",
      priority: 10,
    },
    {
      id: "hf-hips",
      check: (scores) =>
        (scores["Left Hip Stretch"] ?? 100) < 60 ||
        (scores["Right Hip Stretch"] ?? 100) < 60,
      message: "Shift your hips forward — feel the stretch in the hip flexor.",
      type: "correction",
      priority: 9,
    },
    {
      id: "hf-torso",
      check: (scores) => (scores["Torso Tall"] ?? 100) < 60,
      message: "Stay tall through your spine — engage your core.",
      type: "correction",
      priority: 7,
    },
    {
      id: "hf-good",
      check: (scores) =>
        (scores["Left Hip Stretch"] ?? 0) >= 70 &&
        (scores["Torso Tall"] ?? 0) >= 70,
      message: "Beautiful stretch! Hold it and breathe deeply.",
      type: "encouragement",
      priority: 3,
    },
  ],
  scoreWeights: {
    "Front Knee Angle": 1.5,
    "Back Knee Position": 1.5,
    "Left Hip Stretch": 1.3,
    "Right Hip Stretch": 1.3,
    "Torso Tall": 1.0,
    "Arm Reach": 0.6,
  },
};
