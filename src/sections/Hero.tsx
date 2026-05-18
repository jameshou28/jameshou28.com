"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const ROLE_TITLES = ["Full Stack Developer", "Software & Hardware Engineer", "Applied AI"];

/** Typewriter tagline — lower delays = faster typing */
const HERO_TYPEWRITER = {
  typingDelayMs: 45,
  deletingDelayMs: 30,
  pauseDelayMs: 1200,
} as const;

/** Hero text entrance animation */
const HERO_ENTRANCE = {
  duration: 0.9,
  stagger: 0.12,
  delay: 0.25,
} as const;

export default function Hero() {
  const containerRef = useRef<HTMLElement>(null);
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
      className="relative w-full h-screen overflow-hidden"
    >
      <div className="sticky top-0 z-10 flex h-screen items-center justify-center px-6 md:px-12 lg:px-16 pointer-events-none">
        <div className="w-full max-w-4xl mx-auto text-center text-[var(--text-primary)]">
          <h1 className="hero-text opacity-0 text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
            James Hou
          </h1>
          <p
            className="hero-text opacity-0 text-lg sm:text-xl md:text-2xl font-[family-name:var(--font-body)] opacity-90 max-w-xl mx-auto font-light"
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
      </div>
    </section>
  );
}
