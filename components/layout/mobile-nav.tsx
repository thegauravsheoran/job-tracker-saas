"use client";

import { BriefcaseBusiness } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarNavGroup } from "./sidebar-nav";
import { SidebarUserSection } from "./user-menu";
import { NAV_ITEMS, NAV_BOTTOM_ITEMS } from "@/lib/constants";
import { APP_CONFIG } from "@/lib/config";
import { useSidebar } from "@/hooks/use-sidebar";

export function MobileNav() {
  const { isMobileOpen, setMobileSidebarOpen } = useSidebar();

  return (
    <TooltipProvider>
      <Sheet open={isMobileOpen} onOpenChange={setMobileSidebarOpen}>
        <SheetContent side="left" className="w-72 p-0 bg-sidebar border-sidebar-border">
          <SheetHeader className="px-4 py-0 h-16 flex-row items-center space-y-0 border-b border-sidebar-border">
            <div className="flex items-center gap-2.5">
              <div className="flex size-8 items-center justify-center rounded-lg bg-sidebar-primary">
                <BriefcaseBusiness className="size-4 text-sidebar-primary-foreground" />
              </div>
              <div className="flex flex-col leading-none">
                <SheetTitle className="text-sm font-semibold text-sidebar-foreground">
                  {APP_CONFIG.name}
                </SheetTitle>
                <span className="text-[10px] text-sidebar-foreground/50">
                  Career Platform
                </span>
              </div>
            </div>
          </SheetHeader>

          <ScrollArea className="flex-1 h-[calc(100vh-8rem)] px-3 py-4">
            <SidebarNavGroup
              items={NAV_ITEMS}
              isCollapsed={false}
              onItemClick={() => setMobileSidebarOpen(false)}
            />
          </ScrollArea>

          <div className="px-3 pb-4 pt-0">
            <Separator className="mb-3 bg-sidebar-border" />
            <SidebarNavGroup
              items={NAV_BOTTOM_ITEMS}
              isCollapsed={false}
              onItemClick={() => setMobileSidebarOpen(false)}
            />
            <div className="mt-3">
              <SidebarUserSection isCollapsed={false} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}
