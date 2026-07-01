"use client";

import { useState, useEffect } from "react";

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(canvas.getContext("webgl2") || canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

export function useDeviceCapability() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      // Check if viewport is mobile width
      setIsMobile(window.innerWidth < 768);

      // Rough heuristic for low power (e.g. less than 4 logical cores)
      if (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4) {
        setIsLowPower(true);
      }
    };

    // Initial check
    checkDevice();
    setHasWebGL(detectWebGL());

    // Listen for resize
    window.addEventListener("resize", checkDevice);
    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  return { isMobile, isLowPower, hasWebGL };
}
