import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type Intensity = "light" | "moderate" | "intense";
type Duration = "30" | "60" | "90" | "120";
type PainArea = "shoulder" | "elbow" | "knee" | "ankle" | "back" | "none";

const intensityOptions: { key: Intensity; label: string; emoji: string; description: string }[] = [
  { key: "light", label: "Light", emoji: "\uD83D\uDFE2", description: "Easy rally, casual play" },
  { key: "moderate", label: "Moderate", emoji: "\uD83D\uDFE1", description: "Competitive match, good workout" },
  { key: "intense", label: "Intense", emoji: "\uD83D\uDD34", description: "Tournament play, full effort" },
];

const durationOptions: { key: Duration; label: string }[] = [
  { key: "30", label: "30 min" },
  { key: "60", label: "1 hour" },
  { key: "90", label: "1.5 hours" },
  { key: "120", label: "2+ hours" },
];

const painOptions: { key: PainArea; label: string; emoji: string }[] = [
  { key: "none", label: "No pain", emoji: "\u2705" },
  { key: "shoulder", label: "Shoulder", emoji: "\uD83E\uDDB4" },
  { key: "elbow", label: "Elbow", emoji: "\uD83D\uDCAA" },
  { key: "knee", label: "Knee", emoji: "\uD83E\uDDBF" },
  { key: "ankle", label: "Ankle", emoji: "\uD83E\uDDB6" },
  { key: "back", label: "Lower back", emoji: "\uD83E\uDEB4" },
];

/** Map pain area + intensity to recommended stretch drills */
function getRecommendedDrills(pain: PainArea[], intensity: Intensity, duration: Duration): { slug: string; reason: string }[] {
  const drills: { slug: string; reason: string }[] = [];

  // Always recommend hamstring stretch — ACSM guidelines, 30-sec holds
  drills.push({ slug: "stretch-hamstring", reason: "ACSM protocol: 30-sec holds to maintain hamstring ROM after court play" });

  // Shoulder focus — Bern Consensus 2022 + DSSF 2023
  if (pain.includes("shoulder") || intensity === "intense") {
    drills.push({ slug: "stretch-shoulder", reason: pain.includes("shoulder") ? "Posterior capsule stretch — DSSF recommended for shoulder pain" : "Bern Consensus: release rotator cuff after overhead shots" });
  }

  // Hip flexor — García-González 2020: low ready position tightens hip flexors
  if (intensity !== "light" || parseInt(duration) >= 60) {
    drills.push({ slug: "stretch-hip-flexor", reason: "García-González 2020: padel's ready position shortens hip flexors" });
  }

  // Ankle focus — Rivera et al. 2017: proprioceptive training reduces ankle sprains by 43%
  if (pain.includes("ankle")) {
    drills.push({ slug: "stretch-quad", reason: "Rivera 2017: single-leg balance training reduces ankle sprain risk by 43% — quad stretch doubles as proprioceptive exercise" });
    if (!drills.some(d => d.slug === "stretch-hip-flexor")) {
      drills.push({ slug: "stretch-hip-flexor", reason: "Hip flexor mobility improves ankle dorsiflexion and lateral movement mechanics" });
    }
  } else {
    // Quad stretch + proprioceptive balance — Rivera et al. 2017
    drills.push({ slug: "stretch-quad", reason: "ACSM stretch + balance training (Rivera 2017: 43% ankle sprain reduction)" });
  }

  return drills;
}

