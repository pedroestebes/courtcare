import { cn } from "@/lib/utils";

interface ProgressItem {
  label: string;
  before: number;
  after: number;
  unit?: string;
}

const progressData: ProgressItem[] = [
  { label: "Form Score", before: 52, after: 88, unit: "" },
  { label: "Injury Risk", before: 45, after: 8, unit: "%" },
  { label: "Shoulder Safety", before: 62, after: 95, unit: "%" },
  { label: "Knee Protection", before: 58, after: 92, unit: "%" },
  { label: "Sessions per Week", before: 3, after: 7, unit: "" },
  { label: "Injuries Prevented", before: 0, after: 9, unit: "" },
];

export function ProgressCard({ className }: { className?: string }) {
  return (
    <div className={cn("rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 p-6", className)}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-semibold text-white/70 uppercase tracking-wider">Your Progress (14 Days)</h3>
        <span className="text-xs text-brand-400 font-medium">Mar 15 → Mar 29</span>
      </div>

      <div className="space-y-4">
        {progressData.map((item) => {
          const improved = item.label === "Injury Risk"
            ? item.after < item.before
            : item.after > item.before;
          const pctChange = item.label === "Injury Risk"
            ? Math.round(((item.before - item.after) / item.before) * 100)
            : Math.round(((item.after - item.before) / (item.before || 1)) * 100);

          return (
            <div key={item.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm text-white/70">{item.label}</span>
                <span className={cn(
                  "text-xs font-bold",
                  improved ? "text-green-400" : "text-red-400"
                )}>
                  {improved ? "↑" : "↓"} {Math.abs(pctChange)}%
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1">
                  <div className="flex items-center justify-between text-xs text-white/30 mb-1">
                    <span>Week 1</span>
                    <span>Now</span>
                  </div>
                  <div className="relative h-2 bg-white/5 rounded-full overflow-hidden">
                    {/* Before bar (dimmed) */}
                    <div
                      className="absolute inset-y-0 left-0 bg-white/10 rounded-full"
                      style={{ width: `${Math.min(100, item.before)}%` }}
                    />
                    {/* After bar (bright) */}
                    <div
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full transition-all duration-1000",
                        improved ? "bg-green-400" : "bg-red-400"
                      )}
                      style={{ width: `${Math.min(100, item.after)}%` }}
                    />
                  </div>
                </div>
                <div className="text-right w-16 shrink-0">
                  <span className="text-xs text-white/30">{item.before}{item.unit}</span>
                  <span className="text-xs text-white/30 mx-1">→</span>
                  <span className={cn("text-xs font-bold", improved ? "text-green-400" : "text-red-400")}>
                    {item.after}{item.unit}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
