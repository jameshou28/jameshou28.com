import Hero from "@/sections/Hero";
import About from "@/sections/About";
import FloatingShapes from "@/components/3d/FloatingShapes";
import LoadingScreen from "@/components/ui/LoadingScreen";

export default function Home() {
  return (
    <LoadingScreen>
      <main className="flex min-h-screen flex-col">
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
