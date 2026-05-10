"use client";

import { useGLTF } from "@react-three/drei";
import { useRef } from "react";
import { Group } from "three";
import { useFrame } from "@react-three/fiber";

interface ModelViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

export default function ModelViewer({
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = false,
}: ModelViewerProps) {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<Group>(null);

  useFrame((state, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
