import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";

const injuryStudies = [
  {
    stat: "69.2%",
    population: "Portuguese padel practitioners",
    detail: "Lifetime injury prevalence. Mean 2.1 injuries per injured athlete. Fatigue was the main contributing cause (24.1%).",
    source: "Medicina, Vol. 61, No. 9, Article 1707, September 2025",
    journal: "MDPI — peer-reviewed",
  },
  {
    stat: "53.8%",
    population: "364 Chilean amateur players",
    detail: "Injury rate in the previous 6 months. Mean age 37.4, 63% male.",
    source: "BMC Sports Science, Medicine and Rehabilitation, 2025",
    journal: "Springer Nature — peer-reviewed",
  },
  {
    stat: "36.5%",
    population: "457 Belgian recreational players",
    detail: "Annual injury rate. 185 injuries across 167 players. Lower limb injuries most common (53.5%).",
    source: "Physical Therapy in Sport, 2025",
    journal: "ScienceDirect — peer-reviewed",
  },
  {
    stat: "Up to 85%",
    population: "Systematic review across countries",
    detail: "Highest prevalence found across racket sports. Padel: up to 85.4% vs. tennis: 39–46% vs. squash: 58%.",
    source: "Systematic Review, ResearchGate, 2024",
    journal: "Pre-print — cross-sport comparison",
  },
];

const bodyAreas = [
  { area: "Elbow", pct: "18.0%", cause: "Lateral epicondylitis (tennis elbow) from repetitive wrist extension and forearm twisting", icon: "💪" },
  { area: "Ankle", pct: "16.6%", cause: "Lateral sprains from sudden direction changes and lateral court movement", icon: "🦶" },
  { area: "Knee", pct: "12.5%", cause: "ACL and meniscus injuries from deceleration, pivoting, and direction changes", icon: "🦿" },
  { area: "Shoulder", pct: "10.5%", cause: "Rotator cuff strain from overhead shots — bandeja, vibora, smash", icon: "🦴" },
];

const marketStats = [
  { stat: "35M+", label: "Padel players worldwide", source: "FIP World Padel Report 2025" },
  { stat: "77,300", label: "Courts globally", source: "FIP Report 2025 (+15.2% YoY)" },
  { stat: "24,600+", label: "Clubs worldwide", source: "FIP Report 2025 (+16.1% YoY)" },
  { stat: "150+", label: "Countries with padel", source: "FIP Report 2025" },
  { stat: "92%", label: "Return rate after first session", source: "Playtomic & PwC Global Padel Report 2025" },
  { stat: "~40%", label: "Female participation rate", source: "Playtomic & PwC 2025" },
  { stat: "42%", label: "Federation member growth YoY", source: "FIP Report 2025" },
  { stat: "14,355", label: "New courts built in 2025 alone", source: "FIP Report 2025" },
];

const techMarket = [
  { stat: "$34.25B → $68.71B", label: "Sports technology market (2025 → 2030)", source: "MarketsandMarkets, 2025", cagr: "14.9% CAGR" },
  { stat: "$3.65B → $7.8B+", label: "AI in sports market (2025 → 2030)", source: "Mordor Intelligence, 2025", cagr: "13–29% CAGR" },
  { stat: "$3.25B", label: "Sports injury prediction market by 2030", source: "FutureDataStats, 2025", cagr: "6.5% CAGR" },
  { stat: "35%", label: "CAGR for AI injury prevention solutions", source: "Mordor Intelligence, 2025", cagr: "Fastest-growing segment" },
  { stat: "30.3%", label: "CAGR for computer vision in sports", source: "Mordor Intelligence, 2025", cagr: "Leading AI technology" },
  { stat: "$248M → $662M", label: "Global padel sports market (2025 → 2035)", source: "Global Growth Insights, 2025", cagr: "10.3% CAGR" },
];

const competitorGaps = [
  { name: "Playtomic", users: "3.5M+", does: "Court booking & matchmaking", missing: "No injury prevention, no pose tracking" },
  { name: "Padelio", users: "45K+", does: "Apple Watch stroke tracking", missing: "Requires wearable, no injury detection" },
  { name: "PADEL'EM", users: "New", does: "AI coach via smartwatch", missing: "Requires Apple Watch, no real-time form analysis" },
  { name: "SwingVision", users: "Large", does: "AI tennis/pickleball analytics", missing: "Does NOT support padel at all" },
  { name: "OnForm", users: "Coaches", does: "Video replay & annotation ($30/mo)", missing: "No real-time tracking, no injury detection" },
  { name: "ATHLFT", users: "New", does: "S&C programs for padel (£19.99/mo)", missing: "No live pose tracking, no auto-pause" },
];

