export type DrillCategory = "fundamentals" | "volleys" | "overhead" | "defense" | "attack" | "warmup" | "stretching";

export type DrillDifficulty = "beginner" | "intermediate" | "advanced";

export interface Drill {
  slug: string;
  name: string;
  category: DrillCategory;
  difficulty: DrillDifficulty;
  description: string;
  shortDescription: string;
  instructions: string[];
  targetAngles: Record<string, { min: number; max: number; label: string }>;
  estimatedDuration: number;
  thumbnailEmoji: string;
}
