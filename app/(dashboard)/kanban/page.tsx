import type { Metadata } from "next";
import { KanbanView } from "@/components/kanban/kanban-view";

export const metadata: Metadata = {
  title: "Kanban Board",
  description: "Visualize your job application pipeline as a Kanban board.",
};

export default function KanbanPage() {
  return <KanbanView />;
}
