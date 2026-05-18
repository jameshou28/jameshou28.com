import type { Metadata } from "next";
import Projects from "@/sections/Projects";

const pageDescription =
  "James Hou is an applied AI engineer sharing software, web, and accessibility projects.";

export const metadata: Metadata = {
  title: "James Hou | Applied AI Engineer",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Applied AI Engineer",
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
