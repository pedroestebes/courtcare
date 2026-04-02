import type { DrillDefinition } from "./types";
// Performance — core padel drills
import { readyPosition } from "./ready-position";
import { forehandVolley } from "./forehand-volley";
import { backhandVolley } from "./backhand-volley";
import { bandeja } from "./bandeja";
// Prevention — warm-up before playing
import { warmupLegSwings } from "./warmup-leg-swings";
import { warmupArmCircles } from "./warmup-arm-circles";
import { warmupLunges } from "./warmup-lunges";
import { warmupTorsoRotation } from "./warmup-torso-rotation";
// Recovery — cool-down stretches after playing
import { stretchHamstring } from "./stretch-hamstring";
import { stretchShoulder } from "./stretch-shoulder";
import { stretchQuad } from "./stretch-quad";
import { stretchHipFlexor } from "./stretch-hip-flexor";

export const drillRegistry: Record<string, DrillDefinition> = {
  // Performance — padel technique
  "ready-position": readyPosition,
  "forehand-volley": forehandVolley,
  "backhand-volley": backhandVolley,
  bandeja: bandeja,
  // Prevention — warm-up
  "warmup-leg-swings": warmupLegSwings,
  "warmup-arm-circles": warmupArmCircles,
  "warmup-lunges": warmupLunges,
  "warmup-torso-rotation": warmupTorsoRotation,
  // Recovery — cool-down
  "stretch-hamstring": stretchHamstring,
  "stretch-shoulder": stretchShoulder,
  "stretch-quad": stretchQuad,
  "stretch-hip-flexor": stretchHipFlexor,
};

export const allDrills: DrillDefinition[] = Object.values(drillRegistry);

export function getDrill(slug: string): DrillDefinition | undefined {
  return drillRegistry[slug];
}
