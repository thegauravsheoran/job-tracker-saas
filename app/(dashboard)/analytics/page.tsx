import type { Metadata } from "next";
import { AnalyticsView } from "@/components/analytics/analytics-view";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Deep insights into your job search performance and trends.",
};

export default function AnalyticsPage() {
  return <AnalyticsView />;
}
