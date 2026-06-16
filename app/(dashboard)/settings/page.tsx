import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Settings",
  description:
    "Manage your account settings, preferences, notifications, and billing.",
};

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account, preferences, and billing.
        </p>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <nav className="space-y-1 lg:col-span-1">
          {["Profile", "Preferences", "Notifications", "Billing", "API Keys", "Danger Zone"].map(
            (section) => (
              <button
                key={section}
                className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors first:bg-accent first:text-accent-foreground"
              >
                {section}
              </button>
            )
          )}
        </nav>

        <div className="rounded-xl border border-border bg-card p-6 shadow-sm lg:col-span-3">
          <h3 className="text-base font-semibold mb-4">Profile Settings</h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              {["Full Name", "Email Address", "Job Title", "Location"].map((field) => (
                <div key={field}>
                  <label className="text-xs font-medium text-muted-foreground">
                    {field}
                  </label>
                  <div className="mt-1 h-9 rounded-md border border-border bg-muted/40" />
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              ⚙️ Full settings form with validation will be implemented here.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
