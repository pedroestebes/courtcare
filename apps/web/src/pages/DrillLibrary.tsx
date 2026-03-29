import { Link } from "react-router-dom";
import { AppShell } from "@/components/layout/AppShell";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { allDrills } from "@/engine/drills/index";
import { cn } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-green-100 text-green-700",
  intermediate: "bg-yellow-100 text-yellow-700",
  advanced: "bg-red-100 text-red-700",
};

const categoryLabels: Record<string, string> = {
  fundamentals: "Fundamentals",
  volleys: "Volleys",
  overhead: "Overhead",
  defense: "Defense",
  attack: "Attack",
};

export function DrillLibrary() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Drill Library</h1>
          <p className="text-gray-600 mt-1">
            Choose a drill to practice. Each one focuses on a specific padel technique.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {allDrills.map((drill) => (
            <Card key={drill.slug} className="flex flex-col">
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <span className="text-4xl">{drill.thumbnailEmoji}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 font-medium">
                      {categoryLabels[drill.category] ?? drill.category}
                    </span>
                    <span
                      className={cn(
                        "text-xs font-medium px-2.5 py-0.5 rounded-full capitalize",
                        difficultyColors[drill.difficulty]
                      )}
                    >
                      {drill.difficulty}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {drill.name}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {drill.shortDescription}
                </p>

                <div className="flex items-center gap-4 text-xs text-gray-500 mb-6">
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
              </div>

              <div className="flex gap-3">
                <Link to={`/drills/${drill.slug}`} className="flex-1">
                  <Button variant="outline" size="sm" className="w-full">
                    Details
                  </Button>
                </Link>
                <Link to={`/session/${drill.slug}`} className="flex-1">
                  <Button size="sm" className="w-full">
                    Start
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
