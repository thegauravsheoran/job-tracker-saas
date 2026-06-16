import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications",
  description: "Manage and track all your job applications.",
};

export default function ApplicationsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground">
            Track and manage all your job applications.
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          + Add Application
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="text-4xl">📋</div>
          <h3 className="text-lg font-semibold">Applications table coming soon</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            A filterable, sortable table with status management, bulk actions,
            and inline editing will be built here.
          </p>
        </div>
      </div>
    </div>
  );
}
