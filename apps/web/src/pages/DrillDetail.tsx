import { useParams, Link, Navigate } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { getDrill } from "@/engine/drills/index";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

export function DrillDetail() {
  const { slug } = useParams<{ slug: string }>();
  const drill = slug ? getDrill(slug) : undefined;

  if (!drill) {
    return <Navigate to="/drills" replace />;
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/drills"
          className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-6"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
          </svg>
          Back to Drills
        </Link>

        <div className="flex items-start gap-4 mb-8">
          <span className="text-5xl">{drill.thumbnailEmoji}</span>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{drill.name}</h1>
              <span
                className={cn(
                  "text-xs font-medium px-3 py-1 rounded-full capitalize",
                  difficultyColors[drill.difficulty]
                )}
              >
                {drill.difficulty}
              </span>
            </div>
            <p className="text-gray-600 leading-relaxed">{drill.description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card header="Instructions">
            <ol className="space-y-3">
              {drill.instructions.map((instruction, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-6 h-6 rounded-full gradient-brand flex items-center justify-center text-xs font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="text-sm text-gray-700 leading-relaxed pt-0.5">
                    {instruction}
                  </span>
                </li>
              ))}
            </ol>
          </Card>

          <div className="space-y-6">
            <Card header="Phases">
              <div className="space-y-4">
                {drill.phases.map((phase, i) => (
                  <div key={i}>
                    <h4 className="text-sm font-semibold text-gray-900 mb-1">
                      {phase.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {phase.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {phase.constraints.map((c) => (
                        <span
                          key={c.label}
                          className="text-xs bg-brand-50 text-brand-700 px-2 py-0.5 rounded-md"
                        >
                          {c.label}: {c.min}&deg;&ndash;{c.max}&deg;
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card header="Details">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500">Category</p>
                  <p className="font-medium text-gray-900 capitalize">{drill.category}</p>
                </div>
                <div>
                  <p className="text-gray-500">Duration</p>
                  <p className="font-medium text-gray-900">
                    ~{Math.floor(drill.estimatedDuration / 60)} min
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Phases</p>
                  <p className="font-medium text-gray-900">{drill.phases.length}</p>
                </div>
                <div>
                  <p className="text-gray-500">Key Points</p>
                  <p className="font-medium text-gray-900">
                    {drill.phases.reduce((sum, p) => sum + p.constraints.length, 0)} checkpoints
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <div className="text-center">
          <Link to={`/session/${drill.slug}`}>
            <Button size="lg" className="min-w-[240px] shadow-lg shadow-brand-500/25">
              Start Session
            </Button>
          </Link>
        </div>
      </div>
    </AppShell>
  );
}
