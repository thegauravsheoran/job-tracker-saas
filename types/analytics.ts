import type { ApplicationStatus } from "./application";

export interface StatusDistribution {
  status: ApplicationStatus;
  count: number;
  percentage: number;
  color: string;
}

export interface WeeklyActivity {
  week: string;
  applied: number;
  interviews: number;
  offers: number;
  rejections: number;
}

export interface MonthlyTrend {
  month: string;
  applications: number;
  interviews: number;
  offers: number;
  responseRate: number;
}

export interface SourceEffectiveness {
  source: string;
  applications: number;
  interviews: number;
  offers: number;
  conversionRate: number;
}

export interface SalaryInsight {
  role: string;
  minSalary: number;
  maxSalary: number;
  avgSalary: number;
  currency: string;
  sampleSize: number;
}

export interface FunnelStage {
  stage: string;
  count: number;
  conversionRate: number;
}

export interface AnalyticsSummary {
  totalApplications: number;
  activeApplications: number;
  totalInterviews: number;
  offersReceived: number;
  overallResponseRate: number;
  averageTimeToResponse: number;
  averageTimeToOffer: number;
  applicationVelocity: number;
}

export interface DashboardMetrics {
  summary: AnalyticsSummary;
  statusDistribution: StatusDistribution[];
  weeklyActivity: WeeklyActivity[];
  monthlyTrends: MonthlyTrend[];
  sourceEffectiveness: SourceEffectiveness[];
  salaryInsights: SalaryInsight[];
  applicationFunnel: FunnelStage[];
}

export interface AiInsight {
  id: string;
  type: "tip" | "warning" | "opportunity" | "achievement";
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  priority: "low" | "medium" | "high";
  createdAt: string;
  dismissed: boolean;
}
