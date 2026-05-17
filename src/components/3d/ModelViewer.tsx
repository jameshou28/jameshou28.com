"use client";

import { useGLTF, Center } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableParallax?: boolean;
  animateIn?: boolean;
}

export default function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  enableParallax = false,
  animateIn = false,
}: ModelViewerProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  const { isMobile, isLowPower } = useDeviceCapability();
  
  // Store initial rotation to rotate relative to it
  const initialRotation = useRef(new THREE.Euler(...rotation));

  useGSAP(() => {
    if (animateIn && groupRef.current) {
      // Set initial scale to 0
      groupRef.current.scale.set(0, 0, 0);
      
      // Animate to target scale
      gsap.to(groupRef.current.scale, {
        x: scale,
        y: scale,
        z: scale,
        duration: 2.5,
        ease: "expo.out",
        delay: 0.2
      });
    }
  }, [animateIn, scale]);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.2;
    }

    // Disable parallax on mobile/low power to save performance and avoid touch jank
    if (enableParallax && !isMobile && !isLowPower) {
      // Calculate target rotation based on mouse position (-1 to 1)
      const targetX = initialRotation.current.x + (state.pointer.y * 0.2);
      const targetY = initialRotation.current.y + (state.pointer.x * 0.3);
      
      // Smoothly interpolate towards target
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetY, 0.1);
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <Center>
        <primitive object={scene} />
      </Center>
    </group>
  );
}

