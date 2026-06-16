import {
  LayoutDashboard,
  Briefcase,
  Columns3,
  BarChart3,
  FileText,
  Sparkles,
  Settings,
} from "lucide-react";
import type { NavItem } from "@/types";
import type { ApplicationStatus } from "@/types/application";

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Applications",
    href: "/applications",
    icon: Briefcase,
  },
  {
    label: "Kanban Board",
    href: "/kanban",
    icon: Columns3,
  },
  {
    label: "Analytics",
    href: "/analytics",
    icon: BarChart3,
  },
  {
    label: "Resume Manager",
    href: "/resume-manager",
    icon: FileText,
  },
  {
    label: "AI Insights",
    href: "/ai-insights",
    icon: Sparkles,
  },
];

export const NAV_BOTTOM_ITEMS: NavItem[] = [
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export const APPLICATION_STATUS_CONFIG: Record<
  ApplicationStatus,
  { label: string; color: string; bgColor: string; description: string }
> = {
  bookmarked: {
    label: "Bookmarked",
    color: "text-slate-600 dark:text-slate-400",
    bgColor: "bg-slate-100 dark:bg-slate-800",
    description: "Saved for later",
  },
  applying: {
    label: "Applying",
    color: "text-blue-600 dark:text-blue-400",
    bgColor: "bg-blue-50 dark:bg-blue-950",
    description: "In progress",
  },
  applied: {
    label: "Applied",
    color: "text-indigo-600 dark:text-indigo-400",
    bgColor: "bg-indigo-50 dark:bg-indigo-950",
    description: "Submitted",
  },
  screening: {
    label: "Screening",
    color: "text-violet-600 dark:text-violet-400",
    bgColor: "bg-violet-50 dark:bg-violet-950",
    description: "Under review",
  },
  interviewing: {
    label: "Interviewing",
    color: "text-amber-600 dark:text-amber-400",
    bgColor: "bg-amber-50 dark:bg-amber-950",
    description: "Active interviews",
  },
  offer: {
    label: "Offer",
    color: "text-emerald-600 dark:text-emerald-400",
    bgColor: "bg-emerald-50 dark:bg-emerald-950",
    description: "Offer received",
  },
  accepted: {
    label: "Accepted",
    color: "text-green-600 dark:text-green-400",
    bgColor: "bg-green-50 dark:bg-green-950",
    description: "Accepted offer",
  },
  rejected: {
    label: "Rejected",
    color: "text-red-600 dark:text-red-400",
    bgColor: "bg-red-50 dark:bg-red-950",
    description: "Not selected",
  },
  withdrawn: {
    label: "Withdrawn",
    color: "text-gray-500 dark:text-gray-500",
    bgColor: "bg-gray-50 dark:bg-gray-900",
    description: "Withdrew application",
  },
};

export const WORK_MODE_OPTIONS = [
  { value: "remote", label: "Remote" },
  { value: "hybrid", label: "Hybrid" },
  { value: "onsite", label: "On-site" },
] as const;

export const EMPLOYMENT_TYPE_OPTIONS = [
  { value: "full-time", label: "Full-time" },
  { value: "part-time", label: "Part-time" },
  { value: "contract", label: "Contract" },
  { value: "internship", label: "Internship" },
  { value: "freelance", label: "Freelance" },
] as const;

export const PRIORITY_OPTIONS = [
  { value: "low", label: "Low", color: "text-gray-500" },
  { value: "medium", label: "Medium", color: "text-amber-500" },
  { value: "high", label: "High", color: "text-red-500" },
] as const;

export const APPLICATION_SOURCES = [
  "LinkedIn",
  "Indeed",
  "Company Website",
  "Referral",
  "AngelList",
  "Glassdoor",
  "Wellfound",
  "HackerNews",
  "Twitter/X",
  "GitHub Jobs",
  "Other",
] as const;

export const KANBAN_COLUMN_ORDER: ApplicationStatus[] = [
  "bookmarked",
  "applying",
  "applied",
  "screening",
  "interviewing",
  "offer",
  "accepted",
];

export const SIDEBAR_WIDTH = 240;
export const SIDEBAR_COLLAPSED_WIDTH = 64;

export const QUERY_KEYS = {
  applications: ["applications"] as const,
  application: (id: string) => ["applications", id] as const,
  analytics: ["analytics"] as const,
  dashboardMetrics: ["dashboard", "metrics"] as const,
  aiInsights: ["ai-insights"] as const,
  user: ["user"] as const,
  resumes: ["resumes"] as const,
} as const;
