"use client";

import { useState } from "react";
import { Menu, Bell, Search, Sun, Moon, Monitor, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/hooks/use-sidebar";
import { usePathnameTitle } from "@/hooks/use-pathname-title";
import { useTheme } from "@/components/providers/theme-provider";
import { useAppStore } from "@/store";
import { MOCK_USER } from "@/data/mock-user";
import { MOCK_NOTIFICATIONS } from "@/data/mock-user";

export function TopNavbar() {
  const { toggle, isMobile } = useSidebar();
  const pageTitle = usePathnameTitle();
  const { resolvedTheme, setTheme } = useTheme();
  const { unreadNotificationsCount, markAllNotificationsRead } = useAppStore();
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const user = MOCK_USER.profile;

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <TooltipProvider>
      <header className="flex h-16 shrink-0 items-center gap-3 border-b border-border bg-background px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="size-9 md:hidden"
          onClick={toggle}
          aria-label="Open navigation menu"
        >
          <Menu className="size-5" />
        </Button>

        <AnimatePresence mode="wait">
          {!searchOpen && (
            <motion.h1
              key="title"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.15 }}
              className="text-base font-semibold text-foreground md:text-lg"
            >
              {pageTitle}
            </motion.h1>
          )}
        </AnimatePresence>

        <div className="ml-auto flex items-center gap-1.5">
          <AnimatePresence mode="wait">
            {searchOpen ? (
              <motion.div
                key="search-input"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: "clamp(160px, 20vw, 280px)", opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="overflow-hidden"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    autoFocus
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search applications..."
                    className="h-9 pl-9 pr-8 text-sm"
                    onKeyDown={(e) => e.key === "Escape" && setSearchOpen(false)}
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      <X className="size-3.5" />
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="search-btn"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-9"
                      onClick={() => setSearchOpen(true)}
                      aria-label="Search"
                    >
                      <Search className="size-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Search (⌘K)</TooltipContent>
                </Tooltip>
              </motion.div>
            )}
          </AnimatePresence>

          {searchOpen && (
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              aria-label="Close search"
            >
              <X className="size-4" />
            </Button>
          )}

          <NotificationsDropdown
            count={unreadNotificationsCount}
            onMarkAllRead={markAllNotificationsRead}
          />

          <ThemeToggle resolvedTheme={resolvedTheme} setTheme={setTheme} />

          <UserAvatarMenu initials={initials} user={user} />
        </div>
      </header>
    </TooltipProvider>
  );
}

function NotificationsDropdown({
  count,
  onMarkAllRead,
}: {
  count: number;
  onMarkAllRead: () => void;
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative size-9"
              aria-label="Notifications"
            >
              <Bell className="size-4" />
              {count > 0 && (
                <span className="absolute right-1.5 top-1.5 flex size-4 items-center justify-center rounded-full bg-destructive text-[9px] font-bold text-destructive-foreground">
                  {count > 9 ? "9+" : count}
                </span>
              )}
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Notifications</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between px-3 py-2">
          <DropdownMenuLabel className="p-0 text-sm font-semibold">
            Notifications
          </DropdownMenuLabel>
          {count > 0 && (
            <button
              onClick={onMarkAllRead}
              className="text-xs text-primary hover:underline"
            >
              Mark all read
            </button>
          )}
        </div>
        <DropdownMenuSeparator />
        {MOCK_NOTIFICATIONS.slice(0, 5).map((notification) => (
          <DropdownMenuItem
            key={notification.id}
            className={cn(
              "flex flex-col items-start gap-0.5 px-3 py-2.5",
              !notification.read && "bg-accent/50"
            )}
          >
            <div className="flex w-full items-start gap-2">
              {!notification.read && (
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary" />
              )}
              <div className={cn("flex-1", notification.read && "pl-3.5")}>
                <p className="text-xs font-medium leading-snug">
                  {notification.title}
                </p>
                {notification.description && (
                  <p className="mt-0.5 text-xs text-muted-foreground leading-snug">
                    {notification.description}
                  </p>
                )}
              </div>
            </div>
          </DropdownMenuItem>
        ))}
        {MOCK_NOTIFICATIONS.length === 0 && (
          <div className="px-3 py-6 text-center text-sm text-muted-foreground">
            No notifications
          </div>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ThemeToggle({
  resolvedTheme,
  setTheme,
}: {
  resolvedTheme: "light" | "dark";
  setTheme: (t: "light" | "dark" | "system") => void;
}) {
  return (
    <DropdownMenu>
      <Tooltip>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="size-9"
              aria-label="Toggle theme"
            >
              <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            </Button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent>Toggle theme</TooltipContent>
      </Tooltip>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>
          <Sun className="mr-2 size-4" />
          Light
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          <Moon className="mr-2 size-4" />
          Dark
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>
          <Monitor className="mr-2 size-4" />
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function UserAvatarMenu({
  initials,
  user,
}: {
  initials: string;
  user: { name: string; email: string; avatar?: string };
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative size-9 rounded-full p-0"
          aria-label="User menu"
        >
          <Avatar className="size-8">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{user.name}</p>
            <p className="text-xs text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive focus:text-destructive">
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
