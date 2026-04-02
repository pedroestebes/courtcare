import { Link } from "react-router-dom";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const researchPillars = [
  {
    title: "Warm-Up Protocols",
    badge: "RAMP + FIFA 11+",
    color: "from-orange-500 to-amber-500",
    borderColor: "border-orange-500/20",
    description:
      "Our pre-match warm-ups follow the RAMP protocol (Raise, Activate, Mobilise, Potentiate) developed by Jeffreys (2007) and incorporate elements of the FIFA 11+ program.",
    findings: [
      "FIFA 11+ reduces overall injury incidence by 30% (RR = 0.70, 95% CI 0.52–0.93)",
      "Dynamic warm-ups outperform static stretching for neural drive and force output",
      "63% reduction in lower back injuries with structured warm-up programs",
    ],
    sources: [
      { name: "Al Attar et al. 2017", journal: "BMC Sports Science, Medicine and Rehabilitation" },
      { name: "Behm & Chaouachi 2011", journal: "European Journal of Applied Physiology" },
      { name: "Jeffreys 2007", journal: "RAMP Protocol — Professional Strength & Conditioning" },
    ],
  },
  {
    title: "Injury Detection Thresholds",
    badge: "Biomechanics Research",
    color: "from-red-500 to-rose-500",
    borderColor: "border-red-500/20",
    description:
      "Our joint angle thresholds for injury risk detection are informed by biomechanical studies on racket sport movements and validated motion capture data.",
    findings: [
      "Shoulder elevation >170° enters impingement zone (Elliott 2006, BJSM)",
      "Elbow flexion <40° at contact increases medial ligament stress",
      "Front knee flexion below 60° increases patellar and meniscus load",
      "Ankle inversion below 70° indicates high sprain risk",
    ],
    sources: [
      { name: "Elliott 2006", journal: "British Journal of Sports Medicine (PMC2577481)" },
      { name: "Bern Consensus 2022", journal: "Journal of Orthopaedic & Sports Physical Therapy" },
      { name: "NATA Position Statement 2018", journal: "Journal of Athletic Training" },
    ],
  },
  {
    title: "Recovery Protocols",
    badge: "ACSM Guidelines",
    color: "from-cyan-500 to-teal-500",
    borderColor: "border-cyan-500/20",
    description:
      "Our post-match stretching follows ACSM guidelines for flexibility training. We are transparent: stretching alone does not reduce muscle soreness — but it maintains range of motion and flexibility.",
    findings: [
      "ACSM recommends static stretches of 15–30 seconds, 2–4 repetitions per muscle group",
      "Post-exercise stretching maintains ROM but does not significantly reduce DOMS (Afonso et al. 2021)",
      "Active cool-down (light movement) has stronger evidence for recovery than static stretching alone",
    ],
    sources: [
      { name: "Afonso et al. 2021", journal: "Frontiers in Physiology (PMC8133317)" },
      { name: "ACSM Guidelines", journal: "American College of Sports Medicine" },
      { name: "Delphi Consensus 2025", journal: "Sports Medicine (PMC12305623)" },
    ],
  },
  {
    title: "Ankle Sprain Prevention",
    badge: "Proprioceptive Training",
    color: "from-violet-500 to-purple-500",
    borderColor: "border-violet-500/20",
    description:
      "Our balance-focused exercises incorporate proprioceptive training principles shown to significantly reduce ankle sprain rates in court sports.",
    findings: [
      "Proprioceptive training reduces ankle sprains: RR = 0.57 for primary prevention",
      "6-year prospective study confirmed significant sprain reduction with balance programs",
      "Programs of at least 6 weeks duration show strongest protective effects",
    ],
    sources: [
      { name: "Rivera et al. 2017", journal: "Clinical Journal of Sport Medicine (PMC5737043)" },
      { name: "Riva et al. 2016", journal: "British Journal of Sports Medicine (PMC4750505)" },
      { name: "Schiftan et al. 2015", journal: "Journal of Science and Medicine in Sport" },
    ],
  },
];

const poseValidation = {
  title: "Pose Estimation Technology",
  description:
    "We use Google's MediaPipe Tasks Vision to track 33 body landmarks at 30fps through the device camera — no wearables or special equipment needed.",
  findings: [
    "MediaPipe shows mean Pearson's correlation of 0.91 ± 0.08 for upper limb movements vs. gold-standard Qualisys motion capture",
    "0.80 ± 0.10 correlation for lower limb movements",
    "Successfully used in published sports biomechanics research (table tennis stroke analysis, 2025)",
  ],
  sources: [
    { name: "Cabarkapa et al. 2024", journal: "Heliyon (PMC11566680)" },
    { name: "MediaPipe Table Tennis Study 2025", journal: "Frontiers in Sports and Active Living" },
  ],
};

