"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { NavItem } from "@/types";

interface SidebarNavItemProps {
  item: NavItem;
  isCollapsed: boolean;
  onClick?: () => void;
}

export function SidebarNavItem({
  item,
  isCollapsed,
  onClick,
}: SidebarNavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === item.href;
  const Icon = item.icon;

  const linkContent = (
    <Link
      href={item.href}
      onClick={onClick}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        isActive
          ? "bg-sidebar-accent text-sidebar-accent-foreground"
          : "text-sidebar-foreground/70",
        isCollapsed && "justify-center px-2"
      )}
    >
      {isActive && (
        <motion.div
          layoutId="active-nav"
          className="absolute inset-0 rounded-lg bg-sidebar-accent"
          transition={{ type: "spring", stiffness: 350, damping: 35 }}
        />
      )}
      <Icon
        className={cn(
          "relative z-10 size-[18px] shrink-0 transition-colors",
          isActive
            ? "text-sidebar-primary"
            : "text-sidebar-foreground/60 group-hover:text-sidebar-foreground"
        )}
      />
      {!isCollapsed && (
        <span className="relative z-10 truncate">{item.label}</span>
      )}
      {!isCollapsed && item.badge !== undefined && (
        <span className="relative z-10 ml-auto flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-primary-foreground">
          {item.badge}
        </span>
      )}
    </Link>
  );

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }

  return linkContent;
}

interface SidebarNavGroupProps {
  items: NavItem[];
  isCollapsed: boolean;
  onItemClick?: () => void;
}

export function SidebarNavGroup({
  items,
  isCollapsed,
  onItemClick,
}: SidebarNavGroupProps) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((item) => (
        <SidebarNavItem
          key={item.href}
          item={item}
          isCollapsed={isCollapsed}
          onClick={onItemClick}
        />
      ))}
    </nav>
  );
}
