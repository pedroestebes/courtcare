import { cn } from "@/lib/utils";
import type { BodyZone } from "./BodyMap";

interface WarmupExercise {
  name: string;
  sets: string;
  target: string;
  icon: string;
}

const exercisesByZone: Record<string, WarmupExercise[]> = {
  shoulder: [
    { name: "Band Pull-Aparts", sets: "2 × 15", target: "Rotator cuff", icon: "\uD83E\uDD4F" },
    { name: "Arm Circles", sets: "30s each direction", target: "Shoulder mobility", icon: "\uD83D\uDD04" },
    { name: "Wall Slides", sets: "2 × 10", target: "Scapular control", icon: "\uD83E\uDDF1" },
  ],
  elbow: [
    { name: "Wrist Flexor Stretch", sets: "30s each arm", target: "Forearm flexibility", icon: "\u270B" },
    { name: "Pronation/Supination", sets: "2 × 15", target: "Forearm strength", icon: "\uD83D\uDCAA" },
  ],
  knee: [
    { name: "Bodyweight Squats", sets: "2 × 12", target: "Quad activation", icon: "\uD83E\uDDB5" },
    { name: "Leg Swings", sets: "15 each leg", target: "Hip flexor warmup", icon: "\uD83E\uDDB6" },
  ],
  back: [
    { name: "Cat-Cow Stretch", sets: "10 reps", target: "Spinal mobility", icon: "\uD83D\uDC31" },
    { name: "Dead Bug", sets: "2 × 10 each side", target: "Core stability", icon: "\uD83D\uDC1B" },
    { name: "Bird Dog", sets: "2 × 8 each side", target: "Lower back strength", icon: "\uD83D\uDC26" },
  ],
  hip: [
    { name: "Hip Circles", sets: "10 each direction", target: "Hip mobility", icon: "\uD83D\uDD04" },
    { name: "Clamshells", sets: "2 × 12 each side", target: "Glute activation", icon: "\uD83D\uDC1A" },
  ],
  general: [
    { name: "Light Jog / High Knees", sets: "2 min", target: "General warmup", icon: "\uD83C\uDFC3" },
    { name: "Dynamic Lunges", sets: "10 each leg", target: "Full body activation", icon: "\u26A1" },
  ],
};

function getWarmup(zones: BodyZone[]): WarmupExercise[] {
  const exercises: WarmupExercise[] = [...exercisesByZone.general];

  const watchZones = zones.filter((z) => z.status === "watch" || z.status === "injured");

  for (const zone of watchZones) {
    const area = zone.area.toLowerCase();
    if (area.includes("shoulder")) exercises.push(...exercisesByZone.shoulder);
    if (area.includes("elbow")) exercises.push(...exercisesByZone.elbow);
    if (area.includes("knee")) exercises.push(...exercisesByZone.knee);
    if (area.includes("back") || area.includes("spine")) exercises.push(...exercisesByZone.back);
    if (area.includes("hip")) exercises.push(...exercisesByZone.hip);
  }

  // If everything is healthy, add quick shoulder + knee warmup
  if (watchZones.length === 0) {
    exercises.push(exercisesByZone.shoulder[1]); // Arm circles
    exercises.push(exercisesByZone.knee[0]); // Squats
  }

  return exercises;
}

export function WarmupCard({ zones, className }: { zones: BodyZone[]; className?: string }) {
  const exercises = getWarmup(zones);
  const watchAreas = zones.filter((z) => z.status !== "healthy");
  const totalTime = exercises.length * 1.5; // ~1.5 min per exercise

  return (
    <div className={cn("rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Today's Warm-Up</h3>
          <p className="text-xs text-white/30 mt-0.5">
            {watchAreas.length > 0
              ? `Personalized for your ${watchAreas.map((z) => z.area.toLowerCase()).join(", ")}`
              : "General court readiness warm-up"}
          </p>
        </div>
        <span className="text-xs text-brand-400 font-medium">~{Math.round(totalTime)} min</span>
      </div>

      <div className="space-y-2">
        {exercises.map((ex, i) => (
          <div
            key={`${ex.name}-${i}`}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-white/3 border border-white/5 hover:bg-white/5 transition-colors"
          >
            <span className="text-lg w-8 text-center">{ex.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-white font-medium">{ex.name}</p>
              <p className="text-xs text-white/30">{ex.target}</p>
            </div>
            <span className="text-xs text-white/50 font-mono shrink-0">{ex.sets}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
