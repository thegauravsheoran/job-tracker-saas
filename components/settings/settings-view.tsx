"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Bell,
  Palette,
  Shield,
  CreditCard,
  Save,
  Upload,
  Check,
  Sun,
  Moon,
  Monitor,
  Globe,
  Clock,
  Mail,
  Smartphone,
  MessageSquare,
  AlertTriangle,
  ExternalLink,
  Code2,
  ChevronRight,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useTheme } from "@/components/providers/theme-provider";
import { MOCK_USER } from "@/data/mock-user";
import { cn } from "@/lib/utils";

// ─── Toggle switch ────────────────────────────────────────────────────────────
function Toggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1",
        checked ? "bg-primary" : "bg-muted"
      )}
    >
      <motion.span
        animate={{ x: checked ? 18 : 2 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="inline-block size-4 rounded-full bg-white shadow-sm"
      />
    </button>
  );
}

// ─── Form field ───────────────────────────────────────────────────────────────
function FormField({
  label,
  description,
  children,
}: {
  label: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-1.5">
      <div>
        <label className="text-sm font-medium text-foreground">{label}</label>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-base font-semibold text-foreground">{title}</h3>
      {description && (
        <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
      )}
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfileTab() {
  const user = MOCK_USER.profile;
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: user.name,
    email: user.email,
    title: user.title ?? "",
    location: user.location ?? "",
    bio: user.bio ?? "",
    linkedIn: user.linkedIn ?? "",
    github: user.github ?? "",
    portfolio: user.portfolio ?? "",
    targetRole: user.targetRole ?? "",
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Avatar section */}
      <div>
        <SectionHeader title="Profile Photo" description="Update your avatar displayed across the platform" />
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="flex size-20 items-center justify-center rounded-full border-2 border-border bg-blue-500 text-white text-xl font-bold overflow-hidden">
              {user.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={user.avatar} alt={user.name} className="size-full object-cover" />
              ) : (
                user.name.split(" ").map((n) => n[0]).join("")
              )}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Button variant="outline" size="sm" className="gap-2 w-fit">
              <Upload className="size-3.5" />
              Upload new photo
            </Button>
            <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
          </div>
        </div>
      </div>

      <Separator />

      {/* Personal info */}
      <div>
        <SectionHeader title="Personal Information" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Full Name">
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </FormField>
          <FormField label="Email Address">
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </FormField>
          <FormField label="Job Title">
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="e.g. Senior Frontend Engineer"
            />
          </FormField>
          <FormField label="Location">
            <Input
              value={form.location}
              onChange={(e) => setForm({ ...form, location: e.target.value })}
              placeholder="e.g. San Francisco, CA"
            />
          </FormField>
        </div>
        <div className="mt-4">
          <FormField label="Bio" description="Brief description shown on your profile">
            <textarea
              value={form.bio}
              onChange={(e) => setForm({ ...form, bio: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              placeholder="Tell us a bit about yourself..."
            />
          </FormField>
        </div>
      </div>

      <Separator />

      {/* Social links */}
      <div>
        <SectionHeader title="Social Links" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="LinkedIn">
            <div className="relative">
              <Code2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={form.linkedIn}
                onChange={(e) => setForm({ ...form, linkedIn: e.target.value })}
                className="pl-9"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
          </FormField>
          <FormField label="GitHub">
            <div className="relative">
              <Code2 className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={form.github}
                onChange={(e) => setForm({ ...form, github: e.target.value })}
                className="pl-9"
                placeholder="https://github.com/..."
              />
            </div>
          </FormField>
          <FormField label="Portfolio">
            <div className="relative">
              <ExternalLink className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={form.portfolio}
                onChange={(e) => setForm({ ...form, portfolio: e.target.value })}
                className="pl-9"
                placeholder="https://..."
              />
            </div>
          </FormField>
          <FormField label="Target Role">
            <Input
              value={form.targetRole}
              onChange={(e) => setForm({ ...form, targetRole: e.target.value })}
              placeholder="e.g. Staff Frontend Engineer"
            />
          </FormField>
        </div>
      </div>

      {/* Skills */}
      <Separator />
      <div>
        <SectionHeader title="Skills" description="Skills shown on your profile and used for AI matching" />
        <div className="flex flex-wrap gap-2">
          {user.skills.map((skill) => (
            <span key={skill} className="group flex items-center gap-1.5 rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-foreground">
              {skill}
            </span>
          ))}
          <button className="rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground hover:border-primary hover:text-primary transition-colors">
            + Add skill
          </button>
        </div>
      </div>

      {/* Save button */}
      <div className="flex justify-end pt-2">
        <Button onClick={handleSave} className="gap-2 min-w-24">
          {saved ? (
            <>
              <Check className="size-4" />
              Saved!
            </>
          ) : (
            <>
              <Save className="size-4" />
              Save changes
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────────────────────
function NotificationsTab() {
  const prefs = MOCK_USER.settings.notifications;
  const [settings, setSettings] = useState({
    email: prefs.channels.includes("email"),
    inApp: prefs.channels.includes("in-app"),
    push: prefs.channels.includes("push"),
    deadlineReminders: prefs.deadlineReminders,
    statusChanges: prefs.statusChanges,
    weeklyDigest: prefs.weeklyDigest,
    aiInsights: prefs.aiInsights,
    interviewReminders: true,
    followUpReminders: true,
    marketUpdates: false,
  });

  const groups = [
    {
      title: "Notification Channels",
      description: "Choose how you want to receive notifications",
      items: [
        {
          key: "email" as const,
          icon: Mail,
          label: "Email Notifications",
          description: "Receive notifications at thegauravsheoran@gmail.com",
        },
        {
          key: "inApp" as const,
          icon: MessageSquare,
          label: "In-App Notifications",
          description: "Show notifications in the app interface",
        },
        {
          key: "push" as const,
          icon: Smartphone,
          label: "Push Notifications",
          description: "Browser push notifications when app is closed",
        },
      ],
    },
    {
      title: "Notification Types",
      description: "Control what triggers a notification",
      items: [
        {
          key: "statusChanges" as const,
          icon: ChevronRight,
          label: "Application Status Changes",
          description: "When an application status is updated",
        },
        {
          key: "deadlineReminders" as const,
          icon: Clock,
          label: "Deadline Reminders",
          description: "48h before application deadlines",
        },
        {
          key: "interviewReminders" as const,
          icon: Bell,
          label: "Interview Reminders",
          description: "24h and 1h before scheduled interviews",
        },
        {
          key: "followUpReminders" as const,
          icon: MessageSquare,
          label: "Follow-Up Reminders",
          description: "When applications haven't had activity in 7+ days",
        },
        {
          key: "weeklyDigest" as const,
          icon: Globe,
          label: "Weekly Digest",
          description: "Sunday summary of your job search activity",
        },
        {
          key: "aiInsights" as const,
          icon: ChevronRight,
          label: "AI Insight Notifications",
          description: "When new AI recommendations are available",
        },
        {
          key: "marketUpdates" as const,
          icon: ChevronRight,
          label: "Market Updates",
          description: "Weekly market trends and salary benchmarks",
        },
      ],
    },
  ];

  return (
    <div className="space-y-8">
      {groups.map((group) => (
        <div key={group.title}>
          <SectionHeader title={group.title} description={group.description} />
          <div className="space-y-1">
            {group.items.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.key}
                  className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-3.5"
                >
                  <div className="flex items-center gap-3">
                    <Icon className="size-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </div>
                  <Toggle
                    checked={settings[item.key]}
                    onChange={(v) => setSettings({ ...settings, [item.key]: v })}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ))}

      <div className="flex justify-end">
        <Button size="sm" className="gap-2">
          <Save className="size-4" />
          Save preferences
        </Button>
      </div>
    </div>
  );
}

// ─── Appearance Tab ───────────────────────────────────────────────────────────
function AppearanceTab() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeOptions = [
    { value: "light" as const, label: "Light", icon: Sun, description: "Clean light interface" },
    { value: "dark" as const, label: "Dark", icon: Moon, description: "Easy on the eyes" },
    { value: "system" as const, label: "System", icon: Monitor, description: "Follows OS setting" },
  ];

  const [density, setDensity] = useState<"comfortable" | "compact">("comfortable");
  const [language, setLanguage] = useState("en");
  const [timezone, setTimezone] = useState("America/Los_Angeles");

  return (
    <div className="space-y-8">
      {/* Theme */}
      <div>
        <SectionHeader title="Theme" description="Choose your preferred color scheme" />
        <div className="grid gap-3 sm:grid-cols-3">
          {themeOptions.map((opt) => {
            const Icon = opt.icon;
            const selected = theme === opt.value;
            return (
              <button
                key={opt.value}
                onClick={() => setTheme(opt.value)}
                className={cn(
                  "flex items-start gap-3 rounded-xl border p-4 text-left transition-all",
                  selected
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border bg-card hover:border-primary/30"
                )}
              >
                <Icon className={cn("size-5 mt-0.5 shrink-0", selected ? "text-primary" : "text-muted-foreground")} />
                <div>
                  <p className="text-sm font-medium text-foreground">{opt.label}</p>
                  <p className="text-xs text-muted-foreground">{opt.description}</p>
                </div>
                {selected && (
                  <Check className="size-4 text-primary ml-auto shrink-0" />
                )}
              </button>
            );
          })}
        </div>
        <p className="mt-2 text-xs text-muted-foreground">
          Current: {resolvedTheme === "dark" ? "🌙 Dark" : "☀️ Light"} mode active
        </p>
      </div>

      <Separator />

      {/* Density */}
      <div>
        <SectionHeader title="Display Density" description="Adjust how compact the interface appears" />
        <div className="flex gap-3">
          {(["comfortable", "compact"] as const).map((d) => (
            <button
              key={d}
              onClick={() => setDensity(d)}
              className={cn(
                "flex-1 rounded-xl border p-4 text-center transition-all",
                density === d
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-primary/30"
              )}
            >
              <p className="text-sm font-medium capitalize text-foreground">{d}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {d === "comfortable" ? "More whitespace, easier reading" : "More content visible"}
              </p>
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Language & timezone */}
      <div>
        <SectionHeader title="Regional Settings" />
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField label="Language">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="en">English (US)</option>
              <option value="en-GB">English (UK)</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </FormField>
          <FormField label="Timezone">
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="America/Los_Angeles">Pacific Time (PT)</option>
              <option value="America/New_York">Eastern Time (ET)</option>
              <option value="America/Chicago">Central Time (CT)</option>
              <option value="Europe/London">London (GMT)</option>
              <option value="Europe/Paris">Paris (CET)</option>
              <option value="Asia/Tokyo">Tokyo (JST)</option>
            </select>
          </FormField>
        </div>
      </div>

      <div className="flex justify-end">
        <Button size="sm" className="gap-2">
          <Save className="size-4" />
          Save preferences
        </Button>
      </div>
    </div>
  );
}

// ─── Account Tab ──────────────────────────────────────────────────────────────
function AccountTab() {
  const sub = MOCK_USER.subscription;

  return (
    <div className="space-y-8">
      {/* Subscription */}
      <div>
        <SectionHeader title="Subscription" description="Manage your CareerFlow AI plan" />
        <div className="rounded-xl border border-border bg-card p-5">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2">
                <h4 className="text-base font-semibold capitalize text-foreground">
                  {sub.tier} Plan
                </h4>
                <Badge className="capitalize">{sub.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Renews on{" "}
                {new Date(sub.currentPeriodEnd!).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <Button variant="outline" size="sm">
              Manage Plan
              <ExternalLink className="ml-1.5 size-3.5" />
            </Button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                label: "Applications",
                used: sub.applicationsUsed,
                limit: "Unlimited",
                pct: 0,
              },
              {
                label: "AI Credits",
                used: sub.aiCreditsUsed,
                limit: sub.aiCreditsLimit,
                pct: (sub.aiCreditsUsed / Number(sub.aiCreditsLimit)) * 100,
              },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-border p-3">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-medium text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-semibold text-foreground">
                    {item.used} / {item.limit}
                  </span>
                </div>
                {item.pct > 0 && (
                  <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                    <div
                      className="h-full rounded-full bg-primary"
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Separator />

      {/* Data */}
      <div>
        <SectionHeader title="Your Data" description="Export or manage your CareerFlow AI data" />
        <div className="space-y-2.5">
          {[
            { label: "Export all data", description: "Download a full export of your applications, analytics, and resumes as JSON/CSV", action: "Export" },
            { label: "Export to spreadsheet", description: "Download your applications as a formatted Excel spreadsheet", action: "Export" },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between rounded-xl border border-border bg-card px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <Button variant="outline" size="sm">{item.action}</Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Danger zone */}
      <div>
        <SectionHeader title="Danger Zone" description="Irreversible actions — proceed with caution" />
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-semibold text-foreground">Delete Account</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Permanently delete your account and all associated data. This action cannot be undone.
              </p>
            </div>
          </div>
          <Button variant="destructive" size="sm" className="gap-2">
            <Trash2 className="size-4" />
            Delete my account
          </Button>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────
const SETTINGS_TABS = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "security", label: "Security", icon: Shield },
  { id: "billing", label: "Billing", icon: CreditCard },
] as const;

type TabId = (typeof SETTINGS_TABS)[number]["id"];

// ─── Main View ────────────────────────────────────────────────────────────────
export function SettingsView() {
  const [activeTab, setActiveTab] = useState<TabId>("profile");

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground text-sm mt-0.5">
          Manage your account, preferences, and billing
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Sidebar nav */}
        <nav className="lg:col-span-1">
          <div className="space-y-1">
            {SETTINGS_TABS.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-lg px-3 py-2.5 text-left text-sm font-medium transition-colors",
                    activeTab === tab.id
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {tab.label}
                  {tab.id === "notifications" && (
                    <span className="ml-auto flex size-4 items-center justify-center rounded-full bg-primary text-[9px] font-bold text-primary-foreground">
                      3
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Tab content */}
        <div className="rounded-xl border border-border bg-card p-6 lg:col-span-3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              {activeTab === "profile" && <ProfileTab />}
              {activeTab === "notifications" && <NotificationsTab />}
              {activeTab === "appearance" && <AppearanceTab />}
              {activeTab === "security" && (
                <div className="flex flex-col gap-6">
                  <SectionHeader title="Security" description="Manage your password and account security" />
                  <div className="rounded-xl border border-border bg-muted/30 p-8 text-center">
                    <Shield className="size-10 text-muted-foreground mx-auto mb-3" />
                    <p className="text-sm font-medium text-foreground">Security settings</p>
                    <p className="text-xs text-muted-foreground mt-1">Password change, 2FA, and session management coming soon.</p>
                  </div>
                </div>
              )}
              {activeTab === "billing" && <AccountTab />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
