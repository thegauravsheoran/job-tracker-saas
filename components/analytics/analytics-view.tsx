"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  MessageSquare,
  CheckCircle2,
  XCircle,
  Briefcase,
  Target,
  Zap,
  BarChart2,
  Minus,
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
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { StatCard } from "@/components/shared/stat-card";
import { MOCK_DASHBOARD_METRICS, MOCK_AI_INSIGHTS } from "@/data/mock-analytics";
import { CHART_COLORS, STATUS_CHART_COLORS, RECHARTS_TOOLTIP_STYLE } from "@/lib/chart-colors";
import { cn } from "@/lib/utils";

// ─── Chart tooltip ────────────────────────────────────────────────────────────
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
      {label && <p className="font-medium text-popover-foreground mb-1.5">{label}</p>}
      {payload.map((p) => (
        <div key={p.name} className="flex items-center gap-2 text-[11px]">
          <span className="size-2 rounded-full shrink-0" style={{ background: p.color }} />
          <span className="text-muted-foreground capitalize">{p.name}:</span>
          <span className="font-semibold text-popover-foreground">{p.value}</span>
        </div>
      ))}
    </div>
  );
}

// ─── Chart card wrapper ───────────────────────────────────────────────────────
function ChartCard({
  title,
  subtitle,
  children,
  className,
  loading = false,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  loading?: boolean;
}) {
  return (
    <div className={cn("rounded-xl border border-border bg-card", className)}>
      <div className="border-b border-border px-5 py-4">
        <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
        )}
      </div>
      <div className="p-5">
        {loading ? <Skeleton className="h-52 w-full" /> : children}
      </div>
    </div>
  );
}

