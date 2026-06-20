"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/store";
import { MOCK_USER } from "@/data/mock-user";
import { MOCK_NOTIFICATIONS } from "@/data/mock-user";

export function StoreInitializer() {
  const { setUser, setNotifications } = useAppStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    setUser(MOCK_USER.profile);
    setNotifications(MOCK_NOTIFICATIONS);
  }, [setUser, setNotifications]);

  return null;
}
