import type { Metadata } from "next";
import Contact from "@/sections/Contact";

const pageDescription =
  "Get in touch with James Hou, a high school software & hardware engineer. Connect via email, LinkedIn, or GitHub for collaborations and opportunities.";

export const metadata: Metadata = {
  title: "James Hou | Contact",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Contact",
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
