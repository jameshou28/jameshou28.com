"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableParallax?: boolean;
}

export default function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
  enableParallax = false,
}: ModelViewerProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null);
  
  // Store initial rotation to rotate relative to it
  const initialRotation = useRef(new THREE.Euler(...rotation));

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    if (autoRotate) {
      groupRef.current.rotation.y += delta * 0.2;
    }

    if (enableParallax) {
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
      <primitive object={scene} />
    </group>
  );
}

