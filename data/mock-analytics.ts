import type { DashboardMetrics, AiInsight } from "@/types/analytics";

export const MOCK_DASHBOARD_METRICS: DashboardMetrics = {
  summary: {
    totalApplications: 34,
    activeApplications: 12,
    totalInterviews: 18,
    offersReceived: 2,
    overallResponseRate: 52.9,
    averageTimeToResponse: 8.4,
    averageTimeToOffer: 31,
    applicationVelocity: 6.8,
  },

  statusDistribution: [
    {
      status: "bookmarked",
      count: 4,
      percentage: 11.8,
      color: "#94a3b8",
    },
    {
      status: "applying",
      count: 2,
      percentage: 5.9,
      color: "#3b82f6",
    },
    {
      status: "applied",
      count: 6,
      percentage: 17.6,
      color: "#6366f1",
    },
    {
      status: "screening",
      count: 3,
      percentage: 8.8,
      color: "#8b5cf6",
    },
    {
      status: "interviewing",
      count: 5,
      percentage: 14.7,
      color: "#f59e0b",
    },
    {
      status: "offer",
      count: 2,
      percentage: 5.9,
      color: "#10b981",
    },
    {
      status: "accepted",
      count: 1,
      percentage: 2.9,
      color: "#22c55e",
    },
    {
      status: "rejected",
      count: 9,
      percentage: 26.5,
      color: "#ef4444",
    },
    {
      status: "withdrawn",
      count: 2,
      percentage: 5.9,
      color: "#9ca3af",
    },
  ],

  weeklyActivity: [
    { week: "May 5", applied: 3, interviews: 1, offers: 0, rejections: 1 },
    { week: "May 12", applied: 5, interviews: 2, offers: 0, rejections: 2 },
    { week: "May 19", applied: 4, interviews: 3, offers: 1, rejections: 1 },
    { week: "May 26", applied: 6, interviews: 2, offers: 0, rejections: 3 },
    { week: "Jun 2", applied: 7, interviews: 4, offers: 0, rejections: 1 },
    { week: "Jun 9", applied: 5, interviews: 3, offers: 1, rejections: 1 },
    { week: "Jun 16", applied: 4, interviews: 3, offers: 0, rejections: 0 },
  ],

  monthlyTrends: [
    {
      month: "Jan",
      applications: 8,
      interviews: 2,
      offers: 0,
      responseRate: 25,
    },
    {
      month: "Feb",
      applications: 12,
      interviews: 5,
      offers: 0,
      responseRate: 41.7,
    },
    {
      month: "Mar",
      applications: 15,
      interviews: 7,
      offers: 1,
      responseRate: 46.7,
    },
    {
      month: "Apr",
      applications: 10,
      interviews: 6,
      offers: 0,
      responseRate: 60,
    },
    {
      month: "May",
      applications: 18,
      interviews: 8,
      offers: 1,
      responseRate: 44.4,
    },
    {
      month: "Jun",
      applications: 16,
      interviews: 9,
      offers: 2,
      responseRate: 56.3,
    },
  ],

  sourceEffectiveness: [
    {
      source: "LinkedIn",
      applications: 14,
      interviews: 7,
      offers: 1,
      conversionRate: 7.1,
    },
    {
      source: "Referral",
      applications: 5,
      interviews: 4,
      offers: 1,
      conversionRate: 20,
    },
    {
      source: "Company Website",
      applications: 8,
      interviews: 4,
      offers: 0,
      conversionRate: 0,
    },
    {
      source: "Indeed",
      applications: 4,
      interviews: 2,
      offers: 0,
      conversionRate: 0,
    },
    {
      source: "HackerNews",
      applications: 2,
      interviews: 1,
      offers: 0,
      conversionRate: 0,
    },
    {
      source: "Other",
      applications: 1,
      interviews: 0,
      offers: 0,
      conversionRate: 0,
    },
  ],

  salaryInsights: [
    {
      role: "Staff Engineer",
      minSalary: 180000,
      maxSalary: 350000,
      avgSalary: 255000,
      currency: "USD",
      sampleSize: 8,
    },
    {
      role: "Senior Engineer",
      minSalary: 150000,
      maxSalary: 240000,
      avgSalary: 195000,
      currency: "USD",
      sampleSize: 14,
    },
    {
      role: "Principal Engineer",
      minSalary: 220000,
      maxSalary: 380000,
      avgSalary: 295000,
      currency: "USD",
      sampleSize: 5,
    },
  ],

  applicationFunnel: [
    { stage: "Bookmarked", count: 34, conversionRate: 100 },
    { stage: "Applied", count: 25, conversionRate: 73.5 },
    { stage: "Screening", count: 13, conversionRate: 52 },
    { stage: "Interviewing", count: 9, conversionRate: 69.2 },
    { stage: "Offer", count: 3, conversionRate: 33.3 },
    { stage: "Accepted", count: 1, conversionRate: 33.3 },
  ],
};

export const MOCK_AI_INSIGHTS: AiInsight[] = [
  {
    id: "insight_01",
    type: "opportunity",
    title: "Referrals convert 3x better",
    description:
      "Your referral applications have a 20% offer rate vs 5% for cold applications. Consider reaching out to your network for more warm introductions.",
    actionLabel: "View referral applications",
    actionHref: "/applications?source=Referral",
    priority: "high",
    createdAt: "2026-06-16T08:00:00Z",
    dismissed: false,
  },
  {
    id: "insight_02",
    type: "tip",
    title: "Apply earlier in the week",
    description:
      "Applications submitted Monday-Wednesday receive 40% more responses than those sent Thursday-Friday based on your data.",
    priority: "medium",
    createdAt: "2026-06-15T10:00:00Z",
    dismissed: false,
  },
  {
    id: "insight_03",
    type: "warning",
    title: "3 applications with no follow-up",
    description:
      "You have applications at Shopify, Linear, and Notion that haven't been followed up on in 7+ days. A timely follow-up increases response rates by 30%.",
    actionLabel: "View stale applications",
    actionHref: "/applications?filter=stale",
    priority: "high",
    createdAt: "2026-06-14T09:00:00Z",
    dismissed: false,
  },
  {
    id: "insight_04",
    type: "achievement",
    title: "Best week yet — 7 applications!",
    description:
      "You applied to 7 jobs last week, your personal best. Your response rate is also up 23% over the past 2 weeks.",
    priority: "low",
    createdAt: "2026-06-13T16:00:00Z",
    dismissed: false,
  },
  {
    id: "insight_05",
    type: "tip",
    title: "Developer tools roles perform best for you",
    description:
      "Applications to developer tools companies (Vercel, Linear, GitHub) have a 67% interview rate vs 38% for other categories.",
    priority: "medium",
    createdAt: "2026-06-12T11:00:00Z",
    dismissed: false,
  },
];
