import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/landing/PhoneMockup";

const injuryTypes = [
  { name: "Shoulder", stat: "Impingement detection", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="24" y1="15" x2="24" y2="28" stroke="#07c3a6" strokeWidth="1.2" opacity="0.3" />
      <line x1="15" y1="15" x2="33" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <circle cx="15" cy="15" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="33" cy="15" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="15" cy="15" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="33" cy="15" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <line x1="15" y1="15" x2="10" y2="24" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="33" y1="15" x2="38" y2="24" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="28" x2="17" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="28" y1="28" x2="31" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Elbow", stat: "Strain prevention", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" opacity="0.3" />
      <line x1="15" y1="15" x2="33" y2="15" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="15" x2="24" y2="28" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="15" y1="15" x2="10" y2="23" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="10" y1="23" x2="8" y2="30" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="33" y1="15" x2="38" y2="23" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="38" y1="23" x2="40" y2="30" stroke="#07c3a6" strokeWidth="1.2" />
      <circle cx="10" cy="23" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="38" cy="23" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="10" cy="23" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="38" cy="23" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <line x1="20" y1="28" x2="17" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="28" y1="28" x2="31" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Knee", stat: "ACL & meniscus guard", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="6" r="3.5" stroke="#07c3a6" strokeWidth="1" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="9.5" x2="24" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="12" x2="30" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="12" x2="24" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="28" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="17" y2="32" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="17" y1="32" x2="15" y2="44" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="28" y1="22" x2="31" y2="32" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="31" y1="32" x2="33" y2="44" stroke="#07c3a6" strokeWidth="1.2" />
      <circle cx="17" cy="32" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="31" cy="32" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="17" cy="32" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="31" cy="32" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <line x1="18" y1="12" x2="13" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="12" x2="35" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Ankle", stat: "Sprain prevention", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="6" r="3.5" stroke="#07c3a6" strokeWidth="1" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="9.5" x2="24" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="12" x2="30" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="12" x2="24" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="28" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="17" y2="32" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="22" x2="31" y2="32" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="17" y1="32" x2="15" y2="40" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="31" y1="32" x2="33" y2="40" stroke="#07c3a6" strokeWidth="1.2" />
      <circle cx="15" cy="40" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="33" cy="40" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="15" cy="40" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="33" cy="40" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <line x1="15" y1="40" x2="12" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <line x1="33" y1="40" x2="36" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <line x1="18" y1="12" x2="13" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="12" x2="35" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Fatigue", stat: "Auto-pause when tired", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="16" y1="15" x2="32" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="24" y1="15" x2="23" y2="28" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="16" y1="15" x2="12" y2="24" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="12" y1="24" x2="11" y2="30" stroke="#07c3a6" strokeWidth="1" />
      <line x1="32" y1="15" x2="36" y2="24" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="36" y1="24" x2="37" y2="30" stroke="#07c3a6" strokeWidth="1" />
      <line x1="19" y1="28" x2="16" y2="38" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="16" y1="38" x2="15" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <line x1="27" y1="28" x2="30" y2="38" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="30" y1="38" x2="31" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <path d="M 8 6 Q 10 4 12 6" stroke="#07c3a6" strokeWidth="0.8" opacity="0.5" />
      <path d="M 7 9 Q 9 7 11 9" stroke="#07c3a6" strokeWidth="0.8" opacity="0.35" />
      <path d="M 36 6 Q 38 4 40 6" stroke="#07c3a6" strokeWidth="0.8" opacity="0.5" />
      <path d="M 37 9 Q 39 7 41 9" stroke="#07c3a6" strokeWidth="0.8" opacity="0.35" />
      <ellipse cx="24" cy="22" rx="14" ry="18" stroke="#07c3a6" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 2" />
    </svg>
  )},
];

const steps = [
  {
    number: "1",
    title: "Pick a Drill",
    description:
      "Choose from 12 padel-specific activities — warm-ups, technique drills, and cool-down stretches. Each one shows which joints are monitored.",
  },
  {
    number: "2",
    title: "Point Your Camera",
    description:
      "Position your phone to see your full body. Our AI tracks 33 body landmarks and 15 joint angles in real time — no wearables needed.",
  },
  {
    number: "3",
    title: "Train Safely",
    description:
      "Get instant alerts if your form enters a danger zone. If risk exceeds 70%, we auto-pause your session. Your body stays protected.",
  },
];

