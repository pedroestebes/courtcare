import type { Landmark } from "@/types/pose";

interface Vec3 {
  x: number;
  y: number;
  z: number;
}

function subtract(a: Vec3, b: Vec3): Vec3 {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function dot(a: Vec3, b: Vec3): number {
  return a.x * b.x + a.y * b.y + a.z * b.z;
}

function magnitude(v: Vec3): number {
  return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
}

function cross(a: Vec3, b: Vec3): Vec3 {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x,
  };
}

/**
 * Calculate the angle at point B formed by points A-B-C in degrees.
 * Uses the 3D coordinates of the landmarks.
 */
export function calculateAngle(a: Landmark, b: Landmark, c: Landmark): number {
  const ba = subtract(a, b);
  const bc = subtract(c, b);

  const magBA = magnitude(ba);
  const magBC = magnitude(bc);
  if (magBA < 1e-6 || magBC < 1e-6) return 0;

  const cosAngle = dot(ba, bc) / (magBA * magBC);
  const clampedCos = Math.max(-1, Math.min(1, cosAngle));

  return (Math.acos(clampedCos) * 180) / Math.PI;
}

/**
 * Calculate the angle of inclination of segment AB relative to the horizontal plane.
 */
export function calculateInclinationAngle(a: Landmark, b: Landmark): number {
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  return (Math.atan2(dy, dx) * 180) / Math.PI;
}

/**
 * Calculate distance between two landmarks in normalized coordinates.
 */
export function landmarkDistance(a: Landmark, b: Landmark): number {
  const d = subtract(a, b);
  return magnitude(d);
}

/**
 * Calculate the midpoint between two landmarks.
 */
export function midpoint(a: Landmark, b: Landmark): Landmark {
  return {
    x: (a.x + b.x) / 2,
    y: (a.y + b.y) / 2,
    z: (a.z + b.z) / 2,
    visibility: Math.min(a.visibility, b.visibility),
  };
}

/**
 * Check if a landmark is sufficiently visible.
 */
export function isVisible(landmark: Landmark, threshold = 0.5): boolean {
  return landmark.visibility >= threshold;
}

/**
 * Calculate the rotation angle around the vertical axis (Y)
 * using two landmarks (e.g. shoulders). Returns degrees.
 */
export function calculateRotation(left: Landmark, right: Landmark): number {
  const dx = right.x - left.x;
  const dz = right.z - left.z;
  return (Math.atan2(dz, dx) * 180) / Math.PI;
}

/**
 * Compute the normal vector of the plane formed by 3 points.
 */
export function planeNormal(a: Landmark, b: Landmark, c: Landmark): Vec3 {
  const ab = subtract(b, a);
  const ac = subtract(c, a);
  const n = cross(ab, ac);
  const mag = magnitude(n);
  if (mag < 1e-8) return { x: 0, y: 1, z: 0 };
  return { x: n.x / mag, y: n.y / mag, z: n.z / mag };
}

export interface JointAngles {
  leftElbow: number;
  rightElbow: number;
  leftShoulder: number;
  rightShoulder: number;
  leftKnee: number;
  rightKnee: number;
  leftHip: number;
  rightHip: number;
  leftAnkle: number;
  rightAnkle: number;
  torsoInclination: number;
  shoulderRotation: number;
  hipWidth: number;
  leftWristHeight: number;
  rightWristHeight: number;
}

/**
 * Extract all relevant joint angles from a set of pose landmarks.
 */
export function extractJointAngles(landmarks: Landmark[]): JointAngles | null {
  if (landmarks.length < 33) return null;

  const lShoulder = landmarks[11];
  const rShoulder = landmarks[12];
  const lElbow = landmarks[13];
  const rElbow = landmarks[14];
  const lWrist = landmarks[15];
  const rWrist = landmarks[16];
  const lHip = landmarks[23];
  const rHip = landmarks[24];
  const lKnee = landmarks[25];
  const rKnee = landmarks[26];
  const lAnkle = landmarks[27];
  const rAnkle = landmarks[28];
  const lHeel = landmarks[29];
  const rHeel = landmarks[30];
  const lFootTip = landmarks[31];
  const rFootTip = landmarks[32];

  const hipMid = midpoint(lHip, rHip);
  const shoulderMid = midpoint(lShoulder, rShoulder);

  // Ankle angle: knee-ankle-foot_tip — measures dorsiflexion/plantarflexion
  // Also use heel for inversion risk: large angle difference between heel-ankle and tip-ankle
  const lAnkleAngle = calculateAngle(lKnee, lAnkle, lFootTip);
  const rAnkleAngle = calculateAngle(rKnee, rAnkle, rFootTip);

  return {
    leftElbow: calculateAngle(lShoulder, lElbow, lWrist),
    rightElbow: calculateAngle(rShoulder, rElbow, rWrist),
    leftShoulder: calculateAngle(lElbow, lShoulder, lHip),
    rightShoulder: calculateAngle(rElbow, rShoulder, rHip),
    leftKnee: calculateAngle(lHip, lKnee, lAnkle),
    rightKnee: calculateAngle(rHip, rKnee, rAnkle),
    leftHip: calculateAngle(lShoulder, lHip, lKnee),
    rightHip: calculateAngle(rShoulder, rHip, rKnee),
    leftAnkle: lAnkleAngle,
    rightAnkle: rAnkleAngle,
    torsoInclination: calculateInclinationAngle(hipMid, shoulderMid),
    shoulderRotation: calculateRotation(lShoulder, rShoulder),
    hipWidth: landmarkDistance(lHip, rHip),
    leftWristHeight: lWrist.y - lShoulder.y,
    rightWristHeight: rWrist.y - rShoulder.y,
  };
}
