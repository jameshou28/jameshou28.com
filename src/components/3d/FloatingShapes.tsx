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
  rotationSpeed = { x: 0.15, y: 0.2 },
}: {
  geometry: "torus" | "icosahedron" | "octahedron" | "torusKnot" | "dodecahedron" | "tetrahedron" | "sphere" | "cone";
  color: string;
  wireframe?: boolean;
  rotationSpeed?: { x: number; y: number };
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed.x;
    meshRef.current.rotation.y += delta * rotationSpeed.y;
  });

  const geometryElement = {
    torus: <torusGeometry args={[1, 0.4, 16, 32]} />,
    icosahedron: <icosahedronGeometry args={[1, 0]} />,
    octahedron: <octahedronGeometry args={[1, 0]} />,
    torusKnot: <torusKnotGeometry args={[0.8, 0.3, 64, 16]} />,
    dodecahedron: <dodecahedronGeometry args={[1, 0]} />,
    // New geometries
    tetrahedron: <tetrahedronGeometry args={[1, 0]} />,           // 4-faced pyramid, sharp and minimal
    sphere: <sphereGeometry args={[1, 12, 8]} />,                 // low-poly globe look when wireframed
    cone: <coneGeometry args={[0.8, 1.8, 6, 1]} />,              // 6-sided cone, angular and clean
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
  // Top left: green wireframe torus (kept from original, strong brand color)
  {
    id: "shape-1",
    geometry: "torus" as const,
    color: "#00b87a",
    wireframe: true,
    position: { top: "8%", left: "5%" },
    size: "clamp(100px, 12vw, 180px)",
    parallaxY: -80,
    exit: { x: "-150vw", y: "-150vh" },
    rotationSpeed: { x: 0.1, y: 0.18 },
  },
  // Top right: dark wireframe sphere — looks like a globe/network node
  {
    id: "shape-2",
    geometry: "sphere" as const,
    color: "#1a1a1a",
    wireframe: true,
    position: { top: "12%", right: "7%" },
    size: "clamp(80px, 10vw, 150px)",
    parallaxY: -120,
    exit: { x: "150vw", y: "-150vh" },
    rotationSpeed: { x: 0.05, y: 0.12 },  // slow rotation so the grid lines read well
  },
  // Middle left: green solid tetrahedron — sharp contrast to the rounder shapes
  {
    id: "shape-3",
    geometry: "tetrahedron" as const,
    color: "#00b87a",
    wireframe: false,
    position: { top: "50%", left: "3%" },
    size: "clamp(60px, 8vw, 110px)",
    parallaxY: -60,
    exit: { x: "-150vw" },
    rotationSpeed: { x: 0.2, y: 0.15 },
  },
  // Middle right: gray wireframe torusKnot (kept, most complex shape on screen)
  {
    id: "shape-4",
    geometry: "torusKnot" as const,
    color: "#6b6b6b",
    wireframe: true,
    position: { top: "60%", right: "4%" },
    size: "clamp(90px, 11vw, 160px)",
    parallaxY: -100,
    exit: { x: "150vw" },
    rotationSpeed: { x: 0.12, y: 0.22 },

  },
  // Bottom left: cream wireframe cone — angular, less common, adds variety
  {
    id: "shape-5",
    geometry: "cone" as const,
    color: "#c8c4bc",
    wireframe: true,
    position: { bottom: "12%", left: "10%" },
    size: "clamp(50px, 7vw, 100px)",
    parallaxY: -40,
    exit: { y: "150vh" },
    rotationSpeed: { x: 0.18, y: 0.08 },
  },
  // Bottom right: dark solid icosahedron — grounding element, tucked in corner
  {
    id: "shape-6",
    geometry: "icosahedron" as const,
    color: "#2a2a2a",
    wireframe: false,
    position: { bottom: "18%", right: "9%" },
    size: "clamp(45px, 6vw, 90px)",
    parallaxY: -50,
    exit: { x: "150vw", y: "150vh" },
    rotationSpeed: { x: 0.08, y: 0.14 },
  },
];

/* ── Main component ── */
export default function FloatingShapes() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const fixedLayerRef = useRef<HTMLDivElement>(null);
  const { isMobile } = useDeviceCapability();

  useGSAP(() => {
    if (isMobile) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    SHAPES.forEach((shape) => {
      const el = document.getElementById(shape.id);
      if (!el) return;

      // 1. Entrance animation (fade in on mount)
      gsap.fromTo(el,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1.5,
          ease: "power3.out",
          delay: Math.random() * 0.6,
        }
      );

      // 2. Unified ScrollTrigger timeline for scroll-driven motion (Parallax -> Exit/Fade)
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Segment 1 (0.0 to 0.2): Gentle parallax before exit starts
      tl.to(el, {
        y: shape.parallaxY * 0.2,
        ease: "none",
        duration: 0.2,
      }, 0);

      // Segment 2 (0.2 to 1.0): Smooth exit and fade-out
      const exitProps: gsap.TweenVars = {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.8,
      };

      if (shape.exit?.x) {
        exitProps.x = shape.exit.x;
      }
      if (shape.exit?.y) {
        exitProps.y = shape.exit.y;
      } else {
        // If there's no exit y target, continue the parallax to its full value
        exitProps.y = shape.parallaxY;
      }

      tl.to(el, exitProps, 0.2);
    });

  }, { dependencies: [isMobile] });

  if (isMobile) return null;

  return (
    <>
      <div
        ref={wrapperRef}
        className="absolute inset-x-0 top-0 h-screen z-0 pointer-events-none"
        aria-hidden="true"
      />

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
                rotationSpeed={shape.rotationSpeed}
              />
            </Canvas>
          </div>
        ))}
      </div>
    </>
  );
}