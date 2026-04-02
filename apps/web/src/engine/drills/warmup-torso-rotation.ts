import type { DrillDefinition } from "./types";

export const warmupTorsoRotation: DrillDefinition = {
  slug: "warmup-torso-rotation",
  name: "Torso Rotations",
  category: "warmup",
  difficulty: "beginner",
  description:
    "Thoracic spine mobilization following RAMP protocol principles (Jeffreys 2007). The Danish DSSF Guidelines 2023 recommend thoracic mobility work to reduce compensatory shoulder loading. Essential for padel — every shot requires trunk rotation, and lumbar spine is a key injury area (García-González 2020).",
  shortDescription: "Thoracic mobility — DSSF recommended for overhead sports.",
  instructions: [
    "Stand with feet shoulder-width apart, knees slightly bent",
    "Extend arms at chest height, hands together",
    "Rotate upper body to the left — hips stay facing forward",
    "Return to center, then rotate to the right",
    "Move smoothly and controlled — no jerking or bouncing",
    "Perform 15–20 rotations per side, gradually increasing range",
    "Focus on thoracic spine rotation, not lower back twisting",
    "Total time: 60 seconds — part of your RAMP Mobilize phase",
  ],
  thumbnailEmoji: "🔄",
  estimatedDuration: 60,
  phases: [
    {
      name: "Rotation",
      description: "Controlled trunk rotation with stable lower body",
      constraints: [
        {
          joint: "shoulderRotation",
          min: -30,
          max: 30,
          weight: 1.5,
          label: "Shoulder Rotation",
          correctionBelow: "Rotate further to get full range of motion",
          correctionAbove: "Don't over-rotate — keep it controlled",
        },
        {
          joint: "leftShoulder",
          min: 40,
          max: 100,
          weight: 1.0,
          label: "Left Arm Position",
          correctionBelow: "Keep your arms at chest height",
          correctionAbove: "Lower your arms to chest level",
        },
        {
          joint: "rightShoulder",
          min: 40,
          max: 100,
          weight: 1.0,
          label: "Right Arm Position",
          correctionBelow: "Keep your arms at chest height",
          correctionAbove: "Lower your arms to chest level",
        },
        {
          joint: "leftKnee",
          min: 150,
          max: 175,
          weight: 0.8,
          label: "Left Knee Stable",
          correctionBelow: "Keep your legs stable — slight bend only",
          correctionAbove: "Add a slight knee bend for stability",
        },
        {
          joint: "rightKnee",
          min: 150,
          max: 175,
          weight: 0.8,
          label: "Right Knee Stable",
          correctionBelow: "Keep your legs stable — slight bend only",
          correctionAbove: "Add a slight knee bend for stability",
        },
        {
          joint: "torsoInclination",
          min: -100,
          max: -75,
          weight: 1.0,
          label: "Torso Upright",
          correctionBelow: "Stay upright — don't lean forward during rotation",
          correctionAbove: "Don't lean back — keep a neutral spine",
        },
      ],
    },
  ],
  feedbackRules: [
    {
      id: "tr-rotation",
      check: (scores) => (scores["Shoulder Rotation"] ?? 100) < 60,
      message: "Rotate more through your thoracic spine — twist further!",
      type: "correction",
      priority: 10,
    },
    {
      id: "tr-arms",
      check: (scores) =>
        (scores["Left Arm Position"] ?? 100) < 60 ||
        (scores["Right Arm Position"] ?? 100) < 60,
      message: "Keep arms at chest height — they guide the rotation.",
      type: "correction",
      priority: 8,
    },
    {
      id: "tr-torso",
      check: (scores) => (scores["Torso Upright"] ?? 100) < 60,
      message: "Stay tall — rotate, don't lean.",
      type: "correction",
      priority: 7,
    },
    {
      id: "tr-knees",
      check: (scores) =>
        (scores["Left Knee Stable"] ?? 100) < 50 ||
        (scores["Right Knee Stable"] ?? 100) < 50,
      message: "Keep your lower body stable — hips face forward.",
      type: "correction",
      priority: 6,
    },
  ],
  scoreWeights: {
    "Shoulder Rotation": 1.5,
    "Left Arm Position": 1.0,
    "Right Arm Position": 1.0,
    "Left Knee Stable": 0.8,
    "Right Knee Stable": 0.8,
    "Torso Upright": 1.0,
  },
};
