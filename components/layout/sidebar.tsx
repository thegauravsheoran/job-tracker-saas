"use client";

import { motion, AnimatePresence } from "framer-motion";
import { PanelLeftClose, PanelLeftOpen, BriefcaseBusiness } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarNavGroup } from "./sidebar-nav";
import { SidebarUserSection } from "./user-menu";
import { NAV_ITEMS, NAV_BOTTOM_ITEMS, SIDEBAR_WIDTH, SIDEBAR_COLLAPSED_WIDTH } from "@/lib/constants";
import { APP_CONFIG } from "@/lib/config";
import { useSidebar } from "@/hooks/use-sidebar";

export function Sidebar() {
  const { isCollapsed, toggle } = useSidebar();

  return (
    <TooltipProvider>
      <motion.aside
        animate={{ width: isCollapsed ? SIDEBAR_COLLAPSED_WIDTH : SIDEBAR_WIDTH }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "hidden md:flex flex-col h-full",
          "bg-sidebar border-r border-sidebar-border",
          "relative shrink-0 overflow-hidden"
        )}
      >
        <SidebarHeader isCollapsed={isCollapsed} onToggle={toggle} />
        <Separator className="bg-sidebar-border" />

        <ScrollArea className="flex-1 px-3 py-4">
          <SidebarNavGroup
            items={NAV_ITEMS}
            isCollapsed={isCollapsed}
          />
        </ScrollArea>

        <div className="px-3 pb-3 pt-0">
          <Separator className="mb-3 bg-sidebar-border" />
          <SidebarNavGroup
            items={NAV_BOTTOM_ITEMS}
            isCollapsed={isCollapsed}
          />
          <div className="mt-3">
            <SidebarUserSection isCollapsed={isCollapsed} />
          </div>
        </div>
      </motion.aside>
    </TooltipProvider>
  );
}

interface SidebarHeaderProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

function SidebarHeader({ isCollapsed, onToggle }: SidebarHeaderProps) {
  return (
    <div
      className={cn(
        "flex h-16 items-center border-b-0 px-3",
        isCollapsed ? "justify-center" : "justify-between"
      )}
    >
      <AnimatePresence mode="wait">
        {!isCollapsed ? (
          <motion.div
            key="full"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.15 }}
            className="flex items-center gap-2.5"
          >
            <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <BriefcaseBusiness className="size-4 text-sidebar-primary-foreground" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold text-sidebar-foreground">
                {APP_CONFIG.name}
              </span>
              <span className="text-[10px] text-sidebar-foreground/50">
                Career Platform
              </span>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="icon"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary"
          >
            <BriefcaseBusiness className="size-4 text-sidebar-primary-foreground" />
          </motion.div>
        )}
      </AnimatePresence>

      {!isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="size-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="Collapse sidebar"
        >
          <PanelLeftClose className="size-4" />
        </Button>
      )}

      {isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="mt-1 size-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
          aria-label="Expand sidebar"
        >
          <PanelLeftOpen className="size-4" />
        </Button>
      )}
    </div>
  );
}
