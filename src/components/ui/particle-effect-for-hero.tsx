"use client";

import { useCallback, useEffect, useRef } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

interface Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

interface BackgroundParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
}

interface MouseState {
  x: number;
  y: number;
  isActive: boolean;
}

const MOUSE_RADIUS = 160;
const RETURN_SPEED = 0.04;
const DAMPING = 0.82;
const REPULSION_STRENGTH = 0.55;
const MOUSE_FORCE_MULTIPLIER = 2.5;
const COLLISION_RESTITUTION = 0.45;
const BG_DRIFT_SPEED = 0.08;
const ACCENT_COLOR = "#00b87a";
const TEXT_COLOR = "#1a1a1a";

const randomRange = (min: number, max: number) =>
  Math.random() * (max - min) + min;

interface ParticleEffectForHeroProps {
  className?: string;
  /** Full-viewport fixed layer for site-wide background */
  fixed?: boolean;
}

export default function ParticleEffectForHero({
  className = "",
  fixed = false,
}: ParticleEffectForHeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const backgroundParticlesRef = useRef<BackgroundParticle[]>([]);
  const mouseRef = useRef<MouseState>({ x: -1000, y: -1000, isActive: false });
  const frameIdRef = useRef(0);
  const sizeRef = useRef({ width: 0, height: 0 });
  const fixedRef = useRef(fixed);
  const { isMobile, isLowPower } = useDeviceCapability();

  const particleDensity = isMobile ? 0.00003 : isLowPower ? 0.00005 : 0.000045;
  const bgParticleDensity = isMobile ? 0.00001 : 0.000025;

  const densityRef = useRef({ particleDensity, bgParticleDensity });
  fixedRef.current = fixed;
  densityRef.current = { particleDensity, bgParticleDensity };

  const initParticles = useCallback((width: number, height: number) => {
      const { particleDensity: density, bgParticleDensity: bgDensity } =
        densityRef.current;
      const particleCount = Math.floor(width * height * density);
      const newParticles: Particle[] = [];

      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;

        newParticles.push({
          x,
          y,
          originX: x,
          originY: y,
          vx: 0,
          vy: 0,
          size: randomRange(1, 2.5),
          color: Math.random() > 0.9 ? ACCENT_COLOR : TEXT_COLOR,
        });
      }
      particlesRef.current = newParticles;

      const bgCount = Math.floor(width * height * bgDensity);
      const newBgParticles: BackgroundParticle[] = [];

      for (let i = 0; i < bgCount; i++) {
        newBgParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * BG_DRIFT_SPEED,
          vy: (Math.random() - 0.5) * BG_DRIFT_SPEED,
          size: randomRange(0.5, 1.5),
          alpha: randomRange(0.08, 0.25),
          phase: Math.random() * Math.PI * 2,
        });
      }
      backgroundParticlesRef.current = newBgParticles;
  }, []);

  const animate = useCallback((time: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { width, height } = sizeRef.current;
    if (width === 0 || height === 0) return;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;
    const pulseOpacity = Math.sin(time * 0.0008) * 0.025 + 0.06;

    const gradient = ctx.createRadialGradient(
      centerX,
      centerY,
      0,
      centerX,
      centerY,
      Math.max(width, height) * 0.7
    );
    gradient.addColorStop(0, `rgba(0, 184, 122, ${pulseOpacity})`);
    gradient.addColorStop(1, "rgba(245, 243, 240, 0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    const bgParticles = backgroundParticlesRef.current;

    for (let i = 0; i < bgParticles.length; i++) {
      const p = bgParticles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      const twinkle = Math.sin(time * 0.002 + p.phase) * 0.5 + 0.5;
      const currentAlpha = p.alpha * (0.3 + 0.7 * twinkle);

      ctx.globalAlpha = currentAlpha;
      ctx.fillStyle = TEXT_COLOR;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const particles = particlesRef.current;
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      const dx = mouse.x - p.x;
      const dy = mouse.y - p.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (mouse.isActive && distance < MOUSE_RADIUS) {
        const forceDirectionX = dx / distance;
        const forceDirectionY = dy / distance;
        const force = (MOUSE_RADIUS - distance) / MOUSE_RADIUS;
        const repulsion = force * REPULSION_STRENGTH;
        p.vx -= forceDirectionX * repulsion * MOUSE_FORCE_MULTIPLIER;
        p.vy -= forceDirectionY * repulsion * MOUSE_FORCE_MULTIPLIER;
      }

      const springDx = p.originX - p.x;
      const springDy = p.originY - p.y;
      p.vx += springDx * RETURN_SPEED;
      p.vy += springDy * RETURN_SPEED;
    }

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const p1 = particles[i];
        const p2 = particles[j];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const distSq = dx * dx + dy * dy;
        const minDist = p1.size + p2.size;

        if (distSq < minDist * minDist) {
          const dist = Math.sqrt(distSq);

          if (dist > 0.01) {
            const nx = dx / dist;
            const ny = dy / dist;
            const overlap = minDist - dist;
            const pushX = nx * overlap * 0.5;
            const pushY = ny * overlap * 0.5;

            p1.x -= pushX;
            p1.y -= pushY;
            p2.x += pushX;
            p2.y += pushY;

            const dvx = p1.vx - p2.vx;
            const dvy = p1.vy - p2.vy;
            const velocityAlongNormal = dvx * nx + dvy * ny;

            if (velocityAlongNormal > 0) {
              const m1 = p1.size;
              const m2 = p2.size;
              const restitution = COLLISION_RESTITUTION;
              const impulseMagnitude =
                (-(1 + restitution) * velocityAlongNormal) / (1 / m1 + 1 / m2);
              const impulseX = impulseMagnitude * nx;
              const impulseY = impulseMagnitude * ny;

              p1.vx += impulseX / m1;
              p1.vy += impulseY / m1;
              p2.vx -= impulseX / m2;
              p2.vy -= impulseY / m2;
            }
          }
        }
      }
    }

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.vx *= DAMPING;
      p.vy *= DAMPING;
      p.x += p.vx;
      p.y += p.vy;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

      const velocity = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
      const opacity = Math.min(0.25 + velocity * 0.1, 0.85);

      if (p.color === TEXT_COLOR) {
        ctx.fillStyle = `rgba(26, 26, 26, ${opacity})`;
      } else {
        ctx.fillStyle = p.color;
      }

      ctx.fill();
    }

    frameIdRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      const isFixed = fixedRef.current;
      if (!isFixed && !containerRef.current) return;

      const width = isFixed
        ? window.innerWidth
        : containerRef.current!.getBoundingClientRect().width;
      const height = isFixed
        ? window.innerHeight
        : containerRef.current!.getBoundingClientRect().height;
      const dpr = window.devicePixelRatio || 1;
      const canvas = canvasRef.current;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
      }

      sizeRef.current = { width, height };
      initParticles(width, height);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [initParticles]);

  useEffect(() => {
    const { width, height } = sizeRef.current;
    if (width > 0 && height > 0) {
      initParticles(width, height);
    }
  }, [isMobile, isLowPower, initParticles]);

  useEffect(() => {
    frameIdRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameIdRef.current);
  }, [animate]);

  useEffect(() => {
    if (!fixedRef.current) return;

    const handleWindowMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
        isActive: true,
      };
    };

    const handleWindowMouseLeave = () => {
      mouseRef.current.isActive = false;
    };

    window.addEventListener("mousemove", handleWindowMouseMove);
    document.documentElement.addEventListener("mouseleave", handleWindowMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleWindowMouseMove);
      document.documentElement.removeEventListener("mouseleave", handleWindowMouseLeave);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (fixedRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      isActive: true,
    };
  };

  const handleMouseLeave = () => {
    if (fixedRef.current) return;
    mouseRef.current.isActive = false;
  };

  const positionClass = fixed
    ? "fixed inset-0 z-0 pointer-events-none"
    : "absolute inset-0 z-0";

  return (
    <div
      ref={containerRef}
      className={`${positionClass} overflow-hidden bg-transparent ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
