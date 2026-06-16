"use client";

import { usePathname } from "next/navigation";
import { NAV_ITEMS, NAV_BOTTOM_ITEMS } from "@/lib/constants";

const ALL_NAV_ITEMS = [...NAV_ITEMS, ...NAV_BOTTOM_ITEMS];

export function usePathnameTitle(): string {
  const pathname = usePathname();
  const match = ALL_NAV_ITEMS.find((item) => item.href === pathname);
  return match?.label ?? "Dashboard";
}
