import Hero from "@/sections/Hero";
import About from "@/sections/About";
import LoadingScreen from "@/components/ui/LoadingScreen";
import FloatingShapes from "@/components/3d/FloatingShapes";

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
