import type { FeedbackMessage } from "@/types/session";

export interface FeedbackRule {
  id: string;
  check: (scores: Record<string, number>) => boolean;
  message: string;
  type: FeedbackMessage["type"];
  priority: number;
}

let messageIdCounter = 0;

function generateId(): string {
  return `fb-${++messageIdCounter}-${Date.now()}`;
}

/**
 * Evaluate feedback rules against current scores and return active messages.
 */
export function evaluateFeedback(
  rules: FeedbackRule[],
  scores: Record<string, number>
): FeedbackMessage[] {
  const messages: FeedbackMessage[] = [];

  for (const rule of rules) {
    if (rule.check(scores)) {
      messages.push({
        id: generateId(),
        text: rule.message,
        type: rule.type,
        priority: rule.priority,
        timestamp: Date.now(),
      });
    }
  }

  return messages.sort((a, b) => b.priority - a.priority);
}

/**
 * Throttle feedback so the same message doesn't appear too frequently.
 */
export class FeedbackThrottler {
  private lastShown: Map<string, number> = new Map();
  private readonly cooldownMs: number;

  constructor(cooldownMs = 3000) {
    this.cooldownMs = cooldownMs;
  }

  filter(messages: FeedbackMessage[]): FeedbackMessage[] {
    const now = Date.now();
    const filtered: FeedbackMessage[] = [];

    for (const msg of messages) {
      const key = msg.text;
      const lastTime = this.lastShown.get(key) ?? 0;

      if (now - lastTime >= this.cooldownMs) {
        filtered.push(msg);
        this.lastShown.set(key, now);
      }
    }

    return filtered;
  }

  reset(): void {
    this.lastShown.clear();
  }
}

/**
 * Generate encouragement messages based on overall score.
 */
export function getEncouragement(overallScore: number): FeedbackMessage | null {
  if (overallScore >= 95) {
    return {
      id: generateId(),
      text: "Perfect form! Outstanding!",
      type: "encouragement",
      priority: 1,
      timestamp: Date.now(),
    };
  }
  if (overallScore >= 85) {
    return {
      id: generateId(),
      text: "Great form! Keep it up!",
      type: "encouragement",
      priority: 1,
      timestamp: Date.now(),
    };
  }
  if (overallScore >= 70) {
    return {
      id: generateId(),
      text: "Good effort! Small adjustments needed.",
      type: "info",
      priority: 1,
      timestamp: Date.now(),
    };
  }
  return null;
}

/**
 * Limit feedback to the top N most important messages.
 */
export function topNFeedback(
  messages: FeedbackMessage[],
  n = 3
): FeedbackMessage[] {
  return messages.slice(0, n);
}
