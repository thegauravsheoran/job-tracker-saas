"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Target,
  TrendingUp,
  AlertCircle,
  Trophy,
  Lightbulb,
  BookOpen,
  Users,
  Zap,
  CheckCircle2,
  ArrowRight,
  BarChart2,
  Brain,
  Globe,
  Star,
} from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MOCK_AI_INSIGHTS } from "@/data/mock-analytics";
import { MOCK_USER } from "@/data/mock-user";
import { CHART_COLORS, RECHARTS_TOOLTIP_STYLE } from "@/lib/chart-colors";
import { cn } from "@/lib/utils";

// ─── Insight type config ──────────────────────────────────────────────────────
const INSIGHT_CONFIG = {
  tip: {
    icon: Lightbulb,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-200 dark:border-blue-900",
    cardBg: "bg-blue-50/50 dark:bg-blue-950/20",
  },
  warning: {
    icon: AlertCircle,
    color: "text-amber-500",
    bg: "bg-amber-500/10",
    border: "border-amber-200 dark:border-amber-900",
    cardBg: "bg-amber-50/50 dark:bg-amber-950/20",
  },
  opportunity: {
    icon: Target,
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-200 dark:border-emerald-900",
    cardBg: "bg-emerald-50/50 dark:bg-emerald-950/20",
  },
  achievement: {
    icon: Trophy,
    color: "text-violet-500",
    bg: "bg-violet-500/10",
    border: "border-violet-200 dark:border-violet-900",
    cardBg: "bg-violet-50/50 dark:bg-violet-950/20",
  },
} as const;

