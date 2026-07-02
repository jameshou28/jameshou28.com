"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface VantaEffect {
  destroy: () => void;
}

export default function VantaNetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { isMobile, isLowPower, hasWebGL } = useDeviceCapability();

  useEffect(() => {
    if (!hasWebGL || !containerRef.current) return;

    let cancelled = false;
    let effect: VantaEffect | null = null;

    import("vanta/dist/vanta.net.min").then(({ default: NET }) => {
      if (cancelled || !containerRef.current) return;
      effect = NET({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        color: 0x00b87a,
        backgroundColor: 0xf5f3f0,
        points: isMobile || isLowPower ? 5 : 8,
        maxDistance: 20,
        spacing: 18,
      });
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [hasWebGL, isMobile, isLowPower]);

  if (!hasWebGL) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none opacity-40"
      aria-hidden="true"
    />
  );
}
