import type { Metadata } from "next";
import { ResumeManagerView } from "@/components/resume-manager/resume-manager-view";

export const metadata: Metadata = {
  title: "Resume Manager",
  description:
    "Manage multiple resume versions with AI scoring. Track which resume gets the most callbacks.",
};

export default function ResumeManagerPage() {
  return <ResumeManagerView />;
}
