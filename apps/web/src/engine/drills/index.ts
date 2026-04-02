import type { DrillDefinition } from "./types";
import { readyPosition } from "./ready-position";
import { forehandVolley } from "./forehand-volley";
import { backhandVolley } from "./backhand-volley";
import { bandeja } from "./bandeja";
import { vibora } from "./vibora";
import { smash } from "./smash";
import { tennisServe } from "./tennis-serve";
import { tennisForehand } from "./tennis-forehand";
import { tennisBackhand } from "./tennis-backhand";
// Warm-up
import { warmupLegSwings } from "./warmup-leg-swings";
import { warmupArmCircles } from "./warmup-arm-circles";
import { warmupLunges } from "./warmup-lunges";
import { warmupTorsoRotation } from "./warmup-torso-rotation";
// Stretching / Cool-down
import { stretchHamstring } from "./stretch-hamstring";
import { stretchShoulder } from "./stretch-shoulder";
import { stretchQuad } from "./stretch-quad";
import { stretchHipFlexor } from "./stretch-hip-flexor";

export const drillRegistry: Record<string, DrillDefinition> = {
  // Padel
  "ready-position": readyPosition,
  "forehand-volley": forehandVolley,
  "backhand-volley": backhandVolley,
  bandeja: bandeja,
  vibora: vibora,
  smash: smash,
  // Tennis
  "tennis-serve": tennisServe,
  "tennis-forehand": tennisForehand,
  "tennis-backhand": tennisBackhand,
  // Warm-up
  "warmup-leg-swings": warmupLegSwings,
  "warmup-arm-circles": warmupArmCircles,
  "warmup-lunges": warmupLunges,
  "warmup-torso-rotation": warmupTorsoRotation,
  // Stretching / Cool-down
  "stretch-hamstring": stretchHamstring,
  "stretch-shoulder": stretchShoulder,
  "stretch-quad": stretchQuad,
  "stretch-hip-flexor": stretchHipFlexor,
};

export const allDrills: DrillDefinition[] = Object.values(drillRegistry);

export function getDrill(slug: string): DrillDefinition | undefined {
  return drillRegistry[slug];
}
