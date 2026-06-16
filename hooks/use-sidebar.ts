"use client";

import { useUIStore } from "@/store";
import { useIsMobile } from "./use-media-query";

export function useSidebar() {
  const {
    sidebarCollapsed,
    mobileSidebarOpen,
    toggleSidebarCollapsed,
    setSidebarCollapsed,
    setMobileSidebarOpen,
  } = useUIStore();
  const isMobile = useIsMobile();

  const toggle = () => {
    if (isMobile) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      toggleSidebarCollapsed();
    }
  };

  const close = () => {
    if (isMobile) {
      setMobileSidebarOpen(false);
    }
  };

  return {
    isCollapsed: isMobile ? false : sidebarCollapsed,
    isMobileOpen: mobileSidebarOpen,
    isMobile,
    toggle,
    close,
    setSidebarCollapsed,
    setMobileSidebarOpen,
  };
}
