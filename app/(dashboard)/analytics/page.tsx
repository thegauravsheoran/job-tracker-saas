import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Deep insights into your job search performance and trends.",
};

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
        <p className="text-muted-foreground">
          Deep insights into your job search performance and trends.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[
          "Application Funnel",
          "Weekly Activity",
          "Source Effectiveness",
          "Monthly Trends",
          "Salary Insights",
          "Status Distribution",
        ].map((chart) => (
          <div
            key={chart}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <h3 className="text-sm font-semibold mb-1">{chart}</h3>
            <div className="h-32 rounded-lg bg-muted/50 flex items-center justify-center">
              <p className="text-xs text-muted-foreground">📈 Chart coming soon</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
