"use client";

import { useEffect, useRef } from "react";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

// Low-poly shaded plane in the spirit of Wagerfield's Flat Surface Shader,
// redrawn in Canvas 2D. The mesh itself is static; only the light source
// follows the cursor, so the background stays calm until the user moves.

const LIT_COLOR = { r: 0xf9, g: 0xf7, b: 0xf3 };
const SHADOW_COLOR = { r: 0xaf, g: 0xaa, b: 0xa1 };
const AMBIENT = 0.55;
const DIFFUSE = 0.45;
const LIGHT_HEIGHT = 260;
const EASE = 0.08;
const DEPTH_JITTER = 22;

interface Triangle {
  ax: number;
  ay: number;
  bx: number;
  by: number;
  cx: number;
  cy: number;
  midX: number;
  midY: number;
  nx: number;
  ny: number;
  nz: number;
}

function buildMesh(width: number, height: number, cell: number): Triangle[] {
  const cols = Math.ceil(width / cell) + 2;
  const rows = Math.ceil(height / cell) + 2;
  const jitter = cell * 0.35;
  const rand = (range: number) => (Math.random() * 2 - 1) * range;

  const grid: { x: number; y: number; z: number }[][] = [];
  for (let i = 0; i <= cols; i++) {
    grid[i] = [];
    for (let j = 0; j <= rows; j++) {
      grid[i][j] = {
        x: (i - 1) * cell + rand(jitter),
        y: (j - 1) * cell + rand(jitter),
        z: rand(DEPTH_JITTER),
      };
    }
  }

  const triangles: Triangle[] = [];
  const push = (
    a: { x: number; y: number; z: number },
    b: { x: number; y: number; z: number },
    c: { x: number; y: number; z: number }
  ) => {
    let nx = (b.y - a.y) * (c.z - a.z) - (b.z - a.z) * (c.y - a.y);
    let ny = (b.z - a.z) * (c.x - a.x) - (b.x - a.x) * (c.z - a.z);
    let nz = (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x);
    const len = Math.hypot(nx, ny, nz) || 1;
    nx /= len;
    ny /= len;
    nz /= len;
    if (nz < 0) {
      nx = -nx;
      ny = -ny;
      nz = -nz;
    }
    triangles.push({
      ax: a.x,
      ay: a.y,
      bx: b.x,
      by: b.y,
      cx: c.x,
      cy: c.y,
      midX: (a.x + b.x + c.x) / 3,
      midY: (a.y + b.y + c.y) / 3,
      nx,
      ny,
      nz,
    });
  };

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const tl = grid[i][j];
      const tr = grid[i + 1][j];
      const bl = grid[i][j + 1];
      const br = grid[i + 1][j + 1];
      push(tl, tr, bl);
      push(tr, br, bl);
    }
  }
  return triangles;
}

export default function FlatSurfaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { isMobile, isLowPower } = useDeviceCapability();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cell = isMobile || isLowPower ? 150 : 110;
    let triangles: Triangle[] = [];
    let width = 0;
    let height = 0;
    let lightX = 0;
    let lightY = 0;
    let targetX = 0;
    let targetY = 0;
    let rafId = 0;
    let settled = false;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      for (const t of triangles) {
        const dx = lightX - t.midX;
        const dy = lightY - t.midY;
        const dist = Math.hypot(dx, dy, LIGHT_HEIGHT);
        const dot =
          (dx / dist) * t.nx + (dy / dist) * t.ny + (LIGHT_HEIGHT / dist) * t.nz;
        const brightness = Math.min(
          1,
          Math.max(0, AMBIENT + DIFFUSE * Math.max(0, dot))
        );
        const r = Math.round(
          SHADOW_COLOR.r + (LIT_COLOR.r - SHADOW_COLOR.r) * brightness
        );
        const g = Math.round(
          SHADOW_COLOR.g + (LIT_COLOR.g - SHADOW_COLOR.g) * brightness
        );
        const b = Math.round(
          SHADOW_COLOR.b + (LIT_COLOR.b - SHADOW_COLOR.b) * brightness
        );
        const color = `rgb(${r},${g},${b})`;
        ctx.beginPath();
        ctx.moveTo(t.ax, t.ay);
        ctx.lineTo(t.bx, t.by);
        ctx.lineTo(t.cx, t.cy);
        ctx.closePath();
        ctx.fillStyle = color;
        // Stroke in the fill color to seal antialiasing seams between triangles.
        ctx.strokeStyle = color;
        ctx.lineWidth = 1;
        ctx.fill();
        ctx.stroke();
      }
    };

    const tick = () => {
      const dx = targetX - lightX;
      const dy = targetY - lightY;
      if (Math.abs(dx) < 0.2 && Math.abs(dy) < 0.2) {
        if (!settled) {
          lightX = targetX;
          lightY = targetY;
          render();
          settled = true;
        }
      } else {
        lightX += dx * EASE;
        lightY += dy * EASE;
        render();
        settled = false;
      }
      rafId = requestAnimationFrame(tick);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      triangles = buildMesh(width, height, cell);
      settled = false;
    };

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
    };

    resize();
    lightX = targetX = width / 2;
    lightY = targetY = height / 2;
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, [isMobile, isLowPower]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
