import Hero from "@/sections/Hero";
import About from "@/sections/About";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[var(--bg-primary)]">
      <Hero />
      <About />
    </main>
  );
}
