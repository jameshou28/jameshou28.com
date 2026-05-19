import type { Metadata } from "next";
import Hero from "@/sections/Hero";
import About from "@/sections/About";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingShapes from "@/components/3d/FloatingShapes";

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

export default function Home() {
  return (
    <LoadingScreen>
      <main className="flex min-h-screen flex-col">
        <div className="relative">
          <FloatingShapes />

          <Hero />
          <About />
        </div>
      </main>
    </LoadingScreen>
  );
}
