import type { Metadata } from "next";
import Contact from "@/sections/Contact";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact James Hou for collaborations, projects, or opportunities.",
};

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)] pt-12">
      <Contact />
    </main>
  );
}
