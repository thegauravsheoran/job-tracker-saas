"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  BarChart3,
  Columns3,
  Sparkles,
  FileText,
  Bell,
  CheckCircle2,
  TrendingUp,
  Zap,
  Shield,
  Target,
  Star,
  ChevronRight,
  Check,
  Menu,
  X,
  Code2,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

// ─── Section animation helper ────────────────────────────────────────────────
function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Nav ─────────────────────────────────────────────────────────────────────
function LandingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
            <BriefcaseBusiness className="size-4 text-background" />
          </div>
          <span className="text-sm font-semibold">CareerFlow AI</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {[
            { label: "Features", href: "#features" },
            { label: "How it works", href: "#how-it-works" },
            { label: "Pricing", href: "#pricing" },
            { label: "Testimonials", href: "#testimonials" },
          ].map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.label}
            </a>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link href="/dashboard">
            <Button variant="ghost" size="sm">
              Sign in
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button size="sm">
              Get started free
              <ArrowRight className="ml-1.5 size-3.5" />
            </Button>
          </Link>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <div className="px-6 py-4 space-y-3">
              {["Features", "How it works", "Pricing", "Testimonials"].map(
                (item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase().replace(" ", "-")}`}
                    onClick={() => setMobileOpen(false)}
                    className="block text-sm text-muted-foreground hover:text-foreground py-1"
                  >
                    {item}
                  </a>
                )
              )}
              <div className="pt-2 flex flex-col gap-2">
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" size="sm" className="w-full">
                    Sign in
                  </Button>
                </Link>
                <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                  <Button size="sm" className="w-full">
                    Get started free
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background pt-20 pb-16">
      {/* Radial gradient background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[600px] w-[800px] rounded-full bg-blue-500/5 dark:bg-blue-400/10 blur-3xl" />
        <div className="absolute left-1/4 top-1/3 h-[400px] w-[400px] rounded-full bg-violet-500/5 dark:bg-violet-400/8 blur-3xl" />
        <div className="absolute right-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-emerald-500/5 dark:bg-emerald-400/8 blur-3xl" />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
          style={{
            backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Badge
            variant="secondary"
            className="mb-6 gap-1.5 rounded-full border border-border px-4 py-1.5 text-xs font-medium"
          >
            <Sparkles className="size-3 text-amber-500" />
            Introducing AI-powered career insights
            <ChevronRight className="size-3 text-muted-foreground" />
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl"
        >
          Land your dream job,{" "}
          <span className="relative">
            <span className="bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 bg-clip-text text-transparent">
              faster.
            </span>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed"
        >
          The only job search platform with an AI copilot that helps you track
          applications, prep for interviews, and analyze your pipeline — all in
          one beautiful dashboard.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/dashboard">
            <Button size="lg" className="h-12 px-8 text-base font-medium shadow-lg shadow-primary/20">
              Start for free
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
          <Link href="/dashboard">
            <Button
              variant="outline"
              size="lg"
              className="h-12 px-8 text-base font-medium"
            >
              View live demo
            </Button>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.45 }}
          className="mt-4 text-xs text-muted-foreground"
        >
          Free forever for up to 25 applications. No credit card required.
        </motion.p>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.5, ease: "easeOut" }}
          className="relative mx-auto mt-16 max-w-4xl"
        >
          <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-border to-transparent" />
          <div className="relative rounded-2xl border border-border bg-card overflow-hidden shadow-2xl shadow-black/10 dark:shadow-black/30">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 border-b border-border bg-muted/50 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="size-3 rounded-full bg-red-400/70" />
                <div className="size-3 rounded-full bg-amber-400/70" />
                <div className="size-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex-1 mx-4">
                <div className="rounded-md bg-background border border-border px-3 py-1 text-[10px] text-muted-foreground w-48 mx-auto text-center">
                  app.careerflowai.com/dashboard
                </div>
              </div>
            </div>
            {/* App preview */}
            <DashboardMockup />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="flex h-[340px] text-[10px] overflow-hidden">
      {/* Sidebar */}
      <div className="w-40 shrink-0 border-r border-border bg-sidebar p-3 space-y-1">
        <div className="flex items-center gap-1.5 px-2 py-1.5 mb-3">
          <div className="size-4 rounded bg-primary flex items-center justify-center">
            <BriefcaseBusiness className="size-2 text-primary-foreground" />
          </div>
          <span className="font-semibold text-sidebar-foreground text-[9px]">CareerFlow AI</span>
        </div>
        {[
          { icon: BarChart3, label: "Dashboard", active: true },
          { icon: BriefcaseBusiness, label: "Applications" },
          { icon: Columns3, label: "Kanban" },
          { icon: BarChart3, label: "Analytics" },
          { icon: FileText, label: "Resumes" },
          { icon: Sparkles, label: "AI Insights" },
        ].map(({ icon: Icon, label, active }) => (
          <div
            key={label}
            className={cn(
              "flex items-center gap-2 rounded px-2 py-1.5",
              active
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground/60"
            )}
          >
            <Icon className="size-2.5" />
            <span>{label}</span>
          </div>
        ))}
      </div>
      {/* Main content */}
      <div className="flex-1 overflow-hidden p-3 space-y-2.5 bg-background">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="font-semibold text-foreground">Dashboard</div>
            <div className="text-muted-foreground text-[9px]">Welcome back, Gaurav</div>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-5 rounded bg-muted flex items-center justify-center">
              <Bell className="size-2.5 text-muted-foreground" />
            </div>
            <div className="size-5 rounded-full bg-blue-500 flex items-center justify-center text-[7px] font-bold text-white">A</div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-4 gap-1.5">
          {[
            { label: "Total", value: "34", color: "text-blue-500" },
            { label: "Active", value: "12", color: "text-violet-500" },
            { label: "Interviews", value: "18", color: "text-amber-500" },
            { label: "Offers", value: "2", color: "text-emerald-500" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg border border-border bg-card p-2">
              <div className="text-muted-foreground text-[8px]">{s.label}</div>
              <div className={cn("text-lg font-bold", s.color)}>{s.value}</div>
            </div>
          ))}
        </div>
        {/* Charts row */}
        <div className="grid grid-cols-3 gap-1.5">
          <div className="col-span-2 rounded-lg border border-border bg-card p-2">
            <div className="text-muted-foreground mb-1 text-[8px]">Application Trend</div>
            <div className="flex items-end gap-0.5 h-12">
              {[20, 35, 28, 45, 38, 52, 48, 60, 55, 70, 65, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-blue-500/70"
                  style={{ height: `${(h / 80) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-card p-2">
            <div className="text-muted-foreground mb-1 text-[8px]">By Status</div>
            <div className="flex items-center justify-center h-12">
              <div className="relative size-10">
                <svg viewBox="0 0 36 36" className="size-10 -rotate-90">
                  {[
                    { pct: 35, color: "#3b82f6", offset: 0 },
                    { pct: 25, color: "#8b5cf6", offset: 35 },
                    { pct: 20, color: "#f59e0b", offset: 60 },
                    { pct: 20, color: "#ef4444", offset: 80 },
                  ].map(({ pct, color, offset }) => (
                    <circle
                      key={color}
                      cx="18" cy="18" r="14"
                      fill="none"
                      stroke={color}
                      strokeWidth="4"
                      strokeDasharray={`${(pct / 100) * 87.96} 87.96`}
                      strokeDashoffset={`-${(offset / 100) * 87.96}`}
                    />
                  ))}
                </svg>
              </div>
            </div>
          </div>
        </div>
        {/* Recent activity */}
        <div className="rounded-lg border border-border bg-card p-2">
          <div className="text-muted-foreground mb-1.5 text-[8px]">Recent Activity</div>
          <div className="space-y-1">
            {[
              { co: "Stripe", role: "Staff FE", status: "Interviewing", color: "bg-amber-500/20 text-amber-600" },
              { co: "Vercel", role: "Principal", status: "Offer", color: "bg-emerald-500/20 text-emerald-600" },
              { co: "Linear", role: "Senior SWE", status: "Applied", color: "bg-blue-500/20 text-blue-600" },
            ].map((r) => (
              <div key={r.co} className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <div className="size-3 rounded bg-muted" />
                  <span className="text-foreground">{r.co}</span>
                  <span className="text-muted-foreground">· {r.role}</span>
                </div>
                <span className={cn("rounded px-1 py-0.5 text-[7px] font-medium", r.color)}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "12,000+", label: "Active job seekers" },
    { value: "2.3×", label: "Faster job search" },
    { value: "87%", label: "Interview rate improvement" },
    { value: "50K+", label: "Applications tracked" },
  ];

  return (
    <section className="border-y border-border bg-muted/30">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, i) => (
            <FadeUp key={stat.label} delay={i * 0.08} className="text-center">
              <p className="text-3xl font-bold text-foreground">{stat.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Features ─────────────────────────────────────────────────────────────────
const FEATURES = [
  {
    icon: BriefcaseBusiness,
    title: "Smart Application Tracking",
    description:
      "Track every application with rich metadata — salary, contacts, notes, and status history. Never lose track of where you stand.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    icon: Columns3,
    title: "Visual Kanban Pipeline",
    description:
      "Drag and drop applications through your hiring pipeline. See your entire job search at a glance with color-coded stages.",
    color: "text-violet-500",
    bg: "bg-violet-500/10",
  },
  {
    icon: BarChart3,
    title: "Deep Analytics",
    description:
      "Understand your job search performance with charts on application trends, source effectiveness, and salary insights.",
    color: "text-amber-500",
    bg: "bg-amber-500/10",
  },
  {
    icon: Sparkles,
    title: "AI Career Insights",
    description:
      "Get personalized AI recommendations: skill gap analysis, resume improvements, interview tips, and market trend insights.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
  },
  {
    icon: FileText,
    title: "Resume Manager",
    description:
      "Manage multiple resume versions with ATS scoring. Track which resume version gets the best callback rate.",
    color: "text-cyan-500",
    bg: "bg-cyan-500/10",
  },
  {
    icon: Bell,
    title: "Smart Notifications",
    description:
      "Never miss a deadline or follow-up. Get timely reminders for interviews, application deadlines, and stale applications.",
    color: "text-pink-500",
    bg: "bg-pink-500/10",
  },
];

function Features() {
  return (
    <section id="features" className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="text-center mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs">
            Features
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight text-foreground">
            Everything you need to ace your job search
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            A complete career management platform built for engineers who want
            to approach their job search like a product problem.
          </p>
        </FadeUp>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => (
            <FadeUp key={feature.title} delay={i * 0.07}>
              <div className="group rounded-2xl border border-border bg-card p-6 transition-all duration-200 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/5">
                <div
                  className={cn(
                    "mb-4 inline-flex size-11 items-center justify-center rounded-xl",
                    feature.bg
                  )}
                >
                  <feature.icon className={cn("size-5", feature.color)} />
                </div>
                <h3 className="text-base font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── How It Works ─────────────────────────────────────────────────────────────
function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: BriefcaseBusiness,
      title: "Add your applications",
      description:
        "Import from LinkedIn or add manually. Capture job details, salary expectations, contacts, and your excitement level.",
      color: "text-blue-500",
    },
    {
      number: "02",
      icon: Target,
      title: "Track your pipeline",
      description:
        "Move applications through stages as you progress. Schedule interviews, log outcomes, and manage follow-ups.",
      color: "text-violet-500",
    },
    {
      number: "03",
      icon: Sparkles,
      title: "Get AI-powered insights",
      description:
        "Our AI analyzes your pipeline and surfaces actionable insights to increase your response rate and land offers faster.",
      color: "text-emerald-500",
    },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs">
            How it works
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">
            From application to offer in 3 steps
          </h2>
        </FadeUp>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step, i) => (
            <FadeUp key={step.number} delay={i * 0.12}>
              <div className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-border to-transparent z-10" />
                )}
                <div className="rounded-2xl border border-border bg-card p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-black text-border">
                      {step.number}
                    </span>
                    <div className="ml-auto flex size-10 items-center justify-center rounded-xl bg-primary/10">
                      <step.icon className={cn("size-5", step.color)} />
                    </div>
                  </div>
                  <h3 className="text-base font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Testimonials ─────────────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    quote:
      "CareerFlow AI completely changed how I approach my job search. The analytics showed me I was getting way more callbacks from referrals, so I doubled down on that strategy and landed 3 offers.",
    name: "Sarah Chen",
    title: "Senior Software Engineer",
    company: "Now at Airbnb",
    avatar: "SC",
    avatarColor: "bg-blue-500",
    stars: 5,
  },
  {
    quote:
      "The AI insights feature is genuinely impressive. It told me my resume was missing key TypeScript keywords for staff-level roles, I made the change, and my response rate jumped 40% that week.",
    name: "Marcus Johnson",
    title: "Staff Frontend Engineer",
    company: "Now at Stripe",
    avatar: "MJ",
    avatarColor: "bg-violet-500",
    stars: 5,
  },
  {
    quote:
      "I went from scattered spreadsheets to having a complete view of my 30+ applications in one place. The Kanban board alone is worth it — I can see my entire pipeline at a glance.",
    name: "Priya Patel",
    title: "Principal Engineer",
    company: "Now at Vercel",
    avatar: "PP",
    avatarColor: "bg-emerald-500",
    stars: 5,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="mx-auto max-w-6xl px-6">
        <FadeUp className="text-center mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs">
            Testimonials
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">
            Loved by engineers worldwide
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of engineers who&apos;ve accelerated their job search
            with CareerFlow AI.
          </p>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <FadeUp key={t.name} delay={i * 0.1}>
              <div className="flex flex-col rounded-2xl border border-border bg-card p-6 h-full">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: t.stars }).map((_, s) => (
                    <Star
                      key={s}
                      className="size-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <blockquote className="flex-1 text-sm text-muted-foreground leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="mt-6 flex items-center gap-3">
                  <div
                    className={cn(
                      "flex size-9 items-center justify-center rounded-full text-xs font-bold text-white",
                      t.avatarColor
                    )}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.title} · {t.company}
                    </p>
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Pricing ─────────────────────────────────────────────────────────────────
const PLANS = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for getting started with your job search.",
    features: [
      "Up to 25 applications",
      "Kanban board",
      "Basic analytics",
      "Resume manager (1 resume)",
      "Email notifications",
    ],
    cta: "Get started free",
    popular: false,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "For serious job seekers who want every advantage.",
    features: [
      "Unlimited applications",
      "AI-powered insights",
      "Advanced analytics",
      "Resume manager (10 resumes)",
      "ATS score & suggestions",
      "Priority support",
      "500 AI credits/month",
    ],
    cta: "Start Pro trial",
    popular: true,
    variant: "default" as const,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "contact us",
    description: "For teams and career coaches managing multiple candidates.",
    features: [
      "Everything in Pro",
      "Unlimited AI credits",
      "Team dashboards",
      "White-label option",
      "Custom integrations",
      "Dedicated support",
    ],
    cta: "Contact sales",
    popular: false,
    variant: "outline" as const,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="mx-auto max-w-5xl px-6">
        <FadeUp className="text-center mb-16">
          <Badge variant="outline" className="mb-4 rounded-full px-4 py-1 text-xs">
            Pricing
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Start free. Upgrade when you&apos;re ready to unlock the full
            power of AI career coaching.
          </p>
        </FadeUp>

        <div className="grid gap-6 md:grid-cols-3">
          {PLANS.map((plan, i) => (
            <FadeUp key={plan.name} delay={i * 0.1}>
              <div
                className={cn(
                  "relative flex flex-col rounded-2xl border p-6 h-full transition-shadow hover:shadow-lg",
                  plan.popular
                    ? "border-primary bg-card shadow-md"
                    : "border-border bg-card"
                )}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="rounded-full px-4 py-1 text-xs shadow-sm">
                      Most popular
                    </Badge>
                  </div>
                )}
                <div className="mb-5">
                  <h3 className="text-base font-semibold">{plan.name}</h3>
                  <div className="mt-2 flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-sm text-muted-foreground">
                      /{plan.period}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {plan.description}
                  </p>
                </div>

                <ul className="flex-1 space-y-2.5 mb-6">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <Check className="size-4 shrink-0 mt-0.5 text-emerald-500" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Link href="/dashboard">
                  <Button
                    variant={plan.variant}
                    className="w-full"
                    size="sm"
                  >
                    {plan.cta}
                    <ArrowRight className="ml-1.5 size-3.5" />
                  </Button>
                </Link>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA ──────────────────────────────────────────────────────────────────────
function CTA() {
  return (
    <section className="py-24 bg-background">
      <div className="mx-auto max-w-4xl px-6">
        <FadeUp>
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-12 text-center">
            <div className="absolute inset-0 -z-10">
              <div className="absolute left-1/2 top-0 -translate-x-1/2 h-64 w-96 rounded-full bg-blue-500/8 dark:bg-blue-400/10 blur-3xl" />
            </div>
            <div className="inline-flex size-14 items-center justify-center rounded-2xl bg-primary mb-6">
              <Zap className="size-7 text-primary-foreground" />
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Ready to land your dream job?
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
              Join 12,000+ engineers who are tracking smarter and landing
              faster with CareerFlow AI.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="h-12 px-8 text-base shadow-lg shadow-primary/20">
                  Start for free — no credit card
                  <ArrowRight className="ml-2 size-4" />
                </Button>
              </Link>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6 text-xs text-muted-foreground">
              {["Free forever plan", "No credit card required", "Set up in 2 minutes"].map(
                (item) => (
                  <span key={item} className="flex items-center gap-1.5">
                    <CheckCircle2 className="size-3.5 text-emerald-500" />
                    {item}
                  </span>
                )
              )}
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  const links = {
    Product: ["Features", "Pricing", "Changelog", "Roadmap"],
    Resources: ["Documentation", "Blog", "Career Tips", "Templates"],
    Company: ["About", "Careers", "Privacy", "Terms"],
    Connect: ["Twitter/X", "GitHub", "LinkedIn", "Discord"],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="flex size-8 items-center justify-center rounded-lg bg-foreground">
                <BriefcaseBusiness className="size-4 text-background" />
              </div>
              <span className="text-sm font-semibold">CareerFlow AI</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              AI-powered career management platform for ambitious engineers who
              want to land their dream job faster.
            </p>
            <div className="mt-6 flex gap-3">
              {[Code2, Globe, Code2].map((Icon, i) => (
                <button
                  key={i}
                  className="flex size-8 items-center justify-center rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors"
                >
                  <Icon className="size-3.5" />
                </button>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([category, items]) => (
            <div key={category}>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item}>
                    <Link
                      href="/dashboard"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-border pt-8">
          <p className="text-xs text-muted-foreground">
            © 2026 CareerFlow AI. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Shield className="size-3" />
            <span>SOC 2 compliant · GDPR ready · 99.9% uptime</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
export function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      <LandingNav />
      <Hero />
      <StatsBar />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
}
