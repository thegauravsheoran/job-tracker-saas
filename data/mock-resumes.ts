export interface ResumeScore {
  ats: number;
  readability: number;
  keywords: number;
  formatting: number;
}

export interface Resume {
  id: string;
  name: string;
  version: string;
  fileName: string;
  fileSize: string;
  uploadedAt: string;
  lastUsed?: string;
  timesUsed: number;
  overallScore: number;
  scores: ResumeScore;
  tags: string[];
  isDefault: boolean;
  applicationsUsed: string[];
  targetRoles: string[];
}

export const MOCK_RESUMES: Resume[] = [
  {
    id: "res_01",
    name: "Staff Engineer — Focused",
    version: "v3.2",
    fileName: "gaurav-sheoran-staff-engineer-v3.2.pdf",
    fileSize: "248 KB",
    uploadedAt: "2026-06-01T10:00:00Z",
    lastUsed: "2026-06-16T08:00:00Z",
    timesUsed: 14,
    overallScore: 91,
    scores: { ats: 94, readability: 92, keywords: 89, formatting: 96 },
    tags: ["staff-level", "frontend", "typescript"],
    isDefault: true,
    applicationsUsed: ["app_01", "app_02", "app_04"],
    targetRoles: ["Staff Engineer", "Principal Engineer"],
  },
  {
    id: "res_02",
    name: "Senior Engineer — General",
    version: "v2.5",
    fileName: "gaurav-sheoran-senior-engineer-v2.5.pdf",
    fileSize: "212 KB",
    uploadedAt: "2026-05-15T09:00:00Z",
    lastUsed: "2026-06-10T14:00:00Z",
    timesUsed: 22,
    overallScore: 84,
    scores: { ats: 88, readability: 85, keywords: 79, formatting: 90 },
    tags: ["senior", "frontend", "react"],
    isDefault: false,
    applicationsUsed: ["app_03", "app_05", "app_06"],
    targetRoles: ["Senior Engineer", "Tech Lead"],
  },
  {
    id: "res_03",
    name: "Full Stack — Startup Focus",
    version: "v1.3",
    fileName: "gaurav-sheoran-fullstack-startup-v1.3.pdf",
    fileSize: "198 KB",
    uploadedAt: "2026-04-20T11:00:00Z",
    lastUsed: "2026-05-28T16:00:00Z",
    timesUsed: 8,
    overallScore: 78,
    scores: { ats: 80, readability: 82, keywords: 71, formatting: 85 },
    tags: ["startup", "fullstack", "generalist"],
    isDefault: false,
    applicationsUsed: ["app_07", "app_08"],
    targetRoles: ["Full Stack Engineer", "Lead Developer"],
  },
  {
    id: "res_04",
    name: "AI/ML Adjacent",
    version: "v1.0",
    fileName: "gaurav-sheoran-ai-adjacent-v1.0.pdf",
    fileSize: "224 KB",
    uploadedAt: "2026-06-10T14:00:00Z",
    timesUsed: 2,
    overallScore: 67,
    scores: { ats: 70, readability: 72, keywords: 58, formatting: 78 },
    tags: ["ai", "ml", "experimental"],
    isDefault: false,
    applicationsUsed: [],
    targetRoles: ["AI Engineer", "ML Platform Engineer"],
  },
];

export const MOCK_RESUME_SUGGESTIONS = [
  {
    id: "sug_01",
    resumeId: "res_02",
    category: "keywords",
    severity: "high" as const,
    title: "Add more TypeScript keywords",
    description:
      "Your general resume is missing 'TypeScript strict mode' and 'type-safe APIs'. Adding these could boost ATS score by ~8 points.",
  },
  {
    id: "sug_02",
    resumeId: "res_02",
    category: "impact",
    severity: "medium" as const,
    title: "Quantify achievements in section 2",
    description:
      "3 bullet points lack measurable outcomes. Add metrics like '40% reduction in bundle size' or 'reduced time-to-interactive by 2s'.",
  },
  {
    id: "sug_03",
    resumeId: "res_03",
    category: "keywords",
    severity: "high" as const,
    title: "Missing modern tooling keywords",
    description:
      "The startup resume doesn't mention Vite, Turborepo, or pnpm workspaces — popular in startup engineering roles in 2026.",
  },
  {
    id: "sug_04",
    resumeId: "res_04",
    category: "relevance",
    severity: "high" as const,
    title: "Expand AI/ML project section",
    description:
      "The AI resume needs concrete examples of working with LLMs, RAG, or ML pipelines to be competitive for these roles.",
  },
];
