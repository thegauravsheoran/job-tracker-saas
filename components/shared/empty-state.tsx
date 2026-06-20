import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border p-12 text-center",
        className
      )}
    >
      <div className="flex size-14 items-center justify-center rounded-full bg-muted">
        <Icon className="size-6 text-muted-foreground" />
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        <p className="mt-1 text-sm text-muted-foreground max-w-xs">
          {description}
        </p>
      </div>
      {action && (
        <Button size="sm" onClick={action.onClick}>
          {action.label}
        </Button>
      )}
    </div>
  );
}
