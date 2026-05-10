"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";
import { MeshDistortMaterial } from "@react-three/drei";

interface PlaceholderProps {
  type?: "abstract" | "accessibility";
  color?: string;
}

export default function PlaceholderGeometry({
  type = "abstract",
  color = "#00b87a", // deep mint accent
}: PlaceholderProps) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 4]} />
      <MeshDistortMaterial
        color={color}
        envMapIntensity={1}
        clearcoat={0.8}
        clearcoatRoughness={0}
        metalness={0.1}
        roughness={0.4}
        distort={type === "abstract" ? 0.4 : 0.2}
        speed={type === "abstract" ? 2 : 1}
      />
    </mesh>
  );
}
