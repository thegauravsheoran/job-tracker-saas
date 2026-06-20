import { type LucideIcon, TrendingUp, TrendingDown, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number;
  trendLabel?: string;
  iconClassName?: string;
  loading?: boolean;
  description?: string;
}

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  iconClassName,
  loading = false,
  description,
}: StatCardProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-border bg-card p-5">
        <div className="flex items-center justify-between mb-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="size-9 rounded-lg" />
        </div>
        <Skeleton className="h-8 w-16 mb-1" />
        <Skeleton className="h-3 w-20" />
      </div>
    );
  }

  const isPositive = trend !== undefined && trend > 0;
  const isNegative = trend !== undefined && trend < 0;
  const TrendIcon = isPositive ? TrendingUp : isNegative ? TrendingDown : Minus;

  return (
    <div className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div
          className={cn(
            "flex size-9 items-center justify-center rounded-lg",
            iconClassName ?? "bg-primary/10"
          )}
        >
          <Icon className={cn("size-4", iconClassName ? "text-white" : "text-primary")} />
        </div>
      </div>
      <p className="text-3xl font-bold tracking-tight text-card-foreground">
        {value}
      </p>
      {(trend !== undefined || description) && (
        <div className="mt-1.5 flex items-center gap-1.5">
          {trend !== undefined && (
            <>
              <TrendIcon
                className={cn(
                  "size-3",
                  isPositive && "text-emerald-500",
                  isNegative && "text-red-500",
                  !isPositive && !isNegative && "text-muted-foreground"
                )}
              />
              <span
                className={cn(
                  "text-xs font-medium",
                  isPositive && "text-emerald-600",
                  isNegative && "text-red-600",
                  !isPositive && !isNegative && "text-muted-foreground"
                )}
              >
                {isPositive ? "+" : ""}
                {trend}%
              </span>
            </>
          )}
          {trendLabel && (
            <span className="text-xs text-muted-foreground">{trendLabel}</span>
          )}
          {description && (
            <span className="text-xs text-muted-foreground">{description}</span>
          )}
        </div>
      )}
    </div>
  );
}
