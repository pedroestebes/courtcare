import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { allDrills } from "@/engine/drills/index";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-500/15 text-green-400 border-green-500/20",
  intermediate: "bg-amber-500/15 text-amber-400 border-amber-500/20",
  advanced: "bg-red-500/15 text-red-400 border-red-500/20",
};

const categoryLabels: Record<string, string> = {
  fundamentals: "Fundamentals",
  volleys: "Volleys",
  overhead: "Overhead",
  defense: "Defense",
  attack: "Attack",
  serve: "Serve",
  groundstroke: "Groundstroke",
};

export function DrillLibrary() {
  return (
    <AppShell>
      <div className="min-h-screen bg-gradient-to-b from-brand-950 via-gray-900 to-brand-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Drill Library</h1>
            <p className="text-white/50 mt-1">
              Padel & Tennis drills with real-time joint health monitoring. More sports coming soon.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {allDrills.map((drill) => (
              <div key={drill.slug} className="flex flex-col rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6 hover:bg-white/8 hover:border-white/20 transition-all duration-300 group">
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center shadow-lg",
                      drill.slug.startsWith("tennis") ? "bg-gradient-to-br from-green-500 to-emerald-600" : "bg-gradient-to-br from-brand-500 to-accent-500"
                    )}>
                      <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        {drill.category === "serve" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
                        ) : drill.category === "fundamentals" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                        ) : drill.category === "attack" || drill.category === "overhead" ? (
                          <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                        ) : (
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                        )}
                      </svg>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-white/40 font-medium">
                        {categoryLabels[drill.category] ?? drill.category}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-medium px-2.5 py-0.5 rounded-full capitalize border",
                          difficultyColors[drill.difficulty]
                        )}
                      >
                        {drill.difficulty}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-brand-300 transition-colors">
                    {drill.name}
                  </h3>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">
                    {drill.shortDescription}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-white/40 mb-3">
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                      </svg>
                      {Math.floor(drill.estimatedDuration / 60)} min
                    </span>
                    <span className="flex items-center gap-1">
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
                      </svg>
                      {drill.phases.length} phase{drill.phases.length > 1 ? "s" : ""}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-green-400 bg-green-500/10 border border-green-500/15 rounded-lg px-3 py-1.5 mb-4">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                    </svg>
                    <span>
                      Monitors{" "}
                      {[...new Set(drill.phases.flatMap(p => p.constraints.map(c => {
                        const key = c.joint as string;
                        if (key.includes("Shoulder") || key.includes("shoulder")) return "shoulder";
                        if (key.includes("Elbow") || key.includes("elbow")) return "elbow";
                        if (key.includes("Knee") || key.includes("knee")) return "knee";
                        if (key.includes("Hip") || key.includes("hip")) return "hip";
                        if (key.includes("Wrist") || key.includes("wrist")) return "wrist";
                        if (key.includes("torso")) return "spine";
                        return key;
                      })))].join(", ")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <Link to={`/drills/${drill.slug}`} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full border-white/20 text-white/70 hover:bg-white/10 hover:text-white">
                      Details
                    </Button>
                  </Link>
                  <Link to={`/session/${drill.slug}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      Start
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
