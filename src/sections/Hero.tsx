"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const ROLE_TITLES = ["Full Stack Developer", "Robotics Engineer", "Applied AI"];
const TYPING_SPEED = 120;
const DELETING_SPEED = 60;
const PAUSE_DURATION = 1200;

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
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
        duration: 1.5,
        stagger: 0.2,
        ease: "power3.out",
        delay: 0.5,
      }
    );
  }, { scope: containerRef });

  useEffect(() => {
    const atEnd = !isDeleting && charIndex === currentRole.length;
    const atStart = isDeleting && charIndex === 0;
    const timeoutDuration = atEnd || atStart
      ? PAUSE_DURATION
      : isDeleting
        ? DELETING_SPEED
        : TYPING_SPEED;

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
    <section id="hero" ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* HTML Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <div className="text-center px-4 text-[var(--text-primary)]">
          <h1 className="hero-text opacity-0 text-6xl md:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
            James Hou
          </h1>
          <p
            className="hero-text opacity-0 text-xl md:text-2xl font-[family-name:var(--font-body)] opacity-90 max-w-2xl mx-auto font-light"
            aria-live="polite"
            aria-atomic="true"
          >
            <span className="border-r-2 border-current pr-1 animate-pulse">
              {displayText || "\u00A0"}
            </span>
          </p>
          
          <div className="hero-text opacity-0">
            <a href="#about" className="mt-12 inline-block px-8 py-4 rounded-full border border-[var(--text-primary)] bg-[var(--text-primary)] text-[var(--bg-primary)] backdrop-blur-md font-medium hover:bg-transparent hover:text-[var(--text-primary)] transition-all pointer-events-auto">
              See what I&rsquo;ve built &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
