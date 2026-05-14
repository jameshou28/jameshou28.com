"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(".hero-text", 
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

  return (
    <section ref={containerRef} className="relative w-full h-screen overflow-hidden">
      {/* HTML Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full pointer-events-none">
        <div className="text-center px-4 text-[var(--text-primary)]">
          <h1 className="hero-text opacity-0 text-6xl md:text-8xl font-bold font-[family-name:var(--font-display)] tracking-tighter mb-6">
            James Hou
          </h1>
          <p className="hero-text opacity-0 text-xl md:text-2xl font-[family-name:var(--font-body)] opacity-90 max-w-2xl mx-auto font-light">
            From CAD to code — engineering what matters.
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
