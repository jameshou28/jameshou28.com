import Hero from "@/sections/Hero";
import About from "@/sections/About";
import FloatingShapes from "@/components/3d/FloatingShapes";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      {/* Shared container so the floating shapes span both Hero and About */}
      <div className="relative">
        <FloatingShapes />
        <Hero />
        <About />
      </div>
    </main>
  );
}
