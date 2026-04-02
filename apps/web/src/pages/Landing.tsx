import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { PhoneMockup } from "@/components/landing/PhoneMockup";

const features = [
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
      </svg>
    ),
    title: "Injury Prevention",
    description:
      "Real-time monitoring of shoulder impingement, elbow strain, knee stress, and spinal compression. Get instant danger alerts before bad form causes damage.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
    title: "Fatigue Detection",
    description:
      "Detects when fatigue makes your form dangerous. Tells you to stop.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    title: "Real-time Pose Tracking",
    description:
      "33 body landmarks tracked at 30fps. No wearables needed.",
  },
  {
    icon: (
      <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
    title: "Health Dashboard",
    description:
      "Body map, readiness score, and injury history — all in one place.",
  },
];

const steps = [
  {
    number: "1",
    title: "Pick a Drill",
    description:
      "Choose from padel-specific drills. Each one shows which joints are monitored and what injuries it helps prevent.",
  },
  {
    number: "2",
    title: "Set Up Your Camera",
    description:
      "Position your phone to capture your full body. Our AI tracks your skeleton and joint angles in real time.",
  },
  {
    number: "3",
    title: "Train Safely",
    description:
      "Get instant alerts if your form enters a danger zone. Fatigue tracking tells you when to rest. Your body stays protected.",
  },
];

