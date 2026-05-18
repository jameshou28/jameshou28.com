import type { Metadata } from "next";
import Projects from "@/sections/Projects";

export const metadata: Metadata = {
  title: "Engineering",
  description:
    "Engineering portfolio featuring robotics, CAD, and embedded systems work by James Hou.",
};

export default function EngineeringPage() {
  return (
    <main className="flex min-h-screen flex-col pt-12">
      <Projects category="engineering" />
    </main>
  );
}
