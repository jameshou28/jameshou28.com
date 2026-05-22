import type { Metadata } from "next";
import Projects from "@/sections/Projects";

const pageDescription =
  "Discover the physical engineering, hardware projects, and robotics built by James Hou, a high school software & hardware engineer.";

export const metadata: Metadata = {
  title: "James Hou | Engineering Projects",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Engineering Projects",
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
