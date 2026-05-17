"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ROLE_TITLES = ["Full Stack Developer", "Robotics Engineer", "Applied AI"];
const HERO_VIDEO_SRC = "/images/midScoring.mp4";

/** Typewriter tagline — lower delays = faster typing */
const HERO_TYPEWRITER = {
  typingDelayMs: 45,
  deletingDelayMs: 30,
  pauseDelayMs: 1200,
} as const;

/** Hero text/video entrance animation */
const HERO_ENTRANCE = {
  duration: 0.9,
  stagger: 0.12,
  delay: 0.25,
} as const;

/** Desktop hero video scroll scrub — tweak these to change feel */
const HERO_VIDEO_SCROLL = {
  /**
   * Playback rate vs scroll (this is the main speed knob).
   * 1 = full clip over the whole scroll range
   * 3 = full clip after ~⅓ of the scroll range
   */
  speed: 2.5,
  /** GSAP scrub lag (seconds). Smoothing only — does NOT change playback speed */
  scrub: 0,
  /**
   * Scroll distance mapped to progress 0→1 (secondary speed knob).
   * Shorter = faster. "bottom top" = hero height; "+=100%" = slower.
   */
  end: "bottom top",
  /** Hero height on lg+. Taller = more scroll = slower. Use lg:h-screen for fastest. */
  sectionHeightClass: "lg:h-screen",
} as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentRole = ROLE_TITLES[roleIndex];
  const displayText = currentRole.slice(0, charIndex);

  useGSAP(() => {
    gsap.fromTo(
      ".hero-text",
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: HERO_ENTRANCE.duration,
        stagger: HERO_ENTRANCE.stagger,
        ease: "power3.out",
        delay: HERO_ENTRANCE.delay,
      }
    );

    gsap.fromTo(
      ".hero-video",
      { scale: 0.96, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: HERO_ENTRANCE.duration,
        ease: "power3.out",
        delay: HERO_ENTRANCE.delay + 0.15,
      }
    );

    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) return;

    const section = containerRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    video.muted = true;
    video.playsInline = true;
    video.pause();

    const setupScrollScrub = () => {
      ScrollTrigger.create({
        id: "hero-video-scrub",
        trigger: section,
        start: "top top",
        end: HERO_VIDEO_SCROLL.end,
        scrub: HERO_VIDEO_SCROLL.scrub,
        onUpdate: (self) => {
          const duration = video.duration;
          if (!Number.isFinite(duration) || duration <= 0) return;
          const progress = Math.min(1, self.progress * HERO_VIDEO_SCROLL.speed);
          video.currentTime = progress * duration;
        },
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
      setupScrollScrub();
    } else {
      video.addEventListener("loadedmetadata", setupScrollScrub, { once: true });
    }
  }, { scope: containerRef });

  useEffect(() => {
    const atEnd = !isDeleting && charIndex === currentRole.length;
    const atStart = isDeleting && charIndex === 0;
    const timeoutDuration = atEnd || atStart
      ? HERO_TYPEWRITER.pauseDelayMs
      : isDeleting
        ? HERO_TYPEWRITER.deletingDelayMs
        : HERO_TYPEWRITER.typingDelayMs;

    const timeout = window.setTimeout(() => {
      if (atEnd) {
        setIsDeleting(true);
        return;
      }

      if (atStart) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % ROLE_TITLES.length);
        return;
      }

      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, timeoutDuration);

    return () => window.clearTimeout(timeout);
  }, [charIndex, currentRole.length, isDeleting]);

  return (
    <section
      id="hero"
      ref={containerRef}
      className={`relative w-full h-screen ${HERO_VIDEO_SCROLL.sectionHeightClass} overflow-hidden`}
    >
      <div className="sticky top-0 z-10 flex h-screen items-center px-6 md:px-12 lg:px-16 pointer-events-none">
        <div className="w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="text-left text-[var(--text-primary)]">
            <h1 className="hero-text opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
              James Hou
            </h1>
            <p
              className="hero-text opacity-0 text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-body)] opacity-90 max-w-xl font-light"
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="border-r-2 border-current pr-1 animate-pulse">
                {displayText || "\u00A0"}
              </span>
            </p>

            <div className="hero-text opacity-0">
              <a
                href="#about"
                className="mt-12 inline-block px-8 py-4 rounded-full border border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] backdrop-blur-md font-medium hover:bg-transparent hover:text-[var(--text-primary)] transition-all pointer-events-auto"
              >
                See what I&rsquo;ve built &rarr;
              </a>
            </div>
          </div>

          <div className="hero-video opacity-0 hidden lg:flex items-center justify-center">
            <video
              ref={videoRef}
              src={HERO_VIDEO_SRC}
              muted
              playsInline
              preload="auto"
              className="w-full max-h-[min(70vh,520px)] rounded-2xl object-contain border border-[var(--border)] bg-[var(--bg-elevated)] shadow-sm"
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
