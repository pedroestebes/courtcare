import type { DrillDefinition } from "./types";
import { readyPosition } from "./ready-position";
import { forehandVolley } from "./forehand-volley";
import { backhandVolley } from "./backhand-volley";
import { bandeja } from "./bandeja";
import { vibora } from "./vibora";
import { smash } from "./smash";

export const drillRegistry: Record<string, DrillDefinition> = {
  "ready-position": readyPosition,
  "forehand-volley": forehandVolley,
  "backhand-volley": backhandVolley,
  bandeja: bandeja,
  vibora: vibora,
  smash: smash,
};

export const allDrills: DrillDefinition[] = Object.values(drillRegistry);

export function getDrill(slug: string): DrillDefinition | undefined {
  return drillRegistry[slug];
}
