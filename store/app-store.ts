"use client";

import { create } from "zustand";
import type { ApplicationFilters } from "@/types/application";
import type { UserProfile } from "@/types/user";

interface Notification {
  id: string;
  type: "info" | "success" | "warning" | "error";
  title: string;
  description?: string;
  read: boolean;
  createdAt: string;
  href?: string;
}

interface AppState {
  user: UserProfile | null;
  notifications: Notification[];
  unreadNotificationsCount: number;
  applicationFilters: ApplicationFilters;
  searchQuery: string;
  selectedApplicationIds: string[];

  setUser: (user: UserProfile | null) => void;
  setNotifications: (notifications: Notification[]) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  setApplicationFilters: (filters: Partial<ApplicationFilters>) => void;
  resetApplicationFilters: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedApplicationIds: (ids: string[]) => void;
  toggleSelectedApplication: (id: string) => void;
  clearSelectedApplications: () => void;
}

const DEFAULT_FILTERS: ApplicationFilters = {};

export const useAppStore = create<AppState>()((set) => ({
  user: null,
  notifications: [],
  unreadNotificationsCount: 0,
  applicationFilters: DEFAULT_FILTERS,
  searchQuery: "",
  selectedApplicationIds: [],

  setUser: (user) => set({ user }),

  setNotifications: (notifications) =>
    set({
      notifications,
      unreadNotificationsCount: notifications.filter((n) => !n.read).length,
    }),

  markNotificationRead: (id) =>
    set((state) => {
      const updated = state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      );
      return {
        notifications: updated,
        unreadNotificationsCount: updated.filter((n) => !n.read).length,
      };
    }),

  markAllNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
      unreadNotificationsCount: 0,
    })),

  setApplicationFilters: (filters) =>
    set((state) => ({
      applicationFilters: { ...state.applicationFilters, ...filters },
    })),

  resetApplicationFilters: () => set({ applicationFilters: DEFAULT_FILTERS }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setSelectedApplicationIds: (ids) => set({ selectedApplicationIds: ids }),

  toggleSelectedApplication: (id) =>
    set((state) => ({
      selectedApplicationIds: state.selectedApplicationIds.includes(id)
        ? state.selectedApplicationIds.filter((i) => i !== id)
        : [...state.selectedApplicationIds, id],
    })),

  clearSelectedApplications: () => set({ selectedApplicationIds: [] }),
}));
