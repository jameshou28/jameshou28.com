import Scene from "@/components/3d/Scene";
import ModelViewer from "@/components/3d/ModelViewer";

export default function Hero() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[var(--bg-primary)]">
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <Scene enableControls={false}>
          <ModelViewer 
            modelPath="/models/qpin.glb" 
            scale={20} 
            position={[0, -1, 0]} 
            rotation={[-Math.PI/4, Math.PI, Math.PI]}
            enableParallax={true}
            autoRotate={true}
          />
        </Scene>
      </div>

      {/* HTML Overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <div className="text-center px-4 text-[var(--text-primary)]">
          <h1 className="text-6xl md:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
            James Hou
          </h1>
          <p className="text-xl md:text-2xl font-[family-name:var(--font-body)] opacity-90 max-w-2xl mx-auto font-light">
            From CAD to code — engineering what matters.
          </p>
          
          <button className="mt-12 px-8 py-4 rounded-full border border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] backdrop-blur-md font-medium hover:bg-transparent hover:text-[var(--text-primary)] transition-all pointer-events-auto">
            See what I've built &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
