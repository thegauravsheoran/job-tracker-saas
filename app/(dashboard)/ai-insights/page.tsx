import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Insights",
  description:
    "AI-powered recommendations and insights to optimize your job search strategy.",
};

export default function AiInsightsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
        <p className="text-muted-foreground">
          Personalized recommendations powered by AI to optimize your job
          search.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          {
            type: "opportunity",
            icon: "🎯",
            title: "Referrals convert 3x better",
            desc: "Your referral applications have a 20% offer rate vs 5% for cold applications.",
          },
          {
            type: "warning",
            icon: "⚠️",
            title: "3 applications need follow-up",
            desc: "You have applications at Shopify, Linear, and Notion that haven't been followed up on in 7+ days.",
          },
          {
            type: "tip",
            icon: "💡",
            title: "Apply earlier in the week",
            desc: "Applications submitted Monday–Wednesday receive 40% more responses.",
          },
          {
            type: "achievement",
            icon: "🏆",
            title: "Best week yet — 7 applications!",
            desc: "Your response rate is also up 23% over the past 2 weeks.",
          },
        ].map((insight) => (
          <div
            key={insight.title}
            className="rounded-xl border border-border bg-card p-5 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{insight.icon}</span>
              <div>
                <h3 className="text-sm font-semibold">{insight.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {insight.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
