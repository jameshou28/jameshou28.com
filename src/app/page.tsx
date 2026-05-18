import Hero from "@/sections/Hero";
import About from "@/sections/About";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <LoadingScreen>
      <main className="flex min-h-screen flex-col">
        <div className="relative">
          <Hero />
          <About />
        </div>
      </main>
    </LoadingScreen>
  );
}
