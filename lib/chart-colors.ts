export const CHART_COLORS = {
  blue: "#3b82f6",
  violet: "#8b5cf6",
  emerald: "#10b981",
  amber: "#f59e0b",
  red: "#ef4444",
  cyan: "#06b6d4",
  pink: "#ec4899",
  orange: "#f97316",
  slate: "#64748b",
  indigo: "#6366f1",
} as const;

export const STATUS_CHART_COLORS: Record<string, string> = {
  bookmarked: "#64748b",
  applying: "#3b82f6",
  applied: "#6366f1",
  screening: "#8b5cf6",
  interviewing: "#f59e0b",
  offer: "#10b981",
  accepted: "#22c55e",
  rejected: "#ef4444",
  withdrawn: "#9ca3af",
};

export const CHART_GRADIENT_IDS = {
  blue: "blueGradient",
  violet: "violetGradient",
  emerald: "emeraldGradient",
  amber: "amberGradient",
} as const;

export const RECHARTS_TOOLTIP_STYLE = {
  backgroundColor: "hsl(var(--popover))",
  border: "1px solid hsl(var(--border))",
  borderRadius: "8px",
  boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
  fontSize: "12px",
  color: "hsl(var(--popover-foreground))",
};
