import type { Metadata } from "next";
import Projects from "@/sections/Projects";

const pageDescription =
  "James Hou is a high school developer building mobile apps, websites, AI projects, and more.";

export const metadata: Metadata = {
  title: "James Hou | High School Developer",
  description: pageDescription,
  openGraph: {
    title: "James Hou | High School Developer",
    description: pageDescription,
  },
};

export default function EngineeringPage() {
  return (
    <main className="flex min-h-screen flex-col pt-12">
      <Projects category="engineering" />
    </main>
  );
}