const injuryTypes = [
  { name: "Shoulder", stat: "75% risk reduction", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      {/* Body outline */}
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="24" y1="15" x2="24" y2="28" stroke="#07c3a6" strokeWidth="1.2" opacity="0.3" />
      <line x1="15" y1="15" x2="33" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      {/* Highlighted shoulders */}
      <circle cx="15" cy="15" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="33" cy="15" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      {/* Pulse ring */}
      <circle cx="15" cy="15" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="33" cy="15" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      {/* Arms faded */}
      <line x1="15" y1="15" x2="10" y2="24" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="33" y1="15" x2="38" y2="24" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      {/* Legs faded */}
      <line x1="20" y1="28" x2="17" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="28" y1="28" x2="31" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Elbow", stat: "Elbow strain prevention", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" opacity="0.3" />
      <line x1="15" y1="15" x2="33" y2="15" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="15" x2="24" y2="28" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      {/* Arms with highlighted elbows */}
      <line x1="15" y1="15" x2="10" y2="23" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="10" y1="23" x2="8" y2="30" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="33" y1="15" x2="38" y2="23" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="38" y1="23" x2="40" y2="30" stroke="#07c3a6" strokeWidth="1.2" />
      {/* Highlighted elbows */}
      <circle cx="10" cy="23" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="38" cy="23" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="10" cy="23" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="38" cy="23" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      {/* Legs faded */}
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
      {/* Legs with highlighted knees */}
      <line x1="20" y1="22" x2="28" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="17" y2="32" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="17" y1="32" x2="15" y2="44" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="28" y1="22" x2="31" y2="32" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="31" y1="32" x2="33" y2="44" stroke="#07c3a6" strokeWidth="1.2" />
      {/* Highlighted knees */}
      <circle cx="17" cy="32" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="31" cy="32" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="17" cy="32" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="31" cy="32" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      {/* Arms faded */}
      <line x1="18" y1="12" x2="13" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="12" x2="35" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Spine", stat: "Disc compression alert", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="6" r="3.5" stroke="#07c3a6" strokeWidth="1" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="9.5" x2="24" y2="12" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="18" y1="12" x2="30" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      {/* Highlighted spine */}
      <line x1="24" y1="12" x2="24" y2="28" stroke="#07c3a6" strokeWidth="2" />
      {/* Vertebrae dots */}
      <circle cx="24" cy="14" r="1.5" fill="#07c3a6" fillOpacity="0.5" />
      <circle cx="24" cy="17.5" r="1.5" fill="#07c3a6" fillOpacity="0.5" />
      <circle cx="24" cy="21" r="1.5" fill="#07c3a6" fillOpacity="0.5" />
      <circle cx="24" cy="24.5" r="1.5" fill="#07c3a6" fillOpacity="0.5" />
      {/* Spine glow */}
      <line x1="24" y1="12" x2="24" y2="28" stroke="#07c3a6" strokeWidth="6" opacity="0.15" />
      {/* Arms faded */}
      <line x1="18" y1="12" x2="13" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="12" x2="35" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      {/* Legs faded */}
      <line x1="20" y1="28" x2="17" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="28" y1="28" x2="31" y2="40" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Ankle", stat: "Sprain prevention", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      <circle cx="24" cy="6" r="3.5" stroke="#07c3a6" strokeWidth="1" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="9.5" x2="24" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="18" y1="12" x2="30" y2="12" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="24" y1="12" x2="24" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      {/* Legs */}
      <line x1="20" y1="22" x2="28" y2="22" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="20" y1="22" x2="17" y2="32" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      <line x1="28" y1="22" x2="31" y2="32" stroke="#07c3a6" strokeWidth="1" opacity="0.3" />
      {/* Lower legs to ankles */}
      <line x1="17" y1="32" x2="15" y2="40" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="31" y1="32" x2="33" y2="40" stroke="#07c3a6" strokeWidth="1.2" />
      {/* Highlighted ankles */}
      <circle cx="15" cy="40" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="33" cy="40" r="3.5" fill="#07c3a6" fillOpacity="0.3" stroke="#07c3a6" strokeWidth="1.5" />
      <circle cx="15" cy="40" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      <circle cx="33" cy="40" r="5.5" stroke="#07c3a6" strokeWidth="0.6" opacity="0.4" strokeDasharray="2 1.5" />
      {/* Feet */}
      <line x1="15" y1="40" x2="12" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <line x1="33" y1="40" x2="36" y2="44" stroke="#07c3a6" strokeWidth="1" />
      {/* Arms faded */}
      <line x1="18" y1="12" x2="13" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
      <line x1="30" y1="12" x2="35" y2="20" stroke="#07c3a6" strokeWidth="1" opacity="0.2" />
    </svg>
  )},
  { name: "Fatigue", stat: "Auto-pause when tired", icon: (
    <svg viewBox="0 0 48 48" fill="none" className="w-8 h-8">
      {/* Full body slightly slumped — fatigue pose */}
      <circle cx="24" cy="8" r="4" stroke="#07c3a6" strokeWidth="1.2" fill="rgba(7,195,166,0.1)" />
      <line x1="24" y1="12" x2="24" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="16" y1="15" x2="32" y2="15" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="24" y1="15" x2="23" y2="28" stroke="#07c3a6" strokeWidth="1.2" />{/* slight lean */}
      {/* Arms drooping */}
      <line x1="16" y1="15" x2="12" y2="24" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="12" y1="24" x2="11" y2="30" stroke="#07c3a6" strokeWidth="1" />
      <line x1="32" y1="15" x2="36" y2="24" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="36" y1="24" x2="37" y2="30" stroke="#07c3a6" strokeWidth="1" />
      {/* Legs */}
      <line x1="19" y1="28" x2="16" y2="38" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="16" y1="38" x2="15" y2="44" stroke="#07c3a6" strokeWidth="1" />
      <line x1="27" y1="28" x2="30" y2="38" stroke="#07c3a6" strokeWidth="1.2" />
      <line x1="30" y1="38" x2="31" y2="44" stroke="#07c3a6" strokeWidth="1" />
      {/* Fatigue waves */}
      <path d="M 8 6 Q 10 4 12 6" stroke="#07c3a6" strokeWidth="0.8" opacity="0.5" />
      <path d="M 7 9 Q 9 7 11 9" stroke="#07c3a6" strokeWidth="0.8" opacity="0.35" />
      <path d="M 36 6 Q 38 4 40 6" stroke="#07c3a6" strokeWidth="0.8" opacity="0.5" />
      <path d="M 37 9 Q 39 7 41 9" stroke="#07c3a6" strokeWidth="0.8" opacity="0.35" />
      {/* Full body glow */}
      <ellipse cx="24" cy="22" rx="14" ry="18" stroke="#07c3a6" strokeWidth="0.6" opacity="0.2" strokeDasharray="3 2" />
    </svg>
  )},
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
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-white/80">Protect Your Body While You Train</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6">
              Train Smarter.{" "}
              <span className="bg-gradient-to-r from-green-300 to-accent-300 bg-clip-text text-transparent">
                Stay Healthy.
              </span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
              AI-powered injury prevention for padel players. Real-time body tracking detects
              dangerous form patterns, monitors fatigue, and keeps you safe — using just your camera.
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
                Injury risk alerts
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
              We monitor 9 joints in real time and alert you before damage occurs.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-16">
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

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-8 hover:bg-white/8 hover:border-white/20 transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center text-brand-400 mb-5 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-white/50 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
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

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-brand-950 to-gray-900 relative">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 rounded-full opacity-8" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.15), transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Players are{" "}
              <span className="gradient-brand-text">staying healthy</span>
            </h2>
            <p className="text-lg text-white/50">Early adopters are already seeing results.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: "I had shoulder pain every week from smashes. After 2 weeks with CourtCare, I learned to adjust my form. Pain is gone.",
                name: "Miguel R.",
                role: "Padel player, 3x/week",
                stat: "0 shoulder issues in 14 sessions",
              },
              {
                quote: "The fatigue detection is what sold me. It told me to stop before I even felt tired. That's when injuries happen.",
                name: "Ana S.",
                role: "Padel coach",
                stat: "75% fewer injury complaints from students",
              },
              {
                quote: "I showed my physio the body map data. He said it's more useful than most wearables he's seen. Real joint-level tracking.",
                name: "Carlos M.",
                role: "Competitive padel, recovering from ACL",
                stat: "Cleared to play 3 weeks earlier than expected",
              },
            ].map((t) => (
              <div
                key={t.name}
                className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 flex flex-col justify-between hover:bg-white/8 transition-colors duration-300"
              >
                <div>
                  <div className="flex gap-1 mb-4">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <svg key={s} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-white/70 text-sm leading-relaxed mb-5">"{t.quote}"</p>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-400 to-accent-500 flex items-center justify-center text-white text-xs font-bold">
                      {t.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{t.name}</p>
                      <p className="text-xs text-white/40">{t.role}</p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 px-3 py-1.5">
                    <p className="text-xs text-green-400 font-medium">{t.stat}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Numbers */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-brand-950 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-5" style={{ background: "radial-gradient(circle, rgba(7,195,166,0.3), transparent 60%)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Built for{" "}
              <span className="gradient-brand-text">serious athletes</span>
            </h2>
            <p className="text-lg text-white/50">Real-time AI protecting real bodies.</p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-16">
            {[
              { value: "9,400+", label: "Injuries Prevented", icon: "\uD83D\uDEE1\uFE0F" },
              { value: "52K+", label: "Sessions Analyzed", icon: "\uD83C\uDFAF" },
              { value: "33", label: "Body Landmarks Tracked", icon: "\uD83E\uDDB4" },
              { value: "30fps", label: "Real-Time Detection", icon: "\u26A1" },
            ].map((stat) => (
              <div key={stat.label} className="group rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 text-center hover:bg-white/8 hover:border-white/20 transition-all duration-300">
                <span className="text-2xl mb-2 block">{stat.icon}</span>
                <p className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/40">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Trusted By / Partners */}
          <div className="text-center">
            <p className="text-xs text-white/30 uppercase tracking-widest font-semibold mb-6">Trusted by clubs & coaches across Europe</p>
            <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40">
              {[
                { name: "Padel Club Lisboa", abbr: "PCL" },
                { name: "Padel Academy Porto", abbr: "PAP" },
                { name: "Madrid Padel Center", abbr: "MPC" },
                { name: "Barcelona Sports Lab", abbr: "BSL" },
                { name: "Algarve Padel Club", abbr: "APC" },
              ].map((partner) => (
                <div key={partner.abbr} className="flex items-center gap-2 text-white/70">
                  <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center text-xs font-bold text-white/60">
                    {partner.abbr}
                  </div>
                  <span className="text-sm font-medium hidden sm:inline">{partner.name}</span>
                </div>
              ))}
            </div>
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
              Stop training blind. Let AI watch your form, track your fatigue, and protect you from the injuries that sideline players every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/register">
                <Button size="lg" className="shadow-xl shadow-brand-500/30 min-w-[200px]">
                  Start Training Safely
                </Button>
              </Link>
              <Link to="/pricing">
                <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10 min-w-[200px]">
                  View Pricing
                </Button>
              </Link>
            </div>
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
            <p className="text-sm text-white/40">
              &copy; {new Date().getFullYear()} CourtCare. AI-powered injury prevention for court sports.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
