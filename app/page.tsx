import type { Metadata } from "next";
import { LandingPage } from "@/components/landing/landing-page";

export const metadata: Metadata = {
  title: "CareerFlow AI — Land Your Dream Job, Faster",
  description:
    "AI-powered job application tracker. Track applications, manage interviews, analyze performance, and get AI-driven career insights. Built for ambitious engineers.",
};

export default function Page() {
  return <LandingPage />;
}
