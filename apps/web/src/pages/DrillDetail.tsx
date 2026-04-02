import { useParams, Link, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { getDrill } from "@/engine/drills/index";
import { cn } from "@/lib/utils";

const categoryLabels: Record<string, string> = {
  fundamentals: "Fundamentals",
  volleys: "Volleys",
  overhead: "Overhead",
  defense: "Defense",
  attack: "Attack",
  serve: "Serve",
  groundstroke: "Groundstroke",
  warmup: "Warm-up",
  stretching: "Stretching",
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/15 text-green-400 border-green-500/20",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/15 text-red-400 border-red-500/20",
};

export function DrillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const drill = slug ? getDrill(slug) : undefined;

  if (!drill) {
    return <Navigate to="/drills" replace />;
  }

  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Link
            to="/drills"
            className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-white/70 mb-6"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
            </svg>
            Back to Drills
          </Link>

          <div className="flex items-start gap-4 mb-8">
            <div className={cn(
              "w-16 h-16 rounded-2xl flex items-center justify-center shadow-lg shrink-0",
              drill.category === "warmup" ? "bg-gradient-to-br from-orange-500 to-amber-600"
                : drill.category === "stretching" ? "bg-gradient-to-br from-cyan-500 to-teal-600"
                : drill.slug.startsWith("tennis") ? "bg-gradient-to-br from-green-500 to-emerald-600"
                : "bg-gradient-to-br from-brand-500 to-accent-500"
            )}>
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {drill.category === "warmup" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z" />
                ) : drill.category === "stretching" ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                )}
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white">{drill.name}</h1>
                <span
                  className={cn(
                    "text-xs font-medium px-3 py-1 rounded-full capitalize border",
                    difficultyColors[drill.difficulty]
                  )}
                >
                  {drill.difficulty}
                </span>
              </div>
              <p className="text-white/60 leading-relaxed">{drill.description}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
              <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Instructions</h3>
              <ol className="space-y-3">
                {drill.instructions.map((instruction, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="shrink-0 w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white">
                      {i + 1}
                    </span>
                    <span className="text-sm text-white/60 leading-relaxed pt-0.5">
                      {instruction}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Phases</h3>
                <div className="space-y-4">
                  {drill.phases.map((phase, i) => (
                    <div key={i}>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {phase.name}
                      </h4>
                      <p className="text-sm text-white/50 mb-2">
                        {phase.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {phase.constraints.map((c) => (
                          <span
                            key={c.label}
                            className="text-xs bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2 py-0.5 rounded-md"
                          >
                            {c.label}: {c.min}&deg;&ndash;{c.max}&deg;
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6">
                <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider mb-4">Details</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-white/40">Category</p>
                    <p className="font-medium text-white">{categoryLabels[drill.category] ?? drill.category}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Duration</p>
                    <p className="font-medium text-white">
                      ~{Math.floor(drill.estimatedDuration / 60)} min
                    </p>
                  </div>
                  <div>
                    <p className="text-white/40">Phases</p>
                    <p className="font-medium text-white">{drill.phases.length}</p>
                  </div>
                  <div>
                    <p className="text-white/40">Key Points</p>
                    <p className="font-medium text-white">
                      {drill.phases.reduce((sum, p) => sum + p.constraints.length, 0)} checkpoints
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Health Protection Notice */}
          <div className="mb-8 rounded-2xl bg-green-500/10 border border-green-500/20 p-6">
            <div className="flex items-start gap-3">
              <svg className="w-6 h-6 text-green-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
              <div>
                <h3 className="text-sm font-semibold text-green-300 mb-1">Health Protection Active</h3>
                <p className="text-sm text-green-400/70">
                  During this drill, CourtCare will monitor your joints for injury risk including
                  shoulder impingement, elbow strain, knee stress, and spinal compression.
                  You will receive real-time alerts if your form enters a danger zone.
                </p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link to={`/session/${drill.slug}`}>
              <Button size="lg" className="min-w-[240px] shadow-lg shadow-brand-500/25">
                Start Safe Session
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