export function Landing() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleDemoLogin = () => {
    setAuth(
      { id: "demo-user-001", name: "Pedro Esteves", email: "pedro@courtcare.com" },
      "demo-token-investor-preview"
    );
    navigate("/drills");
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative gradient-hero overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-brand-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent-400/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-500/5 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-32">
          <nav className="flex items-center justify-between mb-20">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/25">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">CourtCare</span>
            </div>
            <div className="flex items-center gap-3">
              <Link to="/science">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                  Our Science
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                  Log in
                </Button>
              </Link>
              <button
                onClick={handleDemoLogin}
                className="group flex items-center gap-2 px-5 py-2 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white text-sm font-semibold shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 hover:scale-105 animate-glow-pulse"
              >
                Try Demo
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </nav>

          <div className="text-center max-w-4xl mx-auto">
            <Link to="/science" className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8 hover:bg-white/15 transition-colors">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/80">Informed by 15+ peer-reviewed sports medicine studies</span>
            </Link>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Train Smarter.{" "}
              <span className="bg-gradient-to-r from-green-300 to-accent-300 bg-clip-text text-transparent">
                Stay Healthy.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-4 leading-relaxed">
              AI-powered injury prevention for padel players. Real-time body tracking detects
              dangerous form, monitors fatigue, and <strong className="text-white">auto-pauses your session</strong> when risk is too high.
            </p>

            <p className="text-sm text-white/40 mb-10">
              Just your phone camera. No wearables. No equipment.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDemoLogin}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white text-base font-semibold shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                Start Training
              </button>
              <a href="#how-it-works">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 min-w-[200px]">
                  See How It Works
                </Button>
              </a>
            </div>

            {/* Phone Mockup Demo */}
            <PhoneMockup />

            <div className="mt-12 flex items-center justify-center gap-8 text-white/50 text-sm">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Auto-pause on danger
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                Fatigue detection
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                No hardware needed
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-950 to-transparent" />
      </section>

      {/* What We Protect Against */}
      <section id="how-it-protects" className="py-24 bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 right-1/4 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.3), transparent 70%)" }} />
          <div className="absolute bottom-20 left-1/4 w-96 h-96 rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.3), transparent 70%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Injuries we{" "}
              <span className="gradient-brand-text">protect against</span>
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              12 injury thresholds across shoulder, elbow, knee, and ankle — monitored every frame.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-16">
            {injuryTypes.map((injury) => (
              <div
                key={injury.name}
                className="group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-4 hover:bg-white/8 hover:border-white/20 transition-all duration-300 text-center"
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="w-14 h-14 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 group-hover:bg-brand-500/15 transition-all duration-300">
                    {injury.icon}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white">{injury.name}</h3>
                    <p className="text-xs text-white/40">{injury.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Auto-pause highlight — the killer feature */}
          <div className="rounded-2xl bg-gradient-to-r from-red-500/10 to-brand-500/10 border border-red-500/20 p-8 text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-red-500/15 border border-red-500/25 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
              <span className="text-sm text-red-400 font-medium">Safety First</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Auto-pause when danger is detected
            </h3>
            <p className="text-white/50 max-w-xl mx-auto leading-relaxed">
              If your injury risk exceeds 70%, CourtCare automatically pauses your session and tells you exactly what's wrong.
              No other padel app does this.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-gradient-to-b from-brand-950 to-gray-900 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-8" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.15), transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How CourtCare keeps you safe
            </h2>
            <p className="text-lg text-white/50 max-w-2xl mx-auto">
              Three steps to safer training. No equipment, no coach, no appointments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step) => (
              <div key={step.number} className="text-center group">
                <div className="relative inline-flex mb-6">
                  <div className="w-20 h-20 rounded-full gradient-brand flex items-center justify-center shadow-lg shadow-brand-500/25 group-hover:shadow-brand-500/50 transition-shadow duration-300">
                    <span className="text-3xl font-bold text-white">{step.number}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/50 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Problem — Condensed */}
      <section className="py-24 bg-gradient-to-b from-gray-900 via-brand-950 to-gray-900 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full opacity-8" style={{ background: "radial-gradient(circle, rgba(239,68,68,0.12), transparent 60%)" }} />
          <div className="absolute bottom-1/4 right-1/3 w-80 h-80 rounded-full opacity-8" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.12), transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Anchor stat */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
              <span className="w-2 h-2 rounded-full bg-red-400" />
              <span className="text-sm text-red-400 font-medium">The Problem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Padel is booming.{" "}
              <span className="text-red-400">So are the injuries.</span>
            </h2>
            <p className="text-6xl sm:text-7xl font-black text-red-400 mb-3">69%</p>
            <p className="text-lg text-white/60 max-w-lg mx-auto mb-2">
              of padel players have been injured at least once
            </p>
            <p className="text-xs text-white/25">Medicina Vol. 61, 2025 — peer-reviewed study of Portuguese practitioners</p>
          </div>

          {/* Body areas strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10 max-w-3xl mx-auto">
            {[
              { area: "Elbow", pct: "18%", detail: "Tennis elbow" },
              { area: "Ankle", pct: "17%", detail: "Lateral sprains" },
              { area: "Knee", pct: "13%", detail: "ACL / meniscus" },
              { area: "Shoulder", pct: "11%", detail: "Rotator cuff" },
            ].map((item) => (
              <div key={item.area} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <p className="text-2xl font-bold text-white">{item.pct}</p>
                <p className="text-sm font-semibold text-brand-400">{item.area}</p>
                <p className="text-xs text-white/30 mt-0.5">{item.detail}</p>
              </div>
            ))}
          </div>

          {/* Bridge — from problem to solution */}
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="text-lg text-white/50 leading-relaxed">
              35 million players. 77,000 courts. The fastest-growing sport in the world — with{" "}
              <span className="text-white font-medium">zero apps</span> that detect injury risk in real time.
            </p>
          </div>

          {/* Solution proof strip */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8 max-w-4xl mx-auto">
            {[
              { stat: "33", label: "Body landmarks tracked at 30fps", color: "text-brand-400" },
              { stat: "12", label: "Injury thresholds monitored live", color: "text-brand-400" },
              { stat: "0.91", label: "Correlation vs. motion capture", color: "text-brand-400" },
              { stat: "15+", label: "Peer-reviewed studies behind it", color: "text-brand-400" },
            ].map((item) => (
              <div key={item.label} className="rounded-xl bg-white/5 border border-white/10 p-4 text-center">
                <p className={`text-2xl font-black ${item.color} mb-1`}>{item.stat}</p>
                <p className="text-xs text-white/50 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>

          {/* Links to deep pages */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
            <Link to="/market" className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white/80 font-medium transition-colors group">
              Full market data & research
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link to="/science" className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors group">
              Our science & methodology
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-15" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.4), transparent 60%)" }} />
          <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full opacity-10" style={{ background: "radial-gradient(circle, rgba(16,185,129,0.3), transparent 60%)" }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 p-12 sm:p-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Your body is your most important equipment
            </h2>
            <p className="text-lg text-white/50 mb-8 max-w-lg mx-auto">
              69% of padel players get injured. 35 million play worldwide. CourtCare uses AI to keep them safe.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={handleDemoLogin}
                className="inline-flex items-center justify-center px-8 py-3 rounded-xl bg-gradient-to-r from-brand-500 to-accent-500 text-white text-base font-semibold shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all duration-300 hover:scale-105 min-w-[200px]"
              >
                Try It Free
              </button>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 min-w-[200px]">
                  View Pricing
                </Button>
              </Link>
            </div>
            <p className="text-xs text-white/30 mt-6">Free tier includes 3 sessions/week. No credit card required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-950 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg gradient-brand flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">CourtCare</span>
            </div>
            <div className="flex items-center gap-6">
              <Link to="/science" className="text-sm text-white/40 hover:text-white/60 transition-colors">Science</Link>
              <Link to="/market" className="text-sm text-white/40 hover:text-white/60 transition-colors">Market Data</Link>
              <Link to="/pricing" className="text-sm text-white/40 hover:text-white/60 transition-colors">Pricing</Link>
            </div>
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} CourtCare. AI-powered injury prevention for padel.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
