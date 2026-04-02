import { Link } from "react-router-dom";
import { Button } from "./Button";
import { cn } from "@/lib/utils";

interface UpgradeModalProps {
  open: boolean;
  onClose: () => void;
  sessionsUsed: number;
  maxFree: number;
}

export function UpgradeModal({ open, onClose, sessionsUsed, maxFree }: UpgradeModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-gradient-to-b from-brand-950 to-gray-900 border border-white/15 p-8 shadow-2xl animate-scale-in">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/60 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Lock icon */}
        <div className="w-16 h-16 rounded-2xl bg-brand-500/15 border border-brand-500/30 flex items-center justify-center mx-auto mb-5">
          <span className="text-3xl">{"\uD83D\uDD12"}</span>
        </div>

        <h2 className="text-xl font-bold text-white text-center mb-2">
          Weekly Session Limit Reached
        </h2>
        <p className="text-sm text-white/50 text-center mb-6">
          You've used <span className="text-white font-semibold">{sessionsUsed}/{maxFree}</span> free sessions this week.
          Upgrade to Premium for unlimited training.
        </p>

        {/* What you get */}
        <div className="rounded-xl bg-white/5 border border-white/10 p-4 mb-6">
          <p className="text-xs font-semibold text-white/70 uppercase tracking-wider mb-3">Premium includes:</p>
          <ul className="space-y-2">
            {[
              "Unlimited training sessions",
              "AI Coach powered by Claude",
              "Full session history & replay",
              "Personalized warm-up generator",
              "Advanced injury risk analytics",
              "Export health reports (PDF)",
            ].map((f) => (
              <li key={f} className="flex items-center gap-2 text-sm">
                <span className="text-green-400">{"\u2713"}</span>
                <span className="text-white/70">{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Pricing */}
        <div className="text-center mb-6">
          <span className="text-3xl font-black text-white">{"\u20AC"}9.99</span>
          <span className="text-sm text-white/40">/month</span>
          <p className="text-xs text-brand-400 mt-1">{"\u20AC"}79.99/year (save 33%)</p>
        </div>

        {/* CTA */}
        <div className="flex flex-col gap-3">
          <Link to="/pricing" onClick={onClose}>
            <Button className="w-full shadow-lg shadow-brand-500/20" size="lg">
              Upgrade to Premium
            </Button>
          </Link>
          <button
            onClick={onClose}
            className="text-sm text-white/30 hover:text-white/50 transition-colors"
          >
            Continue with free plan
          </button>
        </div>

        <p className="text-xs text-white/20 text-center mt-4">
          14-day free trial {"\u2022"} No credit card required {"\u2022"} Cancel anytime
        </p>
      </div>
    </div>
  );
}

// Session tracking utilities (localStorage-based for demo)
const STORAGE_KEY = "courtcare-free-sessions";

interface WeeklyUsage {
  weekStart: string; // ISO date of Monday
  count: number;
}

function getCurrentWeekStart(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split("T")[0];
}

export function getWeeklySessionCount(): number {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return 0;
    const usage: WeeklyUsage = JSON.parse(stored);
    if (usage.weekStart !== getCurrentWeekStart()) return 0;
    return usage.count;
  } catch {
    return 0;
  }
}

export function incrementSessionCount(): number {
  const weekStart = getCurrentWeekStart();
  let count = getWeeklySessionCount();
  count++;
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ weekStart, count }));
  return count;
}

export const FREE_SESSION_LIMIT = 3;

export function isFreeLimitReached(): boolean {
  return getWeeklySessionCount() >= FREE_SESSION_LIMIT;
}
