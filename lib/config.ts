export const APP_CONFIG = {
  name: "CareerFlow AI",
  tagline: "AI-Powered Career Management Platform",
  description:
    "Track, manage, and optimize your job search with AI-powered insights. Land your dream job faster.",
  url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  version: "1.0.0",
} as const;

export const META_CONFIG = {
  title: {
    default: APP_CONFIG.name,
    template: `%s | ${APP_CONFIG.name}`,
  },
  description: APP_CONFIG.description,
  keywords: [
    "job tracker",
    "job application",
    "career",
    "AI",
    "job search",
    "interview tracker",
  ],
} as const;

export const SUBSCRIPTION_LIMITS = {
  free: {
    applications: 25,
    aiCredits: 10,
    resumes: 1,
    label: "Free",
  },
  pro: {
    applications: Infinity,
    aiCredits: 500,
    resumes: 10,
    label: "Pro",
  },
  enterprise: {
    applications: Infinity,
    aiCredits: Infinity,
    resumes: Infinity,
    label: "Enterprise",
  },
} as const;

export const ANIMATION_CONFIG = {
  spring: { type: "spring", stiffness: 300, damping: 30 },
  smooth: { duration: 0.2, ease: "easeInOut" },
  fade: { duration: 0.15 },
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

export const DATE_FORMATS = {
  display: "MMM d, yyyy",
  displayShort: "MMM d",
  iso: "yyyy-MM-dd",
  full: "MMMM d, yyyy",
} as const;

export const STALE_TIMES = {
  short: 30 * 1000,
  medium: 5 * 60 * 1000,
  long: 30 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
} as const;
