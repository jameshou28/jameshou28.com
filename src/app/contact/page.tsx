import type { Metadata } from "next";
import Contact from "@/sections/Contact";

const pageDescription =
  "James Hou is an applied AI engineer—reach out for collaborations, projects, or opportunities.";

export const metadata: Metadata = {
  title: "James Hou | Applied AI Engineer",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Applied AI Engineer",
    description: pageDescription,
  },
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)] pt-12">
      <Contact />
    </main>
  );
}
