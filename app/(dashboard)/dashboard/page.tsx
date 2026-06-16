import type { Metadata } from "next";
import { META_CONFIG } from "@/lib/config";

export const metadata: Metadata = {
  title: { ...META_CONFIG.title, default: "Dashboard" },
  description: "Overview of your job search activity and key metrics.",
};

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here&apos;s your job search overview.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Applications", value: "34" },
          { label: "Active Applications", value: "12" },
          { label: "Interviews", value: "18" },
          { label: "Offers", value: "2" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6 shadow-sm"
          >
            <p className="text-sm font-medium text-muted-foreground">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold text-card-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
        <p className="text-sm text-muted-foreground">
          📊 Analytics charts and recent activity will be implemented here.
        </p>
      </div>
    </div>
  );
}
