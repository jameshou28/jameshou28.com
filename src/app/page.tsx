import Scene from "@/components/3d/Scene";
import PlaceholderGeometry from "@/components/3d/PlaceholderGeometry";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex mb-8">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          James Hou 3D Portfolio
        </p>
      </div>

      <div className="relative flex place-items-center w-full h-[60vh] rounded-2xl overflow-hidden bg-[var(--bg-elevated)] border border-[var(--border)] shadow-sm">
        <Scene>
          <PlaceholderGeometry />
        </Scene>
      </div>
      
      <p className="mt-8 text-[var(--text-secondary)]">
        Drag to rotate. 3D pipeline verified.
      </p>
    </main>
  );
}
