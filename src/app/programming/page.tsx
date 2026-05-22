import type { Metadata } from "next";
import Projects from "@/sections/Projects";

const pageDescription =
  "Browse the programming projects, web applications, AI tools, and software developed by James Hou, a high school software & hardware engineer.";

export const metadata: Metadata = {
  title: "James Hou | Programming Projects",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Programming Projects",
    description: pageDescription,
  },
};

export default function ProgrammingPage() {
  return (
    <main className="flex min-h-screen flex-col pt-12">
      <Projects category="programming" />
    </main>
  );
}
