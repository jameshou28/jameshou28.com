import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Projects from "@/sections/Projects";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <Hero />
      <About />
      <Projects />
    </main>
  );
}
