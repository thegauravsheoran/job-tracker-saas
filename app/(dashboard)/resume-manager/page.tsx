import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Resume Manager",
  description:
    "Manage multiple resume versions and track which resumes you used for each application.",
};

export default function ResumeManagerPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resume Manager</h2>
          <p className="text-muted-foreground">
            Manage your resume versions and track their performance.
          </p>
        </div>
        <button className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          + Upload Resume
        </button>
      </div>

      <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <div className="text-4xl">📄</div>
          <h3 className="text-lg font-semibold">Resume manager coming soon</h3>
          <p className="text-sm text-muted-foreground max-w-sm">
            Upload, version, and A/B test multiple resume variants. See which
            version gets the most callbacks, powered by AI analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
