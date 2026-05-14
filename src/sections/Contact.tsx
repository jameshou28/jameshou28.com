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
    <section ref={containerRef} className="w-full max-w-6xl mx-auto px-6 py-32 bg-[var(--bg-primary)]">
      <div className="text-center space-y-8 mb-16 max-w-4xl mx-auto">
        <h2 className="contact-header opacity-0 text-3xl md:text-5xl font-medium font-[family-name:var(--font-display)] text-[var(--text-primary)] leading-tight">
          Let's build something together.
        </h2>
        <p className="contact-header opacity-0 text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
          Whether you're interested in collaboration, have a project in mind, or just want to connect — I'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
        <a
          href="mailto:james.william.hou@gmail.com"
          className="contact-card opacity-0 group relative overflow-hidden rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] p-8 text-center hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">Email</h3>
            <p className="text-sm text-[var(--text-secondary)]">james.william.hou@gmail.com</p>
          </div>
        </a>

        <a
          href="https://github.com/jameshou28"
          target="_blank"
          rel="noopener noreferrer"
          className="contact-card opacity-0 group relative overflow-hidden rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] p-8 text-center hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">GitHub</h3>
            <p className="text-sm text-[var(--text-secondary)]">@jameshou28</p>
          </div>
        </a>

        <a
          href="https://www.linkedin.com/in/jameshou28/"
          className="contact-card opacity-0 group relative overflow-hidden rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] p-8 text-center hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-[var(--accent)]/10 flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--accent)]">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">LinkedIn</h3>
            <p className="text-sm text-[var(--text-secondary)]">Connect</p>
          </div>
        </a>
      </div>
    </section>
  );
}
