import type { Metadata } from "next";
import Contact from "@/sections/Contact";

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

export default function ContactPage() {
  return (
    <main className="flex min-h-screen flex-col pt-12">
      <Contact />
    </main>
  );
}
