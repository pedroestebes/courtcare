/**
 * Normalize a value within a target range to a 0-100 score.
 * Returns 100 when value is within [min, max], decreasing linearly outside.
 */
export function normalizeToRange(
  value: number,
  min: number,
  max: number,
  falloffDegrees = 30
): number {
  if (value >= min && value <= max) return 100;

  const distanceOutside =
    value < min ? min - value : value - max;

  const score = Math.max(0, 100 - (distanceOutside / falloffDegrees) * 100);
  return Math.round(score * 10) / 10;
}

/**
 * Combine multiple sub-scores with weights into a single overall score.
 */
export function weightedScore(
  scores: Record<string, number>,
  weights: Record<string, number>
): number {
  let totalWeight = 0;
  let totalScore = 0;

  for (const [key, weight] of Object.entries(weights)) {
    if (key in scores) {
      totalWeight += weight;
      totalScore += scores[key] * weight;
    }
  }

  if (totalWeight === 0) return 0;
  return Math.round((totalScore / totalWeight) * 10) / 10;
}

/**
 * Rolling average smoother for temporal score stability.
 */
export class ScoreSmoother {
  private buffer: number[] = [];
  private readonly windowSize: number;

  constructor(windowSize = 10) {
    this.windowSize = windowSize;
  }

  push(score: number): number {
    this.buffer.push(score);
    if (this.buffer.length > this.windowSize) {
      this.buffer.shift();
    }
    return this.getAverage();
  }

  getAverage(): number {
    if (this.buffer.length === 0) return 0;
    const sum = this.buffer.reduce((a, b) => a + b, 0);
    return Math.round((sum / this.buffer.length) * 10) / 10;
  }

  reset(): void {
    this.buffer = [];
  }
}

/**
 * Exponential moving average for smoother transitions.
 */
export class EMAScoreSmoother {
  private value: number | null = null;
  private readonly alpha: number;

  constructor(alpha = 0.3) {
    this.alpha = alpha;
  }

  push(score: number): number {
    if (this.value === null) {
      this.value = score;
    } else {
      this.value = this.alpha * score + (1 - this.alpha) * this.value;
    }
    return Math.round(this.value * 10) / 10;
  }

  get(): number {
    return this.value ?? 0;
  }

  reset(): void {
    this.value = null;
  }
}

/**
 * Detect if a rep has been completed based on score pattern.
 * A rep is counted when score dips below threshold then rises above it.
 */
export class RepCounter {
  private wasBelow = false;
  private count = 0;
  private readonly threshold: number;

  constructor(threshold = 60) {
    this.threshold = threshold;
  }

  update(score: number): boolean {
    if (score < this.threshold) {
      this.wasBelow = true;
      return false;
    }

    if (this.wasBelow && score >= this.threshold) {
      this.wasBelow = false;
      this.count++;
      return true;
    }

    return false;
  }

  getCount(): number {
    return this.count;
  }

  reset(): void {
    this.count = 0;
    this.wasBelow = false;
  }
}
