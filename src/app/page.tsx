import Hero from "@/sections/Hero";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <Hero />
      <Projects />
    </main>
  );
}
