"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import { Suspense } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface SceneProps {
  children: React.ReactNode;
  className?: string;
  enableControls?: boolean;
}

export default function Scene({
  children,
  className = "",
  enableControls = true,
}: SceneProps) {
  const { isMobile, isLowPower } = useDeviceCapability();

  return (
    <div className={`w-full h-full relative ${className}`}>
      <Canvas
        dpr={isMobile || isLowPower ? [1, 1] : [1, 2]} // Lower DPR on mobile to save performance
        gl={{ antialias: !isLowPower, alpha: true }} // Disable antialiasing on low power
        camera={{ position: [0, 0, 5], fov: 45 }}
      >
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          
          {children}

          {enableControls && (
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
            />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
