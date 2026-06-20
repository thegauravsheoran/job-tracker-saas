"use client";

import type { ReactNode } from "react";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";
import { StoreInitializer } from "./store-initializer";

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <QueryProvider>
      <ThemeProvider>
        <StoreInitializer />
        {children}
      </ThemeProvider>
    </QueryProvider>
  );
}
