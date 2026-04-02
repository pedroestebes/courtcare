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
};

export const allDrills: DrillDefinition[] = Object.values(drillRegistry);

export function getDrill(slug: string): DrillDefinition | undefined {
  return drillRegistry[slug];
}
