import type { Metadata } from "next";
import { SettingsView } from "@/components/settings/settings-view";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your account settings, preferences, notifications, and billing.",
};

export default function SettingsPage() {
  return <SettingsView />;
}
