import type { Metadata } from "next";
import Projects from "@/sections/Projects";

const pageDescription =
  "James Hou is an applied AI engineer sharing robotics, CAD, and embedded engineering work.";

export const metadata: Metadata = {
  title: "James Hou | Applied AI Engineer",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Applied AI Engineer",
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
