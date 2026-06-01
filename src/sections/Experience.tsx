"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type Category = "Internship" | "Competition" | "Leadership" | "Project";

interface Experience {
  role: string;
  org: string;
  date: string;
  category: Category;
  link?: string;
}

const CATEGORY_COLORS: Record<Category, string> = {
  Internship: "text-rose-400 border-rose-400/40 bg-rose-400/8",
  Project:   "text-sky-400 border-sky-400/40 bg-sky-400/8",
  Leadership: "text-emerald-400 border-emerald-400/40 bg-emerald-400/8",
  Competition:    "text-violet-400 border-violet-400/40 bg-violet-400/8",
};

// const CATEGORY_COLORS: Record<Category, string> = {
//   Internship: "text-amber-400 border-amber-400/40 bg-amber-400/8",      // Warm corporate accent
//   Project:    "text-cyan-400 border-cyan-400/40 bg-cyan-400/8",        // Technical builder blue
//   Leadership: "text-rose-400 border-rose-400/40 bg-rose-400/8",        // Bold authority red/pink
//   Competition: "text-fuchsia-400 border-fuchsia-400/40 bg-fuchsia-400/8", // High-energy purple
// };

const EXPERIENCES: Experience[] = [
  { role: "Software Engineering Intern",  org: "Luminerra",                   date: "Dec 2025 – May 2026",  category: "Internship", link: "https://luminerra.net/" },
  { role: "Co-Founder & CTO",             org: "QPin",                        date: "Jul 2025 – Present",   category: "Leadership",   link: "https://www.wearqpin.com" },
  { role: "Programmer & Builder",    org: "VEX Robotics 4610Z",          date: "Sep 2019 – Present",   category: "Competition", link: "https://events.vex.com/teams/v5rc/4610Z" },
  { role: "Outreach Manager",             org: "Techshare Project",           date: "Aug 2025 – Present",   category: "Leadership", link: "https://www.techshareproject.org/"},
];

function ArrowIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-60">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".experience-heading", {
      y: 20,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".experience-heading",
        start: "top 88%",
        once: true,
      },
    });

    gsap.from(".exp-row", {
      x: -12,
      opacity: 0,
      duration: 0.55,
      stagger: 0.07,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".experience-table",
        start: "top 82%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative z-[2] w-full max-w-6xl mx-auto px-6 pb-24"
    >
      {/* Section divider header */}
      <div className="experience-heading mb-8 flex items-center gap-6">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-lg md:text-xl text-[var(--text-primary)] font-medium whitespace-nowrap">
          Experience
        </p>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Table */}
      <div
        className="experience-table rounded-2xl border border-[var(--border)] overflow-hidden"
      >
        {EXPERIENCES.map((exp, idx) => {
          const isLast = idx === EXPERIENCES.length - 1;
          const colorClass = CATEGORY_COLORS[exp.category];

          const inner = (
            <div
              className={`exp-row flex items-center gap-3 px-5 py-3.5 transition-colors duration-200 group
                ${!isLast ? "border-b border-[var(--border)]" : ""}
                ${exp.link ? "hover:bg-[var(--bg-subtle)] cursor-pointer" : ""}
              `}
            >
              {/* Connector dot */}
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--border)] group-hover:bg-[var(--accent)] transition-colors shrink-0" />

              {/* Category badge */}
              <span
                className={`shrink-0 text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded border ${colorClass}`}
                style={{ fontVariantNumeric: "tabular-nums" }}
              >
                {exp.category}
              </span>

              {/* Role */}
              <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                {exp.role}
              </span>

              {/* @ separator + org */}
              <span className="text-[var(--text-secondary)] text-sm shrink-0 opacity-40">@</span>
              <span className="text-sm text-[var(--text-secondary)] truncate min-w-0">
                {exp.org}
              </span>

              {/* Spacer */}
              <span className="flex-1" />

              {/* Date */}
              <span className="text-xs text-[var(--text-secondary)] opacity-60 shrink-0 tabular-nums whitespace-nowrap">
                {exp.date}
              </span>

              {/* Link arrow */}
              {exp.link && (
                <span className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                  <ArrowIcon />
                </span>
              )}
            </div>
          );

          return exp.link ? (
            <a
              key={idx}
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
              aria-label={`${exp.role} at ${exp.org}`}
            >
              {inner}
            </a>
          ) : (
            <div key={idx}>{inner}</div>
          );
        })}
      </div>
    </section>
  );
}
