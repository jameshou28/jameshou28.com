"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { PORTFOLIO_ASSETS } from "@/data/portfolioAssets";

const PORTFOLIO_ENTERED_KEY = "portfolio-has-entered";

const hasEnteredBefore = () => {
  try {
    return localStorage.getItem(PORTFOLIO_ENTERED_KEY) === "true";
  } catch {
    return false;
  }
};

const markPortfolioEntered = () => {
  try {
    localStorage.setItem(PORTFOLIO_ENTERED_KEY, "true");
  } catch {
    // ignore (e.g. private browsing)
  }
};

const MIN_LOADING_MS = 600;
const ENTER_ANIMATION = {
  clipDuration: 1.5,
  fadeDuration: 0.6,
  overlap: 0.2,
  clipEase: "power4.inOut",
  fadeEase: "power2.out",
};

const isVideoAsset = (asset: string) => asset.endsWith(".mp4") || asset.endsWith(".webm");
const isModelAsset = (asset: string) => asset.endsWith(".glb") || asset.endsWith(".gltf");

const loadImageAsset = (asset: string) =>
  new Promise<void>((resolve) => {
    const image = new window.Image();
    image.onload = () => resolve();
    image.onerror = () => resolve();
    image.src = asset;
  });

const loadVideoAsset = (asset: string) =>
  new Promise<void>((resolve) => {
    const video = document.createElement("video");
    
    // Safety timeout: resolve if loading takes longer than 2.5 seconds
    const timeoutId = setTimeout(() => {
      cleanup();
      resolve();
    }, 2500);

    const cleanup = () => {
      clearTimeout(timeoutId);
      video.onloadeddata = null;
      video.onerror = null;
      video.onsuspend = null;
      video.onstalled = null;
    };

    const finish = () => {
      cleanup();
      resolve();
    };

    video.preload = "auto";
    video.onloadeddata = finish;
    video.onerror = finish;
    video.onsuspend = finish;
    video.onstalled = finish;
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

const loadFonts = () => {
  if (typeof document === "undefined" || !("fonts" in document)) {
    return Promise.resolve();
  }

  // Safety timeout of 2 seconds for font loading
  return Promise.race([
    document.fonts.ready,
    new Promise((resolve) => setTimeout(resolve, 2000))
  ]).catch(() => undefined);
};

const loadAsset = (asset: string) => {
  if (isModelAsset(asset)) return loadModelAsset(asset);
  if (isVideoAsset(asset)) return loadVideoAsset(asset);
  return loadImageAsset(asset);
};

export default function LoadingScreen({ children }: { children: React.ReactNode }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const statusTextRef = useRef<HTMLParagraphElement>(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [persistenceChecked, setPersistenceChecked] = useState(false);
  const [isEntering, setIsEntering] = useState(false);
  const [staggeredProgress, setStaggeredProgress] = useState(0);
  const [currentStatus, setCurrentStatus] = useState<"warming" | "loading" | "ready">("warming");
  const [hasSwitched, setHasSwitched] = useState(false);
  const totalAssets = useMemo(() => PORTFOLIO_ASSETS.length, []);
  const initialOverflowRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    if (hasEnteredBefore()) {
      setHasEntered(true);
    }
    setPersistenceChecked(true);
  }, []);

  useEffect(() => {
    if (!persistenceChecked || hasEntered) return;

    let isMounted = true;
    const minimumDelay = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_MS));
    const fontReady = loadFonts();

    const assetPromises = PORTFOLIO_ASSETS.map((asset) =>
      loadAsset(asset).finally(() => {
        if (isMounted) {
          setLoadedCount((count) => count + 1);
        }
      })
    );

    const preloadPromise = Promise.all([minimumDelay, fontReady, ...assetPromises]);
    const failsafePromise = new Promise((resolve) => setTimeout(resolve, 6000));

    Promise.race([preloadPromise, failsafePromise]).then(() => {
      if (!isMounted) return;
      setIsReady(true);
    });

    return () => {
      isMounted = false;
    };
  }, [persistenceChecked, hasEntered]);

  useEffect(() => {
    const progress = totalAssets === 0 ? 1 : Math.min(loadedCount / totalAssets, 1);
    const progressPercent = Math.round(progress * 100);
    
    if (isReady) {
      setStaggeredProgress(100);
      return;
    }

    const interval = setInterval(() => {
      setStaggeredProgress((current) => {
        const randomIncrement = Math.random() * 15 + 5;
        const newProgress = Math.min(current + randomIncrement, progressPercent);
        return newProgress;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [loadedCount, totalAssets, isReady]);

  useEffect(() => {
    if (hasSwitched || staggeredProgress < 50) return;

    const textEl = statusTextRef.current;
    if (!textEl) return;

    setHasSwitched(true);

    gsap.to(textEl, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setCurrentStatus("loading");
        gsap.to(textEl, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in",
        });
      },
    });
  }, [staggeredProgress, hasSwitched]);

  useEffect(() => {
    if (currentStatus === "ready" || staggeredProgress < 100) return;

    const textEl = statusTextRef.current;
    if (!textEl) return;

    gsap.to(textEl, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
      onComplete: () => {
        setCurrentStatus("ready");
        gsap.to(textEl, {
          opacity: 1,
          duration: 0.3,
          ease: "power2.in",
        });
      },
    });
  }, [staggeredProgress, currentStatus]);

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

  const handleEnter = () => {
    if (!isReady || isEntering) return;
    setIsEntering(true);

    const reduceMotion = typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;
    const scrollBehavior = reduceMotion ? "auto" : "smooth";

    const finish = () => {
      markPortfolioEntered();
      setHasEntered(true);
      setIsEntering(false);
      document.getElementById("hero")?.scrollIntoView({ behavior: scrollBehavior });
    };

    const overlay = overlayRef.current;
    if (!overlay || reduceMotion) {
      finish();
      return;
    }

    gsap.timeline({ onComplete: finish })
      .to(overlay, {
        clipPath: "circle(0% at 50% 50%)",
        duration: ENTER_ANIMATION.clipDuration,
        ease: ENTER_ANIMATION.clipEase,
      })
      .to(overlay, {
        opacity: 0,
        duration: ENTER_ANIMATION.fadeDuration,
        ease: ENTER_ANIMATION.fadeEase,
      }, `-=${ENTER_ANIMATION.overlap}`);
  };

  const showOverlay = persistenceChecked && !hasEntered;
  const hideChildren = !persistenceChecked || showOverlay;

  return (
    <div className="relative">
      <div className={hideChildren ? "invisible" : undefined} aria-hidden={hideChildren || undefined}>
        {children}
      </div>
      {!persistenceChecked && (
        <div className="fixed inset-0 z-[1000] bg-[var(--bg-primary)]" aria-hidden />
      )}
      {showOverlay && (
        <div
          ref={overlayRef}
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)]"
          style={{ clipPath: "circle(120% at 50% 50%)" }}
          role="dialog"
          aria-live="polite"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--accent-glow),_transparent_60%)]" />
          <div className="relative z-10 w-full max-w-xl px-6 text-center">
            <p className="text-xs uppercase tracking-[0.35em] text-[var(--text-secondary)] font-[family-name:var(--font-body)]">
              Initializing Portfolio
            </p>
            
            <div className="mt-8 mb-6 flex justify-center">
              <div className="relative w-24 h-24 overflow-hidden rounded-2xl shadow-[0_0_30px_var(--accent-glow)] border border-[var(--border)]">
                <Image 
                  src="/images/favicon.jpg" 
                  alt="James Hou Logo" 
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            <p 
              ref={statusTextRef}
              className="mt-3 text-sm text-[var(--text-secondary)] font-[family-name:var(--font-body)]"
            >
              {currentStatus === "warming" ? "Warming up 3D scenes" : currentStatus === "loading" ? "Loading assets" : ""}
            </p>

            <div className="mt-10 h-3 w-full rounded-full bg-[var(--bg-subtle)] border border-[var(--border)] overflow-hidden shadow-inner p-0.5">
              <div
                className="h-full rounded-full bg-[var(--accent)] transition-[width] duration-300 relative overflow-hidden"
                style={{ width: `${staggeredProgress}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full -translate-x-full animate-[shimmer_2s_infinite]"></div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between text-xs text-[var(--text-secondary)] font-[family-name:var(--font-body)] uppercase tracking-wider font-semibold">
              <span>{Math.round(staggeredProgress)}%</span>
              {/* <span>{isReady ? "" : "Loading assets"}</span> */}
            </div>

            {isReady ? (
              <button
                type="button"
                onClick={handleEnter}
                className="mt-10 inline-flex items-center justify-center rounded-full border border-[var(--text-primary)] px-8 py-3 text-sm font-medium tracking-wide text-[var(--bg-primary)] bg-[var(--text-primary)] hover:bg-transparent hover:text-[var(--text-primary)] transition-all font-[family-name:var(--font-body)] uppercase cursor-pointer"
              >
                Enter Portfolio
              </button>
            ) : (
              <p className="mt-10 text-sm text-[var(--text-secondary)] font-[family-name:var(--font-body)]">
                Preparing your experience...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
