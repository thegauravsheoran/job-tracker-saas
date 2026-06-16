import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Visualize your job application pipeline as a Kanban board.",
};

export default function KanbanPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Kanban Board</h2>
        <p className="text-muted-foreground">
          Drag and drop your applications through the hiring pipeline.
        </p>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {[
          "Bookmarked",
          "Applying",
          "Applied",
          "Screening",
          "Interviewing",
          "Offer",
        ].map((col) => (
          <div
            key={col}
            className="min-w-64 rounded-xl border border-border bg-muted/40 p-4 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold">{col}</h3>
              <span className="flex size-5 items-center justify-center rounded-full bg-border text-[10px] font-bold text-muted-foreground">
                0
              </span>
            </div>
            <div className="min-h-24 rounded-lg border-2 border-dashed border-border flex items-center justify-center">
              <p className="text-xs text-muted-foreground">Drop here</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
