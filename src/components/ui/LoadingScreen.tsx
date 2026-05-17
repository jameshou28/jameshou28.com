"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { PORTFOLIO_ASSETS } from "@/data/portfolioAssets";

const MIN_LOADING_MS = 2000;

const isVideoAsset = (asset: string) => asset.endsWith(".mp4") || asset.endsWith(".webm");
const isModelAsset = (asset: string) => asset.endsWith(".glb") || asset.endsWith(".gltf");

const loadImageAsset = (asset: string) =>
  new Promise<void>((resolve) => {
    const image = new Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = asset;
  });

const loadVideoAsset = (asset: string) =>
  new Promise<void>((resolve) => {
    const video = document.createElement("video");
    const finish = () => resolve();
    video.preload = "auto";
    video.onloadeddata = finish;
    video.onerror = finish;
    video.src = asset;
  });

const loadModelAsset = async (asset: string) => {
  try {
    const response = await fetch(asset);
    await response.arrayBuffer();
  } catch {
    // ignore preload failures
  }
};

const loadAsset = (asset: string) => {
  if (isModelAsset(asset)) return loadModelAsset(asset);
  if (isVideoAsset(asset)) return loadVideoAsset(asset);
  return loadImageAsset(asset);
};

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const totalAssets = useMemo(() => PORTFOLIO_ASSETS.length, []);
  const initialOverflowRef = useRef<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS));
    const fontReady = typeof document !== "undefined" && "fonts" in document
      ? document.fonts.ready.catch(() => undefined)
      : Promise.resolve();

    const assetPromises = PORTFOLIO_ASSETS.map((asset) =>
      loadAsset(asset).finally(() => {
        if (isMounted) {
          setLoadedCount((count) => count + 1);
        }
      })
    );

    Promise.all([minimumDelay, fontReady, ...assetPromises]).then(() => {
      if (!isMounted) return;
      setIsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (initialOverflowRef.current === null) {
      initialOverflowRef.current = document.body.style.overflow;
    }

    if (!hasEntered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = initialOverflowRef.current ?? "";
    }

    return () => {
      if (initialOverflowRef.current !== null) {
        document.body.style.overflow = initialOverflowRef.current;
      }
    };
  }, [hasEntered]);

  const progress = totalAssets === 0 ? 1 : Math.min(loadedCount / totalAssets, 1);
  const progressPercent = Math.round(progress * 100);

  const handleEnter = () => {
    if (!isReady || isEntering) return;
    setIsEntering(true);

    const finish = () => {
      setHasEntered(true);
      setIsEntering(false);
      document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" });
    };

    const overlay = overlayRef.current;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!overlay || reduceMotion) {
      finish();
      return;
    }

    gsap.timeline({ onComplete: finish })
      .to(overlay, {
        clipPath: "circle(0% at 50% 50%)",
        duration: 1.1,
        ease: "power4.inOut",
      })
      .to(overlay, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
      }, "-=0.5");
  };

  return (
    <div className="relative">
      {children}
      {!hasEntered && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]"
          style={{ clipPath: "circle(120% at 50% 50%)" }}
          role="dialog"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--accent-glow),_transparent_60%)]" />
          <div className="relative z-10 w-full max-w-xl px-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)]">
              Initializing
            </p>
            <h1 className="mt-4 text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
              Loading Portfolio
            </h1>
            <p className="mt-3 text-sm text-[var(--text-secondary)]">
              Warming up 3D scenes and visuals
            </p>

            <div className="mt-10 h-2 w-full rounded-full bg-[var(--border)] overflow-hidden">
              <div
                className="h-full bg-[var(--accent)] transition-[width] duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span>{progressPercent}%</span>
              <span>{isReady ? "Ready" : "Loading assets"}</span>
            </div>

            {isReady ? (
              <button
                type="button"
                onClick={handleEnter}
                className="mt-10 inline-flex items-center justify-center rounded-full border border-[var(--text-primary)] px-8 py-3 text-sm font-medium tracking-wide text-[var(--bg-primary)] bg-[var(--text-primary)] hover:bg-transparent hover:text-[var(--text-primary)] transition-all"
              >
                Enter Portfolio
              </button>
            ) : (
              <p className="mt-10 text-sm text-[var(--text-secondary)]">
                Preparing your experience...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