// ─── Insight Card ─────────────────────────────────────────────────────────────
function InsightCard({ insight, index }: { insight: (typeof MOCK_AI_INSIGHTS)[0]; index: number }) {
  const [dismissed, setDismissed] = useState(insight.dismissed);
  const config = INSIGHT_CONFIG[insight.type];
  const Icon = config.icon;

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.08 }}
      className={cn(
        "rounded-xl border p-5",
        config.border,
        config.cardBg
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", config.bg)}>
          <Icon className={cn("size-5", config.color)} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className="text-sm font-semibold text-foreground leading-snug">
              {insight.title}
            </h4>
            <div className="flex items-center gap-1.5 shrink-0">
              <Badge
                variant="secondary"
                className={cn(
                  "text-[10px] px-1.5 py-0.5 capitalize",
                  insight.priority === "high" && "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400",
                  insight.priority === "medium" && "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                )}
              >
                {insight.priority}
              </Badge>
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed">
            {insight.description}
          </p>

          <div className="mt-3 flex items-center gap-2">
            {insight.actionLabel && (
              <Button size="sm" variant="outline" className="h-7 gap-1.5 text-xs">
                {insight.actionLabel}
                <ArrowRight className="size-3" />
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              className="h-7 text-xs text-muted-foreground"
              onClick={() => setDismissed(true)}
            >
              Dismiss
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Skill Gap Radar ──────────────────────────────────────────────────────────
const SKILL_DATA = [
  { skill: "TypeScript", current: 92, market: 85 },
  { skill: "React", current: 90, market: 90 },
  { skill: "System Design", current: 72, market: 88 },
  { skill: "Node.js", current: 78, market: 75 },
  { skill: "AI/ML APIs", current: 45, market: 72 },
  { skill: "Infra/DevOps", current: 58, market: 68 },
];

function SkillGapAnalysis() {
  const radarData = SKILL_DATA.map((s) => ({
    subject: s.skill,
    You: s.current,
    "Market Avg": s.market,
  }));

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Radar chart */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Your Skills vs. Market Demand</h4>
        <div className="rounded-xl border border-border bg-card p-5">
          <ResponsiveContainer width="100%" height={260}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
              <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
              <Radar name="You" dataKey="You" stroke={CHART_COLORS.blue} fill={CHART_COLORS.blue} fillOpacity={0.15} strokeWidth={2} />
              <Radar name="Market Avg" dataKey="Market Avg" stroke={CHART_COLORS.violet} fill={CHART_COLORS.violet} fillOpacity={0.08} strokeWidth={2} strokeDasharray="4 2" />
              <Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} />
              <Tooltip contentStyle={RECHARTS_TOOLTIP_STYLE} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gap analysis list */}
      <div>
        <h4 className="text-sm font-semibold mb-3">Skill Gap Details</h4>
        <div className="space-y-3">
          {SKILL_DATA.map((skill) => {
            const gap = skill.market - skill.current;
            const isStrong = gap <= 0;
            return (
              <div key={skill.skill} className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{skill.skill}</span>
                    {isStrong ? (
                      <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 text-[9px] px-1.5">
                        Strong
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="text-[9px] px-1.5">
                        Gap: +{gap}%
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {skill.current} / {skill.market}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <div className="flex-1">
                    <div className="text-[10px] text-muted-foreground mb-0.5">You</div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.current}%` }}
                        transition={{ duration: 0.7 }}
                        className="h-full rounded-full bg-blue-500"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-[10px] text-muted-foreground mb-0.5">Market</div>
                    <div className="h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.market}%` }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                        className="h-full rounded-full bg-violet-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Market Trends ────────────────────────────────────────────────────────────
const MARKET_DATA = {
  inDemandSkills: [
    { name: "TypeScript", demand: 94, growth: 12 },
    { name: "React/Next.js", demand: 91, growth: 8 },
    { name: "AI Integration", demand: 87, growth: 45 },
    { name: "System Design", demand: 83, growth: 5 },
    { name: "GraphQL", demand: 72, growth: -2 },
    { name: "Rust", demand: 65, growth: 38 },
    { name: "Edge Computing", demand: 61, growth: 52 },
    { name: "Web3/Blockchain", demand: 42, growth: -15 },
  ],
  salaryTrends: [
    { title: "Senior Engineer", "2024": 175, "2025": 188, "2026": 200 },
    { title: "Staff Engineer", "2024": 230, "2025": 248, "2026": 265 },
    { title: "Principal", "2024": 285, "2025": 305, "2026": 330 },
  ],
  remoteStats: {
    fullyRemote: 42,
    hybrid: 38,
    onsite: 20,
  },
};

function MarketTrends() {
  return (
    <div className="flex flex-col gap-6">
      {/* In-demand skills */}
      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <TrendingUp className="size-4 text-emerald-500" />
          In-Demand Skills for Frontend Engineering
        </h4>
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="space-y-2.5">
            {MARKET_DATA.inDemandSkills.map((skill, i) => (
              <div key={skill.name} className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground w-4 text-right">{i + 1}</span>
                <span className="text-xs font-medium text-foreground w-28">{skill.name}</span>
                <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.demand}%` }}
                    transition={{ duration: 0.7, delay: i * 0.06 }}
                    className="h-full rounded-full bg-blue-500"
                  />
                </div>
                <span className="text-xs font-semibold text-foreground w-8 text-right">{skill.demand}%</span>
                <span className={cn(
                  "text-[10px] font-medium w-12 text-right",
                  skill.growth > 0 ? "text-emerald-600" : "text-red-500"
                )}>
                  {skill.growth > 0 ? "+" : ""}{skill.growth}%
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Salary trends chart */}
      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <BarChart2 className="size-4 text-blue-500" />
          Salary Trends 2024–2026 ($K/year)
        </h4>
        <div className="rounded-xl border border-border bg-card p-5">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={MARKET_DATA.salaryTrends} margin={{ top: 4, right: 8, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis dataKey="title" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} axisLine={false} tickLine={false} unit="k" />
              <Tooltip contentStyle={RECHARTS_TOOLTIP_STYLE} formatter={(v: unknown) => [`$${v}k`]} />
              <Legend iconType="circle" iconSize={6} wrapperStyle={{ fontSize: 10 }} />
              <Bar dataKey="2024" fill={CHART_COLORS.slate} radius={[3, 3, 0, 0]} maxBarSize={24} />
              <Bar dataKey="2025" fill={CHART_COLORS.blue} radius={[3, 3, 0, 0]} maxBarSize={24} />
              <Bar dataKey="2026" fill={CHART_COLORS.violet} radius={[3, 3, 0, 0]} maxBarSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Remote work stats */}
      <div>
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Globe className="size-4 text-cyan-500" />
          Work Mode Distribution (2026)
        </h4>
        <div className="grid gap-3 sm:grid-cols-3">
          {[
            { label: "Fully Remote", pct: 42, color: "bg-emerald-500", trend: "+5% YoY" },
            { label: "Hybrid", pct: 38, color: "bg-blue-500", trend: "+3% YoY" },
            { label: "On-site", pct: 20, color: "bg-slate-500", trend: "-8% YoY" },
          ].map((item) => (
            <div key={item.label} className="rounded-xl border border-border bg-card p-4 text-center">
              <p className="text-2xl font-bold text-foreground">{item.pct}%</p>
              <p className="text-xs font-medium text-muted-foreground mt-0.5">{item.label}</p>
              <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
                <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.pct}%` }} />
              </div>
              <p className="mt-1.5 text-[10px] text-emerald-600">{item.trend}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Interview Recommendations ────────────────────────────────────────────────
const INTERVIEW_TIPS = [
  {
    category: "System Design",
    icon: Brain,
    tips: [
      "Practice designing a URL shortener, chat system, and feed at scale",
      "Study consistency vs. availability tradeoffs (CAP theorem)",
      "Always ask about scale requirements before diving in",
      "Draw diagrams — interviewers expect visual communication",
    ],
    resources: ["System Design Primer", "Designing Data-Intensive Applications"],
  },
  {
    category: "Behavioral",
    icon: Users,
    tips: [
      "Prepare 5–7 STAR stories covering conflict, leadership, and failure",
      "Research the company's engineering blog and recent launches",
      "Prepare thoughtful questions about team structure and tech challenges",
      "Match stories to company values (check their jobs page)",
    ],
    resources: ["Interview Handbook", "Amazon Leadership Principles"],
  },
  {
    category: "Technical",
    icon: Zap,
    tips: [
      "Think out loud — interviewers value reasoning over answers",
      "Start with brute force, then optimize",
      "Practice on a whiteboard, not just your IDE",
      "Review React rendering, useEffect, and performance patterns",
    ],
    resources: ["LeetCode Top 150", "Frontend Interview Handbook"],
  },
  {
    category: "Negotiation",
    icon: Star,
    tips: [
      "Never give a number first — ask for their range",
      "Get competing offers before negotiating — leverage is everything",
      "Negotiate total comp: base + equity + signing + perks",
      "It's always OK to ask for more — the worst answer is no",
    ],
    resources: ["Levels.fyi", "Haseeb Qureshi's negotiation guide"],
  },
];

function InterviewRecommendations() {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {INTERVIEW_TIPS.map((section, i) => (
        <motion.div
          key={section.category}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="rounded-xl border border-border bg-card p-5"
        >
          <div className="flex items-center gap-2.5 mb-4">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
              <section.icon className="size-4 text-primary" />
            </div>
            <h4 className="text-sm font-semibold">{section.category}</h4>
          </div>

          <ul className="space-y-2 mb-4">
            {section.tips.map((tip) => (
              <li key={tip} className="flex items-start gap-2">
                <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span className="text-xs text-muted-foreground leading-snug">{tip}</span>
              </li>
            ))}
          </ul>

          <div>
            <p className="text-[10px] font-medium text-muted-foreground uppercase tracking-wide mb-1.5">
              Resources
            </p>
            <div className="flex flex-wrap gap-1.5">
              {section.resources.map((r) => (
                <span
                  key={r}
                  className="flex items-center gap-1 rounded-full bg-muted px-2.5 py-1 text-[10px] text-muted-foreground"
                >
                  <BookOpen className="size-3" />
                  {r}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Overview tab ─────────────────────────────────────────────────────────────
function OverviewTab() {
  const user = MOCK_USER.profile;
  const activeInsights = MOCK_AI_INSIGHTS.filter((i) => !i.dismissed);
  const highPriority = activeInsights.filter((i) => i.priority === "high");

  return (
    <div className="flex flex-col gap-6">
      {/* Personalized greeting */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-card to-muted/30 p-5">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <Sparkles className="size-6 text-primary" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              Your AI Career Copilot
            </h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
              Based on {user.name}&apos;s job search activity, we&apos;ve identified{" "}
              <strong>{highPriority.length} high-priority actions</strong> that
              could accelerate your path to an offer. Your overall search health
              score is <strong className="text-emerald-600">78/100</strong>.
            </p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {["Response Rate +23%", "Best Week Yet", "3 Referral Opps"].map((stat) => (
            <span key={stat} className="rounded-full bg-card border border-border px-3 py-1 text-xs font-medium text-foreground flex items-center gap-1.5">
              <Sparkles className="size-3 text-amber-500" />
              {stat}
            </span>
          ))}
        </div>
      </div>

      {/* Insights grid */}
      <div>
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <AlertCircle className="size-4 text-amber-500" />
          {highPriority.length} High-Priority Actions
        </h3>
        <div className="grid gap-3 lg:grid-cols-2">
          {MOCK_AI_INSIGHTS.filter((i) => i.priority === "high" && !i.dismissed).map(
            (insight, i) => <InsightCard key={insight.id} insight={insight} index={i} />
          )}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold mb-3">All Insights</h3>
        <div className="grid gap-3 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {MOCK_AI_INSIGHTS.filter((i) => i.priority !== "high").map(
              (insight, i) => <InsightCard key={insight.id} insight={insight} index={i} />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export function AiInsightsView() {
  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Insights</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Personalized recommendations to optimize your job search
          </p>
        </div>
        <Badge className="gap-1.5">
          <Sparkles className="size-3" />
          5 new insights
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="overview">
        <TabsList className="grid w-full max-w-lg grid-cols-4">
          <TabsTrigger value="overview" className="gap-1.5">
            <Sparkles className="size-3.5" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="skills" className="gap-1.5">
            <Target className="size-3.5" />
            Skills
          </TabsTrigger>
          <TabsTrigger value="market" className="gap-1.5">
            <TrendingUp className="size-3.5" />
            Market
          </TabsTrigger>
          <TabsTrigger value="interview" className="gap-1.5">
            <Brain className="size-3.5" />
            Interview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="skills" className="mt-6">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold mb-1">Skill Gap Analysis</h3>
              <p className="text-sm text-muted-foreground mb-4">
                How your current skills compare to market demand for your target roles
              </p>
              <SkillGapAnalysis />
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="size-4 text-blue-500" />
                Recommended Learning Path
              </h4>
              <div className="space-y-2.5">
                {[
                  { skill: "AI Integration (LLMs, RAG)", priority: "High", time: "4–6 weeks", resources: "Fast.ai, Anthropic Docs" },
                  { skill: "Infrastructure / DevOps basics", priority: "Medium", time: "2–3 weeks", resources: "Docker, Kubernetes" },
                  { skill: "Advanced System Design", priority: "High", time: "Ongoing", resources: "Designing Data-Intensive Apps" },
                ].map((item) => (
                  <div key={item.skill} className="flex items-start gap-3 rounded-lg border border-border p-3">
                    <div className={cn(
                      "shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium mt-0.5",
                      item.priority === "High" ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-400" : "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400"
                    )}>
                      {item.priority}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold text-foreground">{item.skill}</p>
                      <p className="text-[11px] text-muted-foreground">{item.time} · {item.resources}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="market" className="mt-6">
          <MarketTrends />
        </TabsContent>

        <TabsContent value="interview" className="mt-6">
          <div className="flex flex-col gap-6">
            <div>
              <h3 className="text-base font-semibold mb-1">Interview Preparation</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Actionable recommendations to increase your interview-to-offer conversion
              </p>
            </div>
            <InterviewRecommendations />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
