"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Title and text
    gsap.fromTo(".contact-header", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      }
    );

    // Contact cards
    gsap.fromTo(".contact-card", 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.7,
        stagger: 0.15,
        ease: "back.out(1.2)",
        delay: 0.2,
      }
    );
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="w-full max-w-6xl mx-auto px-6 py-32">
      <div className="text-center space-y-8 mb-16 max-w-4xl mx-auto">
        <h2 className="contact-header opacity-0 text-3xl md:text-5xl font-medium font-[family-name:var(--font-display)] text-[var(--text-primary)] leading-tight">
          Let's build something together.
        </h2>
        <p className="contact-header opacity-0 text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
          Whether you're interested in collaboration, have a project in mind, or just want to connect — I'd love to hear from you.
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {/* Primary CTA */}
        <a
          href="mailto:james.william.hou@gmail.com"
          className="contact-card opacity-0 group flex items-center justify-between gap-4 rounded-2xl sm:rounded-3xl bg-[var(--text-primary)] p-6 sm:p-8 transition-all duration-300 hover:opacity-90 cursor-pointer"
        >
          {/* Mobile layout: matches GitHub/LinkedIn cards */}
          <div className="flex sm:hidden items-center gap-3 min-w-0">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--bg-primary)]">
              <rect x="2" y="4" width="20" height="16" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-[var(--bg-primary)]">Email</p>
              <p className="text-xs text-[var(--bg-primary)]/60 truncate">james.william.hou@gmail.com</p>
            </div>
          </div>

          {/* Desktop layout */}
          <div className="hidden sm:block min-w-0">
            <p className="text-xs uppercase tracking-[0.2em] text-[var(--bg-primary)]/60 mb-2">Email</p>
            <p className="text-lg md:text-2xl font-medium font-[family-name:var(--font-display)] text-[var(--bg-primary)] break-normal">
              james.william.hou@gmail.com
            </p>
          </div>

          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] sm:w-6 sm:h-6 shrink-0 text-[var(--bg-primary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
            <line x1="7" y1="17" x2="17" y2="7"/>
            <polyline points="7 7 17 7 17 17"/>
          </svg>
        </a>

        {/* Secondary links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="https://github.com/jameshou28"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card opacity-0 group flex items-center justify-between gap-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--text-primary)] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">GitHub</p>
                <p className="text-xs text-[var(--text-secondary)]">@jameshou28</p>
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--text-secondary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>

          <a
            href="https://www.linkedin.com/in/jameshou28/"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-card opacity-0 group flex items-center justify-between gap-4 rounded-2xl bg-[var(--bg-subtle)] border border-[var(--border)] p-6 transition-all duration-300 hover:border-[var(--text-primary)] cursor-pointer"
          >
            <div className="flex items-center gap-3">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-primary)]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">LinkedIn</p>
                <p className="text-xs text-[var(--text-secondary)]">Connect</p>
              </div>
            </div>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-[var(--text-secondary)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
              <line x1="7" y1="17" x2="17" y2="7"/>
              <polyline points="7 7 17 7 17 17"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
