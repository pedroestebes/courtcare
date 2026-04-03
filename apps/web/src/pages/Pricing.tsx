import { useState } from "react";
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
      "Padel drills & warm-ups",
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
      "All padel drills, warm-ups & cool-downs",
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
    description: "For padel clubs & academies",
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
    href: "mailto:hello@courtcare.com",
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

        {/* FAQ Section */}
        <div className="mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-white/40 mb-10 max-w-lg mx-auto">
            Everything you need to know about CourtCare.
          </p>

          <FAQSection />
        </div>

        {/* Money-back guarantee */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/5 border border-white/10">
            <span className="text-3xl">{"\uD83D\uDEE1\uFE0F"}</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-white">30-Day Money-Back Guarantee</p>
              <p className="text-xs text-white/40">Not satisfied? Full refund, no questions asked.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const faqs = [
  {
    q: "Do I need any special equipment?",
    a: "No. CourtCare uses your phone or laptop camera — no wearables, sensors, or special equipment needed. Just position your device so it can see your full body and start training.",
  },
  {
    q: "How accurate is the injury detection?",
    a: "CourtCare tracks 33 body landmarks at 30fps using Google's MediaPipe technology (validated at r=0.91 vs. gold-standard motion capture). We monitor 12 sport-specific injury risk factors across shoulder, elbow, knee, and ankle — informed by peer-reviewed biomechanics research.",
  },
  {
    q: "What sports are supported?",
    a: "CourtCare is built exclusively for padel with 12 activities — 4 padel technique drills, 4 warm-ups (RAMP protocol), and 4 cool-down stretches (ACSM guidelines). Each has specialized injury thresholds informed by sports medicine research.",
  },
  {
    q: "Can I use CourtCare during real matches?",
    a: "CourtCare is designed for training and practice sessions where you can position your camera. For matches, use the Health Dashboard before playing to check your body readiness and get a personalized warm-up.",
  },
  {
    q: "How does the AI Coach work?",
    a: "The AI Coach analyzes your session history, body map data, and injury risk patterns to provide personalized advice. It can recommend training plans, warm-ups, and tell you when it's safe to play.",
  },
  {
    q: "Is my data private?",
    a: "Yes. All pose detection happens locally in your browser — no video is ever uploaded to our servers. Only anonymized session metrics (scores, joint angles) are stored for your progress tracking.",
  },
];

function FAQSection() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-2xl mx-auto space-y-2">
      {faqs.map((faq, i) => (
        <button
          key={i}
          onClick={() => setOpen(open === i ? null : i)}
          className="w-full text-left rounded-xl bg-white/5 border border-white/10 hover:bg-white/8 transition-colors"
        >
          <div className="flex items-center justify-between px-5 py-4">
            <span className="text-sm font-medium text-white pr-4">{faq.q}</span>
            <svg
              className={cn("w-5 h-5 text-white/40 shrink-0 transition-transform duration-200", open === i && "rotate-180")}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
          </div>
          {open === i && (
            <div className="px-5 pb-4">
              <p className="text-sm text-white/50 leading-relaxed">{faq.a}</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
}