export function Recovery() {
  const navigate = useNavigate();
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [intensity, setIntensity] = useState<Intensity | null>(null);
  const [duration, setDuration] = useState<Duration | null>(null);
  const [painAreas, setPainAreas] = useState<PainArea[]>([]);

  const togglePain = (area: PainArea) => {
    if (area === "none") {
      setPainAreas(["none"]);
      return;
    }
    setPainAreas((prev) => {
      const filtered = prev.filter((p) => p !== "none");
      return filtered.includes(area) ? filtered.filter((p) => p !== area) : [...filtered, area];
    });
  };

  const recommendations =
    intensity && duration ? getRecommendedDrills(painAreas, intensity, duration) : [];

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link to="/drills" className="text-sm text-white/40 hover:text-white/60 mb-4 inline-flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
              Back to drills
            </Link>
            <h1 className="text-2xl font-bold text-white mt-2">Post-Match Recovery</h1>
            <p className="text-white/50 mt-1">
              Tell us about your session and we'll build your cool-down.
            </p>
          </div>

          {/* Progress indicator */}
          <div className="flex items-center gap-2 mb-8">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={cn(
                  "h-1.5 flex-1 rounded-full transition-all duration-300",
                  s <= step ? "bg-cyan-500" : "bg-white/10"
                )}
              />
            ))}
          </div>

          {/* Step 1: How intense? */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">How intense was your session?</h2>
              <div className="space-y-3">
                {intensityOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setIntensity(opt.key); setStep(2); }}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition-all duration-200 hover:bg-white/8",
                      intensity === opt.key
                        ? "bg-cyan-500/15 border-cyan-500/30"
                        : "bg-white/5 border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{opt.emoji}</span>
                      <div>
                        <p className="text-sm font-semibold text-white">{opt.label}</p>
                        <p className="text-xs text-white/40">{opt.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 2: How long? */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">How long did you play?</h2>
              <div className="grid grid-cols-2 gap-3">
                {durationOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => { setDuration(opt.key); setStep(3); }}
                    className={cn(
                      "rounded-xl border p-4 text-center transition-all duration-200 hover:bg-white/8",
                      duration === opt.key
                        ? "bg-cyan-500/15 border-cyan-500/30"
                        : "bg-white/5 border-white/10"
                    )}
                  >
                    <p className="text-lg font-bold text-white">{opt.label}</p>
                  </button>
                ))}
              </div>
              <button onClick={() => setStep(1)} className="text-sm text-white/40 hover:text-white/60">
                ← Back
              </button>
            </div>
          )}

          {/* Step 3: Any pain? */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-white">Any discomfort or pain?</h2>
              <p className="text-sm text-white/40">Select all that apply, or "No pain" if you feel good.</p>
              <div className="grid grid-cols-2 gap-3">
                {painOptions.map((opt) => (
                  <button
                    key={opt.key}
                    onClick={() => togglePain(opt.key)}
                    className={cn(
                      "rounded-xl border p-4 text-left transition-all duration-200 hover:bg-white/8",
                      painAreas.includes(opt.key)
                        ? opt.key === "none"
                          ? "bg-green-500/15 border-green-500/30"
                          : "bg-amber-500/15 border-amber-500/30"
                        : "bg-white/5 border-white/10"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{opt.emoji}</span>
                      <span className="text-sm font-medium text-white">{opt.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex gap-3 pt-2">
                <button onClick={() => setStep(2)} className="text-sm text-white/40 hover:text-white/60">
                  {"\u2190"} Back
                </button>
                {painAreas.length > 0 ? (
                  <Button size="sm" onClick={() => setStep(4)}>
                    See my recovery plan
                  </Button>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => { setPainAreas(["none"]); setStep(4); }} className="border-white/20 text-white/60">
                    Skip — I feel fine
                  </Button>
                )}
              </div>
            </div>
          )}

          {/* Step 4: Your Recovery Plan */}
          {step === 4 && intensity && duration && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold text-white mb-1">Your Recovery Plan</h2>
                <p className="text-sm text-white/40">
                  Based on {intensity} session ({durationOptions.find((d) => d.key === duration)?.label})
                  {painAreas.includes("none") ? " — no pain reported" : ` — targeting: ${painAreas.join(", ")}`}
                </p>
              </div>

              <div className="rounded-2xl bg-gradient-to-r from-cyan-500/10 to-teal-500/10 border border-cyan-500/20 p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm">{"\u23F1\uFE0F"}</span>
                  <span className="text-sm font-semibold text-white">
                    Estimated time: {recommendations.length * 3}-{recommendations.length * 5} minutes
                  </span>
                </div>
                <p className="text-xs text-white/40">
                  {recommendations.length} stretches with real-time form tracking
                </p>
              </div>

              <div className="flex items-center gap-2 text-xs text-white/30 bg-white/5 rounded-lg px-3 py-2 border border-white/5">
                <svg className="w-3.5 h-3.5 text-green-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
                <span>Protocol based on ACSM stretching guidelines, Afonso et al. 2021 (Frontiers in Physiology), and padel biomechanics research (García-González 2020)</span>
              </div>

              <div className="space-y-3">
                {recommendations.map((rec, i) => (
                  <div
                    key={rec.slug}
                    className="rounded-xl bg-white/5 border border-white/10 p-4 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center text-sm font-bold text-cyan-400">
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {rec.slug.replace("stretch-", "").replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())} Stretch
                        </p>
                        <p className="text-xs text-white/40">{rec.reason}</p>
                      </div>
                    </div>
                    <Link to={`/session/${rec.slug}`}>
                      <Button size="sm" variant="outline" className="border-white/20 text-white/70 hover:bg-white/10">
                        Start
                      </Button>
                    </Link>
                  </div>
                ))}
              </div>

              {/* Start all button */}
              <Link to={`/session/${recommendations[0]?.slug ?? "stretch-hamstring"}`}>
                <Button size="lg" className="w-full shadow-xl shadow-brand-500/30">
                  Start Recovery Session
                </Button>
              </Link>

              <div className="flex gap-3">
                <button onClick={() => setStep(3)} className="text-sm text-white/40 hover:text-white/60">
                  ← Change answers
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