const padelEpidemiology = {
  title: "Why Padel Injury Prevention Matters",
  stats: [
    { value: "85%", label: "of padel athletes report injuries at some point", source: "Jansen et al. 2023" },
    { value: "30–74%", label: "of padel injuries affect the elbow", source: "Jansen et al. 2023" },
    { value: "53.5%", label: "of recreational player injuries are lower limb", source: "Jansen et al. 2023" },
    { value: "30 days", label: "median recovery time per injury", source: "Jansen et al. 2023" },
  ],
  source: {
    name: "Jansen et al. 2023",
    journal: "BMJ Open Sport & Exercise Medicine (PMC10277135)",
    title: "Incidence, prevalence and nature of injuries in padel: a systematic review",
  },
};

export function Science() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
      {/* Nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/25">
            <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
          </div>
          <span className="text-xl font-bold text-white">CourtCare</span>
        </Link>
        <Link to="/">
          <Button variant="ghost" size="sm" className="text-white/60 hover:text-white">
            Back to Home
          </Button>
        </Link>
      </nav>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-500/10 border border-green-500/20 rounded-full px-4 py-1.5 mb-6">
            <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
            </svg>
            <span className="text-sm text-green-400 font-medium">Evidence-Based Approach</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-6">
            The Science Behind{" "}
            <span className="gradient-brand-text">CourtCare</span>
          </h1>
          <p className="text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
            Our exercise protocols, injury detection thresholds, and recovery programs are informed by
            peer-reviewed sports medicine research. We believe in transparency — here's exactly what
            guides our technology and what the evidence says.
          </p>
        </div>

        {/* Disclaimer */}
        <div className="rounded-2xl bg-amber-500/5 border border-amber-500/15 px-6 py-4 mb-16">
          <div className="flex items-start gap-3">
            <span className="text-lg mt-0.5 shrink-0">{"\u26A0\uFE0F"}</span>
            <div>
              <p className="text-sm font-semibold text-amber-400 mb-1">Important Disclaimer</p>
              <p className="text-sm text-white/50 leading-relaxed">
                CourtCare is a fitness and training tool, not a medical device. Our protocols are <strong className="text-white/70">informed by</strong> published
                research — they are not a substitute for professional medical advice. If you experience pain or have
                a pre-existing condition, consult a qualified healthcare professional before training. The research
                cited below guided our algorithm design; our app itself has not been through an independent clinical trial.
              </p>
            </div>
          </div>
        </div>

        {/* Padel Epidemiology */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">{padelEpidemiology.title}</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            {padelEpidemiology.stats.map((stat) => (
              <div key={stat.label} className="rounded-xl bg-white/5 border border-white/10 p-5 text-center">
                <p className="text-3xl font-black text-white mb-2">{stat.value}</p>
                <p className="text-xs text-white/40 leading-relaxed">{stat.label}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-white/30 text-center">
            Source: {padelEpidemiology.source.name} — "{padelEpidemiology.source.title}," {padelEpidemiology.source.journal}
          </p>
        </div>

        {/* Research Pillars */}
        <div className="space-y-8 mb-16">
          {researchPillars.map((pillar) => (
            <div key={pillar.title} className={cn("rounded-2xl bg-white/5 border border-white/10 overflow-hidden")}>
              <div className="px-6 py-5 border-b border-white/5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <h3 className="text-xl font-bold text-white">{pillar.title}</h3>
                  <span className={cn(
                    "text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r text-white",
                    pillar.color
                  )}>
                    {pillar.badge}
                  </span>
                </div>
                <p className="text-sm text-white/50 mt-2 leading-relaxed">{pillar.description}</p>
              </div>

              <div className="px-6 py-4">
                <p className="text-xs uppercase tracking-wider text-white/30 font-semibold mb-3">Key Findings</p>
                <ul className="space-y-2 mb-5">
                  {pillar.findings.map((finding, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                      <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {finding}
                    </li>
                  ))}
                </ul>

                <p className="text-xs uppercase tracking-wider text-white/30 font-semibold mb-2">Sources</p>
                <div className="space-y-1">
                  {pillar.sources.map((source) => (
                    <p key={source.name} className="text-xs text-white/40">
                      <span className="text-white/60 font-medium">{source.name}</span> — {source.journal}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pose Estimation Technology */}
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden mb-16">
          <div className="px-6 py-5 border-b border-white/5">
            <div className="flex items-center justify-between flex-wrap gap-3">
              <h3 className="text-xl font-bold text-white">{poseValidation.title}</h3>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-brand-500 to-accent-500 text-white">
                MediaPipe Vision
              </span>
            </div>
            <p className="text-sm text-white/50 mt-2 leading-relaxed">{poseValidation.description}</p>
          </div>
          <div className="px-6 py-4">
            <p className="text-xs uppercase tracking-wider text-white/30 font-semibold mb-3">Validation Data</p>
            <ul className="space-y-2 mb-5">
              {poseValidation.findings.map((finding, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-white/60">
                  <svg className="w-4 h-4 text-green-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                  </svg>
                  {finding}
                </li>
              ))}
            </ul>
            <p className="text-xs uppercase tracking-wider text-white/30 font-semibold mb-2">Sources</p>
            <div className="space-y-1">
              {poseValidation.sources.map((source) => (
                <p key={source.name} className="text-xs text-white/40">
                  <span className="text-white/60 font-medium">{source.name}</span> — {source.journal}
                </p>
              ))}
            </div>
          </div>
        </div>

        {/* What We Say vs. What We Don't */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Our Commitment to Honesty</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-green-500/5 border border-green-500/15 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
                <h3 className="text-lg font-semibold text-green-400">What we can say</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "Our protocols are informed by peer-reviewed sports medicine research",
                  "Injury thresholds guided by published biomechanical data",
                  "Warm-ups based on the FIFA 11+ and RAMP protocols",
                  "Stretching follows ACSM-recommended durations and repetitions",
                  "Pose estimation validated against gold-standard motion capture (r=0.91)",
                  "Designed to help reduce injury risk through better form awareness",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-green-400 mt-0.5">+</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-red-500/5 border border-red-500/15 p-6">
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
                <h3 className="text-lg font-semibold text-red-400">What we don't claim</h3>
              </div>
              <ul className="space-y-3">
                {[
                  "We are not a medical device and have not been FDA/CE cleared",
                  "Our app has not been through an independent clinical trial",
                  "We do not guarantee injury prevention — we help with awareness",
                  "Post-exercise stretching does not significantly reduce muscle soreness (Afonso 2021)",
                  "We are not a replacement for professional physiotherapy or medical care",
                  "Joint angle thresholds are guidelines, not absolute limits",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-white/60">
                    <span className="text-red-400 mt-0.5">{"\u2212"}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Full Reference List */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-white mb-6">References</h2>
          <div className="rounded-2xl bg-white/5 border border-white/10 p-6">
            <ol className="space-y-3 text-sm text-white/50 leading-relaxed list-decimal list-inside">
              <li>Jansen H, et al. (2023). "Incidence, prevalence and nature of injuries in padel: a systematic review." <em className="text-white/60">BMJ Open Sport & Exercise Medicine</em>, PMC10277135.</li>
              <li>Al Attar WSA, et al. (2017). "How effective is the FIFA 11+ injury prevention program?" <em className="text-white/60">BMC Sports Science, Medicine and Rehabilitation</em>, PMC5704377.</li>
              <li>Jeffreys I (2007). "Warm-up revisited: The RAMP method of optimising warm-ups." <em className="text-white/60">Professional Strength & Conditioning</em>.</li>
              <li>Behm DG, Chaouachi A (2011). "A review of the acute effects of static and dynamic stretching on performance." <em className="text-white/60">European Journal of Applied Physiology</em>.</li>
              <li>Elliott B (2006). "Biomechanics and tennis." <em className="text-white/60">British Journal of Sports Medicine</em>, PMC2577481.</li>
              <li>Schwank A, et al. (2022). "2022 Bern Consensus Statement on Shoulder Injury Prevention." <em className="text-white/60">Journal of Orthopaedic & Sports Physical Therapy</em>.</li>
              <li>Rivera MJ, et al. (2017). "Proprioceptive Training for the Prevention of Ankle Sprains." <em className="text-white/60">Clinical Journal of Sport Medicine</em>, PMC5737043.</li>
              <li>Riva D, et al. (2016). "Proprioceptive training in professional basketball players." <em className="text-white/60">British Journal of Sports Medicine</em>, PMC4750505.</li>
              <li>Afonso J, et al. (2021). "The Effectiveness of Post-exercise Stretching in Short-Term and Delayed Recovery." <em className="text-white/60">Frontiers in Physiology</em>, PMC8133317.</li>
              <li>NATA (2018). "Prevention of Anterior Cruciate Ligament Injury: Position Statement." <em className="text-white/60">Journal of Athletic Training</em>, 53(1):5-19.</li>
              <li>Cabarkapa D, et al. (2024). "Markerless pose estimation models for sports biomechanics." <em className="text-white/60">Heliyon</em>, PMC11566680.</li>
              <li>Wilk KE, et al. "The Thrower's Ten Exercise Program." Systematic review 2025, <em className="text-white/60">Cureus</em>, PMC12633846.</li>
              <li>Danish DSSF (2023). "Shoulder injury prevention in overhead sports." <em className="text-white/60">British Journal of Sports Medicine</em>, PMC10086287.</li>
              <li>Schiftan GS, et al. (2015). "The effectiveness of proprioceptive training in preventing ankle sprains." <em className="text-white/60">Journal of Science and Medicine in Sport</em>.</li>
              <li>García-González C, et al. (2020). "Epidemiology of padel injuries." <em className="text-white/60">Applied Sciences</em>, MDPI.</li>
            </ol>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <p className="text-white/40 mb-6">Ready to train with science on your side?</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/register">
              <Button size="lg" className="shadow-xl shadow-brand-500/30 min-w-[200px]">
                Start Training
              </Button>
            </Link>
            <Link to="/pricing">
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 min-w-[200px]">
                View Plans
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-brand-950 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">CourtCare</span>
            </Link>
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} CourtCare. AI-powered injury prevention for padel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
