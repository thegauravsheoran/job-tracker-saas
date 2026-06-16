export type ApplicationStatus =
  | "bookmarked"
  | "applying"
  | "applied"
  | "screening"
  | "interviewing"
  | "offer"
  | "rejected"
  | "withdrawn"
  | "accepted";

export type WorkMode = "remote" | "hybrid" | "onsite";

export type EmploymentType =
  | "full-time"
  | "part-time"
  | "contract"
  | "internship"
  | "freelance";

export type InterviewType =
  | "phone"
  | "video"
  | "onsite"
  | "technical"
  | "behavioral"
  | "panel";

export interface Interview {
  id: string;
  type: InterviewType;
  scheduledAt: string;
  duration: number;
  location?: string;
  interviewers?: string[];
  notes?: string;
  outcome?: "passed" | "failed" | "pending";
}

export interface Contact {
  id: string;
  name: string;
  title?: string;
  email?: string;
  linkedIn?: string;
  phone?: string;
  notes?: string;
}

export interface Salary {
  min?: number;
  max?: number;
  currency: string;
  period: "hourly" | "monthly" | "annual";
  disclosed: boolean;
}

export interface Application {
  id: string;
  companyName: string;
  companyLogo?: string;
  companyWebsite?: string;
  jobTitle: string;
  jobUrl?: string;
  status: ApplicationStatus;
  workMode: WorkMode;
  employmentType: EmploymentType;
  location: string;
  salary?: Salary;
  appliedAt?: string;
  deadline?: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
  notes?: string;
  tags: string[];
  interviews: Interview[];
  contacts: Contact[];
  resumeUsed?: string;
  coverLetterUsed?: string;
  priority: "low" | "medium" | "high";
  excitement: 1 | 2 | 3 | 4 | 5;
  referral?: string;
  source: string;
}

export interface ApplicationFilters {
  status?: ApplicationStatus[];
  workMode?: WorkMode[];
  employmentType?: EmploymentType[];
  priority?: Array<"low" | "medium" | "high">;
  tags?: string[];
  search?: string;
  dateRange?: { from: string; to: string };
}

export interface KanbanColumn {
  id: ApplicationStatus;
  label: string;
  color: string;
  applications: Application[];
}
