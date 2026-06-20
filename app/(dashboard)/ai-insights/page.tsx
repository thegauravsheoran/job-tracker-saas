import type { Metadata } from "next";
import { AiInsightsView } from "@/components/ai-insights/ai-insights-view";

export const metadata: Metadata = {
  title: "AI Insights",
  description:
    "AI-powered career recommendations — skill gap analysis, market trends, and interview prep.",
};

export default function AiInsightsPage() {
  return <AiInsightsView />;
}
