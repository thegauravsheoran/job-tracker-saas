import type { Metadata } from "next";
import { ApplicationsView } from "@/components/applications/applications-view";

export const metadata: Metadata = {
  title: "Applications",
  description: "Manage and track all your job applications.",
};

export default function ApplicationsPage() {
  return <ApplicationsView />;
}
