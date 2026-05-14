"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

gsap.registerPlugin(ScrollTrigger);

/* ── Shape component rendered inside each mini-Canvas ── */
function FloatingShape({ 
  geometry, 
  color,
  wireframe = false,
}: { 
  geometry: "torus" | "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron";
  color: string;
  wireframe?: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.15;
    meshRef.current.rotation.y += delta * 0.2;
  });

  const geometryElement = {
    torus: <torusGeometry args={[1, 0.4, 16, 32]} />,
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torusKnot: <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
  }[geometry];

  return (
    <mesh ref={meshRef}>
      {geometryElement}
      <meshStandardMaterial 
        color={color} 
        wireframe={wireframe}
        roughness={0.3}
        metalness={0.1}
        transparent
        opacity={0.85}
      />
    </mesh>
  );
}

/* ── Shape configuration ── */
const SHAPES = [
  { 
    id: "shape-1",
    geometry: "torus" as const,
    color: "#00b87a",
    wireframe: true,
    position: { top: "8%", left: "5%" },
    size: "clamp(100px, 12vw, 180px)",
    parallaxY: -80,
  },
  { 
    id: "shape-2",
    geometry: "icosahedron" as const,
    color: "#1a1a1a",
    wireframe: true,
    position: { top: "15%", right: "8%" },
    size: "clamp(80px, 10vw, 150px)",
    parallaxY: -120,
  },
  { 
    id: "shape-3",
    geometry: "octahedron" as const,
    color: "#00b87a",
    wireframe: false,
    position: { top: "55%", left: "3%" },
    size: "clamp(60px, 8vw, 120px)",
    parallaxY: -60,
  },
  { 
    id: "shape-4",
    geometry: "torusKnot" as const,
    color: "#6b6b6b",
    wireframe: true,
    position: { top: "65%", right: "4%" },
    size: "clamp(90px, 11vw, 160px)",
    parallaxY: -100,
  },
  { 
    id: "shape-5",
    geometry: "dodecahedron" as const,
    color: "#e0ddd8",
    wireframe: false,
    position: { bottom: "10%", left: "12%" },
    size: "clamp(50px, 7vw, 100px)",
    parallaxY: -40,
  },
];

/* ── Main component ── */
export default function FloatingShapes() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fixedLayerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceCapability();

  useGSAP(() => {
    if (isMobile) return;

    const fixedLayer = fixedLayerRef.current;
    if (!fixedLayer) return;

    SHAPES.forEach((shape) => {
      const el = document.getElementById(shape.id);
      if (!el) return;

      // Entrance: fade in only (no scale to avoid conflict with parallax transforms)
      gsap.fromTo(el,
        { opacity: 0 },
        { 
          opacity: 1, 
          duration: 1.5, 
          ease: "power3.out",
          delay: Math.random() * 0.6,
        }
      );

      // Parallax drift on scroll
      gsap.to(el, {
        y: shape.parallaxY,
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    });

    // Fade out the entire fixed layer when scrolling past the wrapper
    gsap.to(fixedLayer, {
      opacity: 0,
      ease: "none",
      scrollTrigger: {
        trigger: wrapperRef.current,
        start: "bottom center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, { dependencies: [isMobile] });

  if (isMobile) return null;

  return (
    <>
      {/* Invisible marker div that lives in the document flow — 
          ScrollTrigger uses this as the trigger region */}
      <div 
        ref={wrapperRef}
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      />

      {/* Fixed layer that stays on screen while scrolling */}
      <div
        ref={fixedLayerRef}
        className="fixed inset-0 z-[1] pointer-events-none overflow-hidden"
        aria-hidden="true"
      >
        {SHAPES.map((shape) => (
          <div
            key={shape.id}
            id={shape.id}
            className="absolute opacity-0"
            style={{
              ...shape.position,
              width: shape.size,
              height: shape.size,
            }}
          >
            <Canvas
              dpr={[1, 1.5]}
              gl={{ antialias: false, alpha: true }}
              camera={{ position: [0, 0, 3], fov: 50 }}
            >
              <ambientLight intensity={0.8} />
              <directionalLight position={[5, 5, 5]} intensity={0.6} />
              <FloatingShape 
                geometry={shape.geometry}
                color={shape.color}
                wireframe={shape.wireframe}
              />
            </Canvas>
          </div>
        ))}
      </div>
    </>
  );
}

