import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Start protecting your body",
    features: [
      "3 sessions per week",
      "Real-time pose tracking",
      "Basic injury alerts",
      "2 sports (padel + tennis)",
      "Session history (last 7 days)",
    ],
    notIncluded: [
      "AI Coach chat",
      "Full body health map",
      "Progress tracking",
      "Personalized warm-ups",
      "Unlimited sessions",
    ],
    cta: "Get Started Free",
    href: "/register",
    highlighted: false,
  },
  {
    name: "Premium",
    price: "€9.99",
    period: "/month",
    yearlyPrice: "€79.99/year (save 33%)",
    description: "Complete injury prevention",
    features: [
      "Unlimited sessions",
      "Real-time pose tracking",
      "Advanced injury risk engine",
      "All sports (padel, tennis + more)",
      "Full session history",
      "AI Coach chat (personalized advice)",
      "Interactive body health map",
      "Progress tracking & comparisons",
      "Personalized warm-up generator",
      "Fatigue detection & auto-pause",
      "Play readiness score",
      "Export health reports (PDF)",
    ],
    notIncluded: [],
    cta: "Start 14-Day Free Trial",
    href: "/register",
    highlighted: true,
  },
  {
    name: "Club",
    price: "€99",
    period: "/month",
    description: "For padel & tennis clubs",
    features: [
      "Everything in Premium",
      "Up to 50 athletes",
      "Coach dashboard",
      "Team injury analytics",
      "Custom drill creator",
      "Priority support",
      "Club branding",
    ],
    notIncluded: [],
    cta: "Contact Us",
    href: "/register",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
      {/* Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center justify-between mb-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">CourtCare</span>
          </Link>
          <Link to="/login">
            <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
              Log in
            </Button>
          </Link>
        </nav>
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          Protect your body.{" "}
          <span className="gradient-brand-text">Pick your plan.</span>
        </h1>
        <p className="text-lg text-white/50 max-w-xl mx-auto">
          Start free. Upgrade when you're serious about injury prevention.
          All plans include real-time pose tracking and injury alerts.
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "rounded-2xl p-8 flex flex-col relative",
                plan.highlighted
                  ? "bg-gradient-to-b from-brand-500/15 to-brand-500/5 border-2 border-brand-500/30 shadow-xl shadow-brand-500/10"
                  : "bg-white/5 backdrop-blur-md border border-white/10"
              )}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full gradient-brand text-white text-xs font-bold">
                  Most Popular
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-lg font-bold text-white mb-1">{plan.name}</h3>
                <p className="text-xs text-white/40">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-black text-white">{plan.price}</span>
                <span className="text-sm text-white/40">{plan.period}</span>
                {plan.yearlyPrice && (
                  <p className="text-xs text-brand-400 mt-1">{plan.yearlyPrice}</p>
                )}
              </div>

              <div className="flex-1 mb-6">
                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-green-400 shrink-0 mt-0.5">{"\u2713"}</span>
                      <span className="text-white/70">{f}</span>
                    </li>
                  ))}
                  {plan.notIncluded.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <span className="text-white/20 shrink-0 mt-0.5">{"—"}</span>
                      <span className="text-white/30">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Link to={plan.href}>
                <Button
                  className={cn(
                    "w-full",
                    plan.highlighted
                      ? "shadow-lg shadow-brand-500/20"
                      : ""
                  )}
                  variant={plan.highlighted ? "primary" : "outline"}
                >
                  {plan.cta}
                </Button>
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-white/30 mt-8">
          All plans include a 14-day free trial. No credit card required. Cancel anytime.
        </p>
      </div>
    </div>
  );
}
