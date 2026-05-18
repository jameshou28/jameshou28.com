import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import FloatingShapes from "@/components/3d/FloatingShapes";
import LoadingScreen from "@/components/ui/LoadingScreen";

const pageDescription =
  "James Hou is an applied AI engineer building software, AI, and robotics projects.";

export const metadata: Metadata = {
  title: "James Hou | Applied AI Engineer",
  description: pageDescription,
  openGraph: {
    title: "James Hou | Applied AI Engineer",
    description: pageDescription,
  },
};

export default function Home() {
  return (
    <LoadingScreen>
      <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
        {/* Shared container so the floating shapes span both Hero and About */}
        <div className="relative">
          <FloatingShapes />
          <Hero />
          <About />
        </div>
      </main>
    </LoadingScreen>
  );
}
