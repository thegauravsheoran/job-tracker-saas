"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Download,
  Trash2,
  Star,
  MoreHorizontal,
  CheckCircle2,
  AlertCircle,
  Info,
  Plus,
  Eye,
  Briefcase,
  TrendingUp,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MOCK_RESUMES, MOCK_RESUME_SUGGESTIONS } from "@/data/mock-resumes";
import type { Resume } from "@/data/mock-resumes";
import { formatDate } from "@/lib/format";
import { cn } from "@/lib/utils";

// Need to create Progress component if not exists — use div fallback
function ScoreBar({ value, color }: { value: number; color: string }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.7 }}
        className="h-full rounded-full"
        style={{ background: color }}
      />
    </div>
  );
}

// ─── Score circle ─────────────────────────────────────────────────────────────
function ScoreCircle({ score }: { score: number }) {
  const radius = 22;
  const circumference = 2 * Math.PI * radius;
  const dash = (score / 100) * circumference;

  const color =
    score >= 85
      ? "#10b981"
      : score >= 70
        ? "#3b82f6"
        : score >= 55
          ? "#f59e0b"
          : "#ef4444";

  const label =
    score >= 85
      ? "Excellent"
      : score >= 70
        ? "Good"
        : score >= 55
          ? "Fair"
          : "Needs work";

  return (
    <div className="flex flex-col items-center">
      <div className="relative flex size-14 items-center justify-center">
        <svg viewBox="0 0 52 52" className="size-14 -rotate-90">
          <circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke="hsl(var(--muted))"
            strokeWidth="4"
          />
          <motion.circle
            cx="26"
            cy="26"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray={`${dash} ${circumference}`}
            initial={{ strokeDasharray: `0 ${circumference}` }}
            animate={{ strokeDasharray: `${dash} ${circumference}` }}
            transition={{ duration: 0.9 }}
          />
        </svg>
        <span className="absolute text-sm font-bold text-foreground">{score}</span>
      </div>
      <span className="mt-1 text-[10px] text-muted-foreground">{label}</span>
    </div>
  );
}