// ─── KPI Cards ────────────────────────────────────────────────────────────────
function KpiCards({ loading }: { loading: boolean }) {
  const { summary } = MOCK_DASHBOARD_METRICS;

  const cards = [
    {
      label: "Total Applications",
      value: summary.totalApplications,
      icon: Briefcase,
      trend: 18,
      trendLabel: "vs last month",
      iconClassName: "bg-blue-500 text-white",
    },
    {
      label: "Interview Rate",
      value: `${summary.overallResponseRate.toFixed(1)}%`,
      icon: MessageSquare,
      trend: 12,
      trendLabel: "vs last month",
      iconClassName: "bg-violet-500 text-white",
    },
    {
      label: "Offers Received",
      value: summary.offersReceived,
      icon: CheckCircle2,
      trend: 100,
      trendLabel: "vs last month",
      iconClassName: "bg-emerald-500 text-white",
    },
    {
      label: "Rejection Rate",
      value: "26.5%",
      icon: XCircle,
      trend: -8,
      trendLabel: "vs last month",
      iconClassName: "bg-red-500 text-white",
    },
    {
      label: "Avg. Response Time",
      value: `${summary.averageTimeToResponse}d`,
      icon: Target,
      trend: -15,
      trendLabel: "faster this month",
      iconClassName: "bg-amber-500 text-white",
    },
    {
      label: "Applications/Week",
      value: summary.applicationVelocity.toFixed(1),
      icon: Zap,
      trend: 23,
      trendLabel: "vs last month",
      iconClassName: "bg-cyan-500 text-white",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {cards.map((card, i) => (
        <motion.div
          key={card.label}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
        >
          <StatCard {...card} loading={loading} />
        </motion.div>
      ))}
    </div>
  );
}

// ─── Monthly Applications Chart ───────────────────────────────────────────────
function MonthlyApplicationsChart({ loading }: { loading: boolean }) {
  return (
    <ChartCard
      title="Applications Over Time"
      subtitle="Monthly application volume and interview conversion"
      loading={loading}
      className="lg:col-span-2"
    >
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart
          data={MOCK_DASHBOARD_METRICS.monthlyTrends}
          margin={{ top: 4, right: 4, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="aGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.blue} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.blue} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="iGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.violet} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.violet} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="oGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.emerald} stopOpacity={0.25} />
              <stop offset="95%" stopColor={CHART_COLORS.emerald} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="month" tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <Tooltip content={<ChartTooltip />} />
          <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 11 }} />
          <Area type="monotone" dataKey="applications" stroke={CHART_COLORS.blue} fill="url(#aGrad)" strokeWidth={2} name="Applications" dot={false} />
          <Area type="monotone" dataKey="interviews" stroke={CHART_COLORS.violet} fill="url(#iGrad)" strokeWidth={2} name="Interviews" dot={false} />
          <Area type="monotone" dataKey="offers" stroke={CHART_COLORS.emerald} fill="url(#oGrad)" strokeWidth={2} name="Offers" dot={false} />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Status Distribution ──────────────────────────────────────────────────────
function StatusDistributionChart({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.statusDistribution.filter((d) => d.count > 0);

  return (
    <ChartCard
      title="Status Distribution"
      subtitle="Applications by current stage"
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="45%"
            outerRadius={75}
            innerRadius={45}
            paddingAngle={2}
            dataKey="count"
            nameKey="status"
          >
            {data.map((entry) => (
              <Cell key={entry.status} fill={STATUS_CHART_COLORS[entry.status]} stroke="transparent" />
            ))}
          </Pie>
          <Tooltip
            formatter={(v, name) => [v, String(name)]}
            contentStyle={RECHARTS_TOOLTIP_STYLE}
          />
          <Legend
            iconType="circle"
            iconSize={7}
            wrapperStyle={{ fontSize: 10 }}
            formatter={(value) => String(value).charAt(0).toUpperCase() + String(value).slice(1)}
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Source Effectiveness ─────────────────────────────────────────────────────
function SourceEffectivenessChart({ loading }: { loading: boolean }) {
  return (
    <ChartCard
      title="Source Effectiveness"
      subtitle="Application volume and interviews by source"
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={MOCK_DASHBOARD_METRICS.sourceEffectiveness}
          layout="vertical"
          margin={{ top: 0, right: 20, left: -10, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" horizontal={false} />
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="source" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} width={80} />
          <Tooltip content={<ChartTooltip />} />
          <Bar dataKey="applications" name="Applications" fill={CHART_COLORS.blue} radius={[0, 4, 4, 0]} maxBarSize={10} />
          <Bar dataKey="interviews" name="Interviews" fill={CHART_COLORS.violet} radius={[0, 4, 4, 0]} maxBarSize={10} />
          <Bar dataKey="offers" name="Offers" fill={CHART_COLORS.emerald} radius={[0, 4, 4, 0]} maxBarSize={10} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Conversion Funnel ────────────────────────────────────────────────────────
function ConversionFunnel({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.applicationFunnel;
  const max = data[0]?.count ?? 1;
  const colors = [CHART_COLORS.blue, CHART_COLORS.violet, CHART_COLORS.amber, CHART_COLORS.emerald, CHART_COLORS.cyan, CHART_COLORS.pink];

  if (loading) {
    return (
      <ChartCard title="Conversion Funnel" loading={true}>
        <></>
      </ChartCard>
    );
  }

  return (
    <ChartCard
      title="Conversion Funnel"
      subtitle="Pipeline drop-off at each stage"
    >
      <div className="space-y-3">
        {data.map((stage, i) => {
          const pct = (stage.count / max) * 100;
          return (
            <div key={stage.stage}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-muted-foreground">{stage.stage}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">{stage.count}</span>
                  {i > 0 && (
                    <span className="text-[10px] text-muted-foreground">
                      {stage.conversionRate.toFixed(0)}% conv.
                    </span>
                  )}
                </div>
              </div>
              <div className="h-2.5 rounded-full bg-muted overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.8, delay: i * 0.1 }}
                  className="h-full rounded-full"
                  style={{ background: colors[i] }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </ChartCard>
  );
}

// ─── Salary Insights ──────────────────────────────────────────────────────────
function SalaryInsightsChart({ loading }: { loading: boolean }) {
  const data = MOCK_DASHBOARD_METRICS.salaryInsights.map((s) => ({
    ...s,
    min: s.minSalary / 1000,
    max: s.maxSalary / 1000,
    avg: s.avgSalary / 1000,
  }));

  return (
    <ChartCard
      title="Salary Ranges by Role"
      subtitle="Min / avg / max salary ranges (in $K)"
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} margin={{ top: 4, right: 8, left: -15, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
          <XAxis dataKey="role" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="k" />
          <Tooltip
            formatter={(v: unknown) => [`$${Number(v)}k`]}
            contentStyle={RECHARTS_TOOLTIP_STYLE}
          />
          <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
          <Bar dataKey="min" name="Min" fill={CHART_COLORS.slate} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="avg" name="Avg" fill={CHART_COLORS.blue} radius={[4, 4, 0, 0]} maxBarSize={18} />
          <Bar dataKey="max" name="Max" fill={CHART_COLORS.violet} radius={[4, 4, 0, 0]} maxBarSize={18} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Performance Radar ────────────────────────────────────────────────────────
function PerformanceRadar({ loading }: { loading: boolean }) {
  const data = [
    { subject: "Volume", A: 78 },
    { subject: "Response", A: 53 },
    { subject: "Interviews", A: 82 },
    { subject: "Offers", A: 40 },
    { subject: "Network", A: 65 },
    { subject: "Quality", A: 88 },
  ];

  return (
    <ChartCard
      title="Search Performance"
      subtitle="Overall job search health metrics"
      loading={loading}
    >
      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={data} cx="50%" cy="50%">
          <PolarGrid stroke="hsl(var(--border))" />
          <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
          <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Performance"
            dataKey="A"
            stroke={CHART_COLORS.blue}
            fill={CHART_COLORS.blue}
            fillOpacity={0.15}
            strokeWidth={2}
          />
          <Tooltip contentStyle={RECHARTS_TOOLTIP_STYLE} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

// ─── Insights Cards ───────────────────────────────────────────────────────────
function InsightCards() {
  const insights = MOCK_AI_INSIGHTS.slice(0, 4);

  return (
    <div>
      <h3 className="text-sm font-semibold mb-3">AI-Powered Insights</h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {insights.map((insight, i) => {
          const typeColors: Record<string, string> = {
            tip: "border-blue-200 bg-blue-50/50 dark:border-blue-900 dark:bg-blue-950/30",
            warning: "border-amber-200 bg-amber-50/50 dark:border-amber-900 dark:bg-amber-950/30",
            opportunity: "border-emerald-200 bg-emerald-50/50 dark:border-emerald-900 dark:bg-emerald-950/30",
            achievement: "border-violet-200 bg-violet-50/50 dark:border-violet-900 dark:bg-violet-950/30",
          };
          const badgeColors: Record<string, string> = {
            high: "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
            medium: "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400",
            low: "bg-muted text-muted-foreground",
          };
          const TrendIcon = insight.type === "achievement" ? TrendingUp : insight.type === "warning" ? TrendingDown : Minus;
          const trendColor = insight.type === "achievement" ? "text-emerald-500" : insight.type === "warning" ? "text-red-500" : "text-muted-foreground";

          return (
            <motion.div
              key={insight.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={cn(
                "rounded-xl border p-4",
                typeColors[insight.type]
              )}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="text-sm font-semibold text-foreground leading-snug">
                  {insight.title}
                </p>
                <div className="flex items-center gap-1 shrink-0">
                  <TrendIcon className={cn("size-3.5", trendColor)} />
                  <span className={cn("text-[10px] font-medium rounded-full px-1.5 py-0.5", badgeColors[insight.priority])}>
                    {insight.priority}
                  </span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {insight.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Conversion Rate Cards ────────────────────────────────────────────────────
function ConversionRateCards() {
  const rates = [
    { label: "Application → Screening", rate: 52.0, color: CHART_COLORS.blue, trend: +5 },
    { label: "Screening → Interview", rate: 69.2, color: CHART_COLORS.violet, trend: +12 },
    { label: "Interview → Offer", rate: 33.3, color: CHART_COLORS.emerald, trend: +8 },
    { label: "Overall Offer Rate", rate: 8.8, color: CHART_COLORS.amber, trend: +3 },
  ];

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {rates.map((r, i) => (
        <motion.div
          key={r.label}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 }}
          className="rounded-xl border border-border bg-card p-4"
        >
          <p className="text-[11px] font-medium text-muted-foreground mb-2">{r.label}</p>
          <p className="text-2xl font-bold text-foreground">{r.rate.toFixed(1)}%</p>
          <div className="mt-3 h-1.5 rounded-full bg-muted overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${r.rate}%` }}
              transition={{ duration: 0.9, delay: i * 0.1 }}
              className="h-full rounded-full"
              style={{ background: r.color }}
            />
          </div>
          <div className="mt-1.5 flex items-center gap-1 text-[10px]">
            <TrendingUp className="size-3 text-emerald-500" />
            <span className="text-emerald-600">+{r.trend}%</span>
            <span className="text-muted-foreground">vs last month</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export function AnalyticsView() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Analytics</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Deep insights into your job search performance
          </p>
        </div>
        <Badge variant="secondary" className="gap-1.5">
          <BarChart2 className="size-3 text-blue-500" />
          <span className="text-xs">Updated just now</span>
        </Badge>
      </div>

      {/* KPI row */}
      <KpiCards loading={loading} />

      {/* Conversion rates */}
      <div>
        <h3 className="text-sm font-semibold mb-3">Conversion Rates</h3>
        <ConversionRateCards />
      </div>

      {/* Charts row 1 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <MonthlyApplicationsChart loading={loading} />
        <StatusDistributionChart loading={loading} />
      </div>

      {/* Charts row 2 */}
      <div className="grid gap-4 lg:grid-cols-3">
        <SourceEffectivenessChart loading={loading} />
        <ConversionFunnel loading={loading} />
      </div>

      {/* Charts row 3 */}
      <div className="grid gap-4 lg:grid-cols-2">
        <SalaryInsightsChart loading={loading} />
        <PerformanceRadar loading={loading} />
      </div>

      {/* AI Insights */}
      <InsightCards />
    </div>
  );
}
