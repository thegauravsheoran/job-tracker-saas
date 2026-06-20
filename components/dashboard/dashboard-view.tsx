"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Briefcase,
  MessageSquare,
  XCircle,
  CheckCircle2,
  ArrowRight,
  Calendar,
  TrendingUp,
  Clock,
  Sparkles,
  AlertCircle,
  Trophy,
  Lightbulb,
  Target,
} from "lucide-react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { MOCK_DASHBOARD_METRICS, MOCK_AI_INSIGHTS } from "@/data/mock-analytics";
import { MOCK_APPLICATIONS } from "@/data/mock-applications";
import { MOCK_USER } from "@/data/mock-user";
import { CHART_COLORS, STATUS_CHART_COLORS, RECHARTS_TOOLTIP_STYLE } from "@/lib/chart-colors";
import { formatDateShort, timeAgo } from "@/lib/format";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ─── Custom Tooltip ───────────────────────────────────────────────────────────
function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; name: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-popover p-3 shadow-lg text-xs">
      <p className="font-medium text-popover-foreground mb-2">{label}</p>
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2">
          <span className="size-2 rounded-full" style={{ background: p.color }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-semibold text-popover-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Section Card Wrapper ─────────────────────────────────────────────────────
function SectionCard({
  title,
  action,
  children,
  className,
}: {
  title: string;
  action?: { label: string; href: string };
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {action && (
          <Link href={action.href}>
            <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
              {action.label}
              <ArrowRight className="size-3" />
            </Button>
          </Link>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Application Trend Chart ──────────────────────────────────────────────────
function ApplicationTrendChart({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.monthlyTrends;

  if (loading) {
    return (
      <SectionCard title="Application Trend">
        <div className="p-5">
          <Skeleton className="h-52 w-full" />
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Application Trend"
      action={{ label: "Analytics", href: "/analytics" }}
    >
      <div className="p-5">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="appGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.blue} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.blue} stopOpacity={0} />
              </linearGradient>
              <linearGradient id="intGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={CHART_COLORS.violet} stopOpacity={0.3} />
                <stop offset="95%" stopColor={CHART_COLORS.violet} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              iconType="circle"
              iconSize={6}
              wrapperStyle={{ fontSize: 11, paddingTop: 12 }}
            />
            <Area type="monotone" dataKey="applications" stroke={CHART_COLORS.blue} fill="url(#appGradient)" strokeWidth={2} name="Applications" dot={false} />
            <Area type="monotone" dataKey="interviews" stroke={CHART_COLORS.violet} fill="url(#intGradient)" strokeWidth={2} name="Interviews" dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

// ─── Status Donut Chart ───────────────────────────────────────────────────────
function StatusDistributionChart({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.statusDistribution.filter(
    (d) => d.count > 0
  );

  if (loading) {
    return (
      <SectionCard title="Status Breakdown">
        <div className="p-5 flex justify-center">
          <Skeleton className="size-44 rounded-full" />
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Status Breakdown"
      action={{ label: "View all", href: "/applications" }}
    >
      <div className="p-5">
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="count"
              nameKey="status"
            >
              {data.map((entry) => (
                <Cell
                  key={entry.status}
                  fill={STATUS_CHART_COLORS[entry.status]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              formatter={(v, name) => [v, String(name)]}
              contentStyle={RECHARTS_TOOLTIP_STYLE}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="mt-2 grid grid-cols-2 gap-y-1.5">
          {data.slice(0, 6).map((d) => (
            <div key={d.status} className="flex items-center gap-1.5 text-xs">
              <span
                className="size-2 rounded-full shrink-0"
                style={{ background: STATUS_CHART_COLORS[d.status] }}
              />
              <span className="text-muted-foreground capitalize truncate">
                {d.status}
              </span>
              <span className="ml-auto font-medium text-foreground">{d.count}</span>
            </div>
          ))}
        </div>
      </div>
    </SectionCard>
  );
}

// ─── Weekly Activity Chart ────────────────────────────────────────────────────
function WeeklyActivityChart({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.weeklyActivity;

  if (loading) {
    return (
      <SectionCard title="Weekly Activity">
        <div className="p-5">
          <Skeleton className="h-44 w-full" />
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Weekly Activity"
      action={{ label: "Analytics", href: "/analytics" }}
    >
      <div className="p-5">
        <ResponsiveContainer width="100%" height={180}>
          <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
            <Tooltip content={<ChartTooltip />} />
            <Bar dataKey="applied" name="Applied" fill={CHART_COLORS.blue} radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="interviews" name="Interviews" fill={CHART_COLORS.amber} radius={[3, 3, 0, 0]} maxBarSize={14} />
            <Bar dataKey="rejections" name="Rejections" fill={CHART_COLORS.red} radius={[3, 3, 0, 0]} maxBarSize={14} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </SectionCard>
  );
}

// ─── Application Funnel ───────────────────────────────────────────────────────
function ApplicationFunnel({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.applicationFunnel;

  if (loading) {
    return (
      <SectionCard title="Application Funnel">
        <div className="p-5 space-y-3">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-6 w-full" />
          ))}
        </div>
      </SectionCard>
    );
  }

  const max = data[0]?.count ?? 1;
  const colors = [CHART_COLORS.blue, CHART_COLORS.violet, CHART_COLORS.amber, CHART_COLORS.emerald, CHART_COLORS.cyan, CHART_COLORS.pink];

  return (
    <SectionCard title="Application Funnel">
      <div className="p-5 space-y-3">
        {data.map((stage, i) => (
          <div key={stage.stage}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">{stage.stage}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-foreground">{stage.count}</span>
                {i > 0 && (
                  <span className="text-[10px] text-muted-foreground">
                    ({stage.conversionRate.toFixed(0)}%)
                  </span>
                )}
              </div>
            </div>
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(stage.count / max) * 100}%` }}
                transition={{ duration: 0.7, delay: i * 0.08 }}
                className="h-full rounded-full"
                style={{ background: colors[i] }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
function RecentActivity({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <SectionCard title="Recent Activity">
        <div className="p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="flex items-start gap-3">
              <Skeleton className="size-8 rounded-lg shrink-0" />
              <div className="flex-1">
                <Skeleton className="h-3 w-3/4 mb-1" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    );
  }

  const recent = MOCK_APPLICATIONS.slice(0, 5).map((app) => ({
    id: app.id,
    company: app.companyName,
    role: app.jobTitle,
    status: app.status,
    date: app.updatedAt,
    logo: app.companyLogo,
  }));

  return (
    <SectionCard
      title="Recent Activity"
      action={{ label: "View all", href: "/applications" }}
    >
      <div className="divide-y divide-border">
        {recent.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-3 px-5 py-3 hover:bg-accent/40 transition-colors"
          >
            <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted overflow-hidden">
              {item.logo ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={item.logo}
                  alt={item.company}
                  className="size-7 object-contain"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <span className="text-xs font-bold text-muted-foreground">
                  {item.company[0]}
                </span>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-foreground truncate">
                {item.company}
              </p>
              <p className="text-xs text-muted-foreground truncate">{item.role}</p>
            </div>
            <div className="flex flex-col items-end gap-1 shrink-0">
              <StatusBadge status={item.status} size="sm" />
              <span className="text-[10px] text-muted-foreground">
                {timeAgo(item.date)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}

// ─── Upcoming Interviews ──────────────────────────────────────────────────────
function UpcomingInterviews({ loading }: { loading: boolean }) {
  const upcoming = MOCK_APPLICATIONS.flatMap((app) =>
    app.interviews
      .filter((i) => i.outcome === "pending")
      .map((interview) => ({
        company: app.companyName,
        role: app.jobTitle,
        type: interview.type,
        date: interview.scheduledAt,
        duration: interview.duration,
        logo: app.companyLogo,
      }))
  ).slice(0, 4);

  if (loading) {
    return (
      <SectionCard title="Upcoming Interviews">
        <div className="p-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-16 w-full rounded-lg" />
          ))}
        </div>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Upcoming Interviews"
      action={{ label: "Calendar", href: "/applications" }}
    >
      {upcoming.length === 0 ? (
        <div className="p-8 text-center">
          <Calendar className="size-8 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">No upcoming interviews</p>
        </div>
      ) : (
        <div className="p-4 space-y-2">
          {upcoming.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 p-3"
            >
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Calendar className="size-4 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground">{item.company}</p>
                <p className="text-[10px] text-muted-foreground capitalize">
                  {item.type} interview · {item.duration}min
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-xs font-medium text-foreground">
                  {formatDateShort(item.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}

// ─── AI Recommendations ───────────────────────────────────────────────────────
const INSIGHT_ICONS = {
  tip: Lightbulb,
  warning: AlertCircle,
  opportunity: Target,
  achievement: Trophy,
};

const INSIGHT_COLORS = {
  tip: "text-blue-500 bg-blue-500/10",
  warning: "text-amber-500 bg-amber-500/10",
  opportunity: "text-emerald-500 bg-emerald-500/10",
  achievement: "text-violet-500 bg-violet-500/10",
};

function AiRecommendations({ loading }: { loading: boolean }) {
  if (loading) {
    return (
      <SectionCard title="AI Recommendations">
        <div className="p-4 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-14 w-full rounded-lg" />
          ))}
        </div>
      </SectionCard>
    );
  }

  const insights = MOCK_AI_INSIGHTS.filter((i) => !i.dismissed).slice(0, 4);

  return (
    <SectionCard
      title="AI Recommendations"
      action={{ label: "View all", href: "/ai-insights" }}
    >
      <div className="p-4 space-y-2.5">
        {insights.map((insight) => {
          const Icon = INSIGHT_ICONS[insight.type];
          const colorClass = INSIGHT_COLORS[insight.type];
          return (
            <div
              key={insight.id}
              className="flex items-start gap-3 rounded-lg border border-border p-3 hover:bg-accent/30 transition-colors"
            >
              <div className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg", colorClass)}>
                <Icon className="size-4" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-semibold text-foreground leading-snug">
                  {insight.title}
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground line-clamp-2 leading-relaxed">
                  {insight.description}
                </p>
              </div>
              <Badge
                variant="secondary"
                className="shrink-0 text-[9px] px-1.5 py-0.5 capitalize"
              >
                {insight.priority}
              </Badge>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── Job Search Goals ─────────────────────────────────────────────────────────
function JobSearchGoals() {
  const goals = [
    {
      label: "Applications this week",
      current: 4,
      target: 5,
      color: CHART_COLORS.blue,
    },
    {
      label: "Interviews this month",
      current: 3,
      target: 8,
      color: CHART_COLORS.violet,
    },
    {
      label: "Offers",
      current: 2,
      target: 3,
      color: CHART_COLORS.emerald,
    },
  ];

  return (
    <SectionCard title="Job Search Goals">
      <div className="p-5 space-y-4">
        {goals.map((goal) => {
          const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
          return (
            <div key={goal.label}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs text-muted-foreground">{goal.label}</span>
                <span className="text-xs font-semibold text-foreground">
                  {goal.current}/{goal.target}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full rounded-full"
                  style={{ background: goal.color }}
                />
              </div>
              <p className="mt-1 text-[10px] text-muted-foreground">{pct}% of goal</p>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}

// ─── Main Dashboard View ──────────────────────────────────────────────────────
export function DashboardView() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 900);
    return () => clearTimeout(t);
  }, []);

  const { summary } = MOCK_DASHBOARD_METRICS;
  const user = MOCK_USER.profile;
  const now = new Date();
  const greeting =
    now.getHours() < 12
      ? "Good morning"
      : now.getHours() < 17
        ? "Good afternoon"
        : "Good evening";

  const statCards = [
    {
      label: "Total Applications",
      value: summary.totalApplications,
      icon: Briefcase,
      trend: 12,
      trendLabel: "this month",
      iconClassName: "bg-blue-500 text-white",
    },
    {
      label: "Interviews",
      value: summary.totalInterviews,
      icon: MessageSquare,
      trend: 8,
      trendLabel: "this month",
      iconClassName: "bg-violet-500 text-white",
    },
    {
      label: "Rejections",
      value: MOCK_DASHBOARD_METRICS.statusDistribution.find(
        (d) => d.status === "rejected"
      )?.count ?? 0,
      icon: XCircle,
      trend: -4,
      trendLabel: "this month",
      iconClassName: "bg-red-500 text-white",
    },
    {
      label: "Offers",
      value: summary.offersReceived,
      icon: CheckCircle2,
      trend: 100,
      trendLabel: "this month",
      iconClassName: "bg-emerald-500 text-white",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <motion.h2
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-2xl font-bold tracking-tight text-foreground"
          >
            {greeting}, {user.name.split(" ")[0]} 👋
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-0.5"
          >
            Here&apos;s your job search overview.
          </motion.p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="gap-1.5">
            <TrendingUp className="size-3 text-emerald-500" />
            <span className="text-xs">
              {summary.overallResponseRate.toFixed(0)}% response rate
            </span>
          </Badge>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
          >
            <StatCard {...card} loading={loading} />
          </motion.div>
        ))}
      </div>

      {/* Trend + Distribution */}
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ApplicationTrendChart loading={loading} />
        </div>
        <StatusDistributionChart loading={loading} />
      </div>

      {/* Activity + Funnel */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WeeklyActivityChart loading={loading} />
        <ApplicationFunnel loading={loading} />
      </div>

      {/* Bottom row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <RecentActivity loading={loading} />
        <div className="flex flex-col gap-4">
          <UpcomingInterviews loading={loading} />
          <JobSearchGoals />
        </div>
        <AiRecommendations loading={loading} />
      </div>

      {/* Quick stats footer */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex flex-wrap items-center gap-6 rounded-xl border border-border bg-card px-5 py-4"
        >
          {[
            { icon: Clock, label: "Avg. response time", value: `${summary.averageTimeToResponse} days` },
            { icon: Target, label: "Avg. time to offer", value: `${summary.averageTimeToOffer} days` },
            { icon: TrendingUp, label: "Applications/week", value: summary.applicationVelocity.toFixed(1) },
            { icon: Sparkles, label: "AI credits used", value: "87 / 500" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon className="size-4 text-muted-foreground" />
              <div>
                <p className="text-[10px] text-muted-foreground">{label}</p>
                <p className="text-sm font-semibold text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
