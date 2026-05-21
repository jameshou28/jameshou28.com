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
          {/* Social Links Dock */}
          <div className="hero-text opacity-0 mb-6 inline-flex items-center gap-1.5 p-1.5 rounded-full bg-[var(--bg-elevated)] border border-[var(--border)] shadow-[0_4px_20px_rgba(0,0,0,0.03)] backdrop-blur-md pointer-events-auto">
            <a
              href="mailto:james.william.hou@gmail.com"
              aria-label="Email James"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-subtle)] transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:-top-11 transition-all duration-300 pointer-events-none px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold tracking-wide shadow-md whitespace-nowrap z-20">
                Email
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--text-primary)]" />
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:scale-110 group-hover:stroke-[var(--accent)]"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </a>

            <a
              href="https://github.com/jameshou28"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-subtle)] transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:-top-11 transition-all duration-300 pointer-events-none px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold tracking-wide shadow-md whitespace-nowrap z-20">
                GitHub
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--text-primary)]" />
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:scale-110 group-hover:stroke-[var(--accent)]"
              >
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/jameshou28/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group relative flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--bg-subtle)] transition-all duration-300 text-[var(--text-secondary)] hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]"
            >
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 group-hover:-top-11 transition-all duration-300 pointer-events-none px-2.5 py-1 rounded-lg bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-semibold tracking-wide shadow-md whitespace-nowrap z-20">
                LinkedIn
                <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[var(--text-primary)]" />
              </span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:scale-110 group-hover:stroke-[var(--accent)]"
              >
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>

          <h1 className="hero-text opacity-0 text-7xl sm:text-6xl md:text-7xl lg:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
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
