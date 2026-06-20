import { cn } from "@/lib/utils";
import { APPLICATION_STATUS_CONFIG } from "@/lib/constants";
import type { ApplicationStatus } from "@/types/application";

interface StatusBadgeProps {
  status: ApplicationStatus;
  size?: "sm" | "default";
  className?: string;
}

export function StatusBadge({
  status,
  size = "default",
  className,
}: StatusBadgeProps) {
  const config = APPLICATION_STATUS_CONFIG[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        config.color,
        config.bgColor,
        size === "sm"
          ? "px-2 py-0.5 text-[10px]"
          : "px-2.5 py-1 text-xs",
        className
      )}
    >
      <span
        className={cn(
          "mr-1.5 inline-block rounded-full",
          size === "sm" ? "size-1" : "size-1.5",
          "bg-current opacity-70"
        )}
      />
      {config.label}
    </span>
  );
}