export function Market() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
      {/* Nav */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <nav className="flex items-center justify-between mb-12">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-white">CourtCare</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/science">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                Our Science
              </Button>
            </Link>
            <Link to="/">
              <Button variant="ghost" size="sm" className="text-white/70 hover:text-white hover:bg-white/10">
                Home
              </Button>
            </Link>
          </div>
        </nav>
      </div>

      {/* Header */}
      <div className="text-center mb-16 px-4">
        <div className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-6">
          <svg className="w-4 h-4 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
          </svg>
          <span className="text-sm text-brand-400 font-medium">Market Data</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
          The padel injury prevention{" "}
          <span className="gradient-brand-text">opportunity</span>
        </h1>
        <p className="text-lg text-white/50 max-w-2xl mx-auto">
          Every stat below is traceable to a named source — peer-reviewed journals, official federation reports, or established market research firms.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24 space-y-20">

        {/* Section 1: The Injury Problem */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <span className="text-red-400 text-lg">!</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">The Injury Problem</h2>
              <p className="text-sm text-white/40">4 independent studies, 3 countries, consistent findings</p>
            </div>
          </div>

          <div className="space-y-4">
            {injuryStudies.map((study) => (
              <div key={study.population} className="rounded-2xl bg-red-500/5 border border-red-500/15 p-6 flex flex-col sm:flex-row gap-6">
                <div className="sm:w-32 shrink-0 text-center sm:text-left">
                  <p className="text-4xl font-black text-red-400">{study.stat}</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-white mb-1">{study.population}</p>
                  <p className="text-sm text-white/50 mb-3 leading-relaxed">{study.detail}</p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/40">{study.source}</span>
                    <span className="text-xs bg-white/5 border border-white/10 rounded-full px-3 py-1 text-white/30">{study.journal}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Body areas */}
          <div className="mt-8 rounded-2xl bg-white/5 border border-white/10 p-6">
            <p className="text-sm text-white/40 mb-6 font-medium">Where padel players get injured most (Medicina Vol. 61, 2025)</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {bodyAreas.map((item) => (
                <div key={item.area} className="flex items-start gap-4 p-3 rounded-xl bg-white/3">
                  <span className="text-2xl">{item.icon}</span>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-lg font-bold text-white">{item.pct}</span>
                      <span className="text-sm font-semibold text-brand-400">{item.area}</span>
                    </div>
                    <p className="text-xs text-white/40 leading-relaxed">{item.cause}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-white/20 mt-4">Remaining injuries distributed across wrist, hip, lower back, and other areas.</p>
          </div>
        </section>

        {/* Section 2: Padel Market Growth */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Padel Market Growth</h2>
              <p className="text-sm text-white/40">The world's fastest-growing sport — FIP & Playtomic/PwC 2025</p>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {marketStats.map((item) => (
              <div key={item.label} className="rounded-2xl bg-white/5 border border-white/10 p-5 text-center hover:bg-white/8 transition-all duration-300">
                <p className="text-3xl font-black text-white mb-2">{item.stat}</p>
                <p className="text-sm text-white/60 mb-2 leading-relaxed">{item.label}</p>
                <p className="text-xs text-white/25">{item.source}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Sports Tech Market */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-accent-500/10 border border-accent-500/20 flex items-center justify-center">
              <svg className="w-5 h-5 text-accent-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 0 0-2.455 2.456Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Sports Tech & AI Market</h2>
              <p className="text-sm text-white/40">Market research from MarketsandMarkets, Mordor Intelligence, Grand View Research</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techMarket.map((item) => (
              <div key={item.label} className="rounded-2xl bg-brand-500/5 border border-brand-500/15 p-6 hover:bg-brand-500/8 transition-all duration-300">
                <p className="text-2xl font-black text-brand-400 mb-1">{item.stat}</p>
                <p className="text-sm text-white/60 mb-2 leading-relaxed">{item.label}</p>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-white/25">{item.source}</p>
                  <span className="text-xs bg-brand-500/10 text-brand-400 rounded-full px-2 py-0.5">{item.cagr}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Competitive Landscape */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
              <svg className="w-5 h-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 0 1 6 3.75h2.25A2.25 2.25 0 0 1 10.5 6v2.25a2.25 2.25 0 0 1-2.25 2.25H6a2.25 2.25 0 0 1-2.25-2.25V6ZM3.75 15.75A2.25 2.25 0 0 1 6 13.5h2.25a2.25 2.25 0 0 1 2.25 2.25V18a2.25 2.25 0 0 1-2.25 2.25H6A2.25 2.25 0 0 1 3.75 18v-2.25ZM13.5 6a2.25 2.25 0 0 1 2.25-2.25H18A2.25 2.25 0 0 1 20.25 6v2.25A2.25 2.25 0 0 1 18 10.5h-2.25a2.25 2.25 0 0 1-2.25-2.25V6ZM13.5 15.75a2.25 2.25 0 0 1 2.25-2.25H18a2.25 2.25 0 0 1 2.25 2.25V18A2.25 2.25 0 0 1 18 20.25h-2.25a2.25 2.25 0 0 1-2.25-2.25v-2.25Z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Competitive Landscape</h2>
              <p className="text-sm text-white/40">No app combines real-time pose tracking + injury prevention for padel</p>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
            <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-white/10 text-xs text-white/40 font-medium uppercase tracking-wider">
              <div className="col-span-2">App</div>
              <div className="col-span-1">Users</div>
              <div className="col-span-4">What it does</div>
              <div className="col-span-5">What it doesn't do</div>
            </div>
            {competitorGaps.map((c) => (
              <div key={c.name} className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 last:border-b-0 items-start">
                <div className="col-span-2 text-sm font-semibold text-white">{c.name}</div>
                <div className="col-span-1 text-xs text-white/40">{c.users}</div>
                <div className="col-span-4 text-sm text-white/50">{c.does}</div>
                <div className="col-span-5 text-sm text-red-400/70">{c.missing}</div>
              </div>
            ))}
            <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-brand-500/5">
              <div className="col-span-2 text-sm font-bold text-brand-400">CourtCare</div>
              <div className="col-span-1 text-xs text-brand-400/60">Beta</div>
              <div className="col-span-9 text-sm text-brand-400">Real-time pose tracking + 12 injury thresholds + auto-pause + fatigue detection. Camera only, no wearables.</div>
            </div>
          </div>
        </section>

        {/* Section 5: Key Takeaway */}
        <section>
          <div className="rounded-3xl bg-gradient-to-r from-brand-500/10 to-accent-500/10 border border-brand-500/20 p-10 text-center">
            <h3 className="text-2xl font-bold text-white mb-4">The gap</h3>
            <p className="text-lg text-white/60 max-w-2xl mx-auto leading-relaxed mb-8">
              35 million padel players. 69% get injured. $3.25 billion injury prediction market by 2030.
              And <span className="text-white font-semibold">zero apps</span> that detect injury risk in real time using just a phone camera.
            </p>
            <p className="text-white/40 text-sm mb-8">
              CourtCare is the first.
            </p>
            <Link to="/">
              <Button size="lg" className="shadow-xl shadow-brand-500/30">
                Back to CourtCare
              </Button>
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section>
          <h3 className="text-lg font-bold text-white mb-4">Sources</h3>
          <div className="space-y-2 text-xs text-white/30 leading-relaxed">
            <p>FIP World Padel Report 2025 — International Padel Federation, December 2025</p>
            <p>Playtomic & PwC Strategy&, Global Padel Report 2025</p>
            <p>"Sport-Related Injuries in Portuguese Padel Practitioners" — Medicina, Vol. 61, No. 9, Art. 1707, Sept 2025 (MDPI)</p>
            <p>"Padel related injuries: prevalence and characteristics in Chilean amateur players" — BMC Sports Science, 2025 (Springer Nature)</p>
            <p>"Prevalence and injury profiles for recreational padel players" — Physical Therapy in Sport, 2025 (ScienceDirect)</p>
            <p>"A Systematic Review Comparing Epidemiology of Injuries in Padel, Tennis and Squash" — ResearchGate, 2024</p>
            <p>Sports Technology Market Report — MarketsandMarkets, 2025</p>
            <p>AI in Sports Market Report — Mordor Intelligence, 2025</p>
            <p>Sports Injury Prediction Market — FutureDataStats, 2025</p>
            <p>Padel Sports Market Report — Global Growth Insights, 2025</p>
          </div>
        </section>
      </div>
    </div>
  );
}
