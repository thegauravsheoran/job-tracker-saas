export type SubscriptionTier = "free" | "pro" | "enterprise";

export type NotificationChannel = "email" | "push" | "in-app";

export interface NotificationPreferences {
  channels: NotificationChannel[];
  deadlineReminders: boolean;
  statusChanges: boolean;
  weeklyDigest: boolean;
  aiInsights: boolean;
}

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  title?: string;
  bio?: string;
  location?: string;
  linkedIn?: string;
  github?: string;
  portfolio?: string;
  targetRole?: string;
  targetSalaryMin?: number;
  targetSalaryMax?: number;
  targetWorkMode?: Array<"remote" | "hybrid" | "onsite">;
  skills: string[];
  yearsOfExperience?: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserSubscription {
  tier: SubscriptionTier;
  status: "active" | "cancelled" | "past_due" | "trialing";
  currentPeriodEnd?: string;
  trialEnd?: string;
  applicationsLimit: number;
  applicationsUsed: number;
  aiCreditsLimit: number;
  aiCreditsUsed: number;
}

export interface UserSettings {
  theme: "light" | "dark" | "system";
  language: string;
  timezone: string;
  dateFormat: string;
  currency: string;
  notifications: NotificationPreferences;
  defaultWorkMode?: "remote" | "hybrid" | "onsite";
  defaultEmploymentType?: string;
}

export interface User {
  profile: UserProfile;
  subscription: UserSubscription;
  settings: UserSettings;
}
