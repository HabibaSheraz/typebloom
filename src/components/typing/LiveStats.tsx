import type { TypingMetrics } from "@/features/typing-engine/typingEngine";

interface LiveStatsProps {
  metrics: TypingMetrics;
}

export function LiveStats({ metrics }: LiveStatsProps) {
  const stats = [
    ["WPM", metrics.netWpm.toFixed(1)],
    ["Raw", metrics.rawWpm.toFixed(1)],
    ["Accuracy", `${metrics.accuracy.toFixed(1)}%`],
    ["Errors", `${metrics.errors}`],
    ["Time", `${metrics.elapsedSeconds.toFixed(1)}s`],
    ["Consistency", `${metrics.consistency.toFixed(1)}%`]
  ];

  return (
    <aside className="panel p-5">
      <h2 className="text-lg font-bold">Live Metrics</h2>
      <div className="mt-4 grid gap-3">
        {stats.map(([label, value]) => (
          <div key={label} className="flex items-center justify-between rounded-xl bg-bloom-black/40 px-4 py-3">
            <span className="text-sm text-bloom-muted">{label}</span>
            <strong className="font-mono text-bloom-blush">{value}</strong>
          </div>
        ))}
      </div>
    </aside>
  );
}