// ─── Resume Card ──────────────────────────────────────────────────────────────
function ResumeCard({ resume, onSetDefault }: { resume: Resume; onSetDefault: (id: string) => void }) {
  const [expanded, setExpanded] = useState(false);

  const suggestions = MOCK_RESUME_SUGGESTIONS.filter(
    (s) => s.resumeId === resume.id
  );

  const scoreColors: Record<string, string> = {
    ats: "#3b82f6",
    readability: "#10b981",
    keywords: "#8b5cf6",
    formatting: "#f59e0b",
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md",
        resume.isDefault ? "border-primary/40 ring-1 ring-primary/20" : "border-border"
      )}
    >
      {/* Card header */}
      <div className="flex items-start gap-4 p-5">
        {/* File icon */}
        <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-500/10">
          <FileText className="size-6 text-blue-500" />
        </div>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-sm font-semibold text-card-foreground">
                  {resume.name}
                </h3>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0.5">
                  {resume.version}
                </Badge>
                {resume.isDefault && (
                  <Badge className="text-[10px] px-1.5 py-0.5 gap-1">
                    <Star className="size-2.5" />
                    Default
                  </Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">
                {resume.fileName} · {resume.fileSize}
              </p>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <ScoreCircle score={resume.overallScore} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>
                    <Eye className="mr-2 size-4" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className="mr-2 size-4" />
                    Download
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onSetDefault(resume.id)}>
                    <Star className="mr-2 size-4" />
                    Set as default
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    <Trash2 className="mr-2 size-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Meta */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Upload className="size-3" />
              {formatDate(resume.uploadedAt)}
            </span>
            <span className="flex items-center gap-1">
              <Briefcase className="size-3" />
              Used {resume.timesUsed} times
            </span>
            {resume.lastUsed && (
              <span className="flex items-center gap-1">
                <TrendingUp className="size-3" />
                Last used {formatDate(resume.lastUsed)}
              </span>
            )}
          </div>

          {/* Tags */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {resume.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-muted px-2 py-0.5 text-[10px] text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Score breakdown */}
      <div className="border-t border-border px-5 py-4">
        <div className="grid grid-cols-2 gap-4">
          {Object.entries(resume.scores).map(([key, value]) => (
            <div key={key}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-medium text-muted-foreground capitalize">
                  {key}
                </span>
                <span className="text-[10px] font-semibold text-foreground">{value}</span>
              </div>
              <ScoreBar value={value} color={scoreColors[key] ?? "#6b7280"} />
            </div>
          ))}
        </div>
      </div>

      {/* Suggestions section */}
      {suggestions.length > 0 && (
        <div className="border-t border-border">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between px-5 py-3 text-xs font-medium text-muted-foreground hover:text-foreground hover:bg-accent/30 transition-colors"
          >
            <span className="flex items-center gap-1.5">
              <AlertCircle className="size-3.5 text-amber-500" />
              {suggestions.length} suggestion{suggestions.length > 1 ? "s" : ""} to improve
            </span>
            {expanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-5 pb-4 space-y-2.5">
                  {suggestions.map((s) => {
                    const icon = s.severity === "high" ? AlertCircle : Info;
                    const Icon = icon;
                    const color =
                      s.severity === "high"
                        ? "text-red-500"
                        : s.severity === "medium"
                          ? "text-amber-500"
                          : "text-blue-500";
                    return (
                      <div
                        key={s.id}
                        className="flex items-start gap-2.5 rounded-lg border border-border bg-muted/30 p-3"
                      >
                        <Icon className={cn("size-3.5 shrink-0 mt-0.5", color)} />
                        <div>
                          <p className="text-xs font-semibold text-foreground">
                            {s.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted-foreground leading-relaxed">
                            {s.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

// ─── Upload Dropzone ──────────────────────────────────────────────────────────
function UploadZone({ onClose }: { onClose: () => void }) {
  const [dragOver, setDragOver] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="rounded-xl border border-border bg-card p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold">Upload New Resume</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          Cancel
        </Button>
      </div>

      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); }}
        className={cn(
          "rounded-xl border-2 border-dashed p-10 text-center transition-colors",
          dragOver
            ? "border-primary bg-primary/5"
            : "border-border bg-muted/30"
        )}
      >
        <Upload className="size-10 text-muted-foreground mx-auto mb-3" />
        <p className="text-sm font-medium text-foreground">
          Drop your resume here, or{" "}
          <span className="text-primary cursor-pointer hover:underline">browse</span>
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Supports PDF, DOCX · Max 10 MB
        </p>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        <div>
          <label className="text-xs font-medium text-muted-foreground">
            Resume Name
          </label>
          <input
            type="text"
            placeholder="e.g. Staff Engineer — Q3 2026"
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <Button className="mt-2">
          <Upload className="mr-2 size-4" />
          Upload & Analyze
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
function ResumeStats() {
  const avgScore =
    Math.round(MOCK_RESUMES.reduce((s, r) => s + r.overallScore, 0) / MOCK_RESUMES.length);
  const totalUses = MOCK_RESUMES.reduce((s, r) => s + r.timesUsed, 0);

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {[
        { label: "Resumes", value: MOCK_RESUMES.length, icon: FileText, color: "text-blue-500 bg-blue-500/10" },
        { label: "Avg. Score", value: `${avgScore}/100`, icon: TrendingUp, color: "text-emerald-500 bg-emerald-500/10" },
        { label: "Total Uses", value: totalUses, icon: Briefcase, color: "text-violet-500 bg-violet-500/10" },
        { label: "Improvements", value: MOCK_RESUME_SUGGESTIONS.length, icon: AlertCircle, color: "text-amber-500 bg-amber-500/10" },
      ].map((stat) => (
        <div key={stat.label} className="rounded-xl border border-border bg-card p-4 flex items-center gap-3">
          <div className={cn("flex size-9 items-center justify-center rounded-lg", stat.color)}>
            <stat.icon className="size-4" />
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">{stat.label}</p>
            <p className="text-lg font-bold text-foreground">{stat.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Main View ────────────────────────────────────────────────────────────────
export function ResumeManagerView() {
  const [resumes, setResumes] = useState(MOCK_RESUMES);
  const [showUpload, setShowUpload] = useState(false);

  const handleSetDefault = (id: string) => {
    setResumes((prev) =>
      prev.map((r) => ({ ...r, isDefault: r.id === id }))
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Resume Manager</h2>
          <p className="text-muted-foreground text-sm mt-0.5">
            Manage and optimize your resume versions with AI scoring
          </p>
        </div>
        <Button
          size="sm"
          className="gap-1.5"
          onClick={() => setShowUpload(!showUpload)}
        >
          <Plus className="size-4" />
          Upload Resume
        </Button>
      </div>

      {/* Upload zone */}
      <AnimatePresence>
        {showUpload && (
          <UploadZone onClose={() => setShowUpload(false)} />
        )}
      </AnimatePresence>

      {/* Stats */}
      <ResumeStats />

      {/* Resume grid */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold">Your Resumes</h3>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <CheckCircle2 className="size-3.5 text-emerald-500" />
            <span>ATS optimized</span>
          </div>
        </div>

        <div className="grid gap-4">
          {resumes.map((resume) => (
            <ResumeCard
              key={resume.id}
              resume={resume}
              onSetDefault={handleSetDefault}
            />
          ))}
        </div>
      </div>

      {/* Tips section */}
      <div className="rounded-xl border border-border bg-card p-5">
        <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Info className="size-4 text-blue-500" />
          Resume Optimization Tips
        </h3>
        <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { tip: "Use quantifiable metrics", desc: "Replace 'improved performance' with '40% faster load time'" },
            { tip: "Tailor keywords per role", desc: "Match job description keywords for better ATS pass rates" },
            { tip: "Keep it concise", desc: "1-2 pages for < 10 years experience. Quality > quantity" },
            { tip: "Strong action verbs", desc: "Start bullets with Led, Built, Shipped, Reduced, Increased" },
            { tip: "Modern formatting", desc: "Clean layout, consistent spacing, no tables or graphics" },
            { tip: "Update regularly", desc: "Refresh your resume every 3 months with new achievements" },
          ].map((item) => (
            <div key={item.tip} className="flex items-start gap-2">
              <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-foreground">{item.tip}</p>
                <p className="text-[11px] text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
