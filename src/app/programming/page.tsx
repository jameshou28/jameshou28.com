import type { Metadata } from "next";
import Projects from "@/sections/Projects";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Programming portfolio featuring web apps, accessibility tools, and software projects by James Hou.",
};

export default function ProgrammingPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)] pt-12">
      <Projects category="programming" />
    </main>
  );
}
