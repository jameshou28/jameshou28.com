"use client";

import { useRef, useState } from "react";
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
  bullets: string[];
  link?: string;
}

const CATEGORY_COLORS: Record<Category, string> = {
  Internship:  "text-rose-400 border-rose-400/40 bg-rose-400/8",
  Project:     "text-sky-400 border-sky-400/40 bg-sky-400/8",
  Leadership:  "text-emerald-400 border-emerald-400/40 bg-emerald-400/8",
  Competition: "text-violet-400 border-violet-400/40 bg-violet-400/8",
};

const EXPERIENCES: Experience[] = [
  {
    role: "Software Engineering Intern",
    org: "Luminerra",
    date: "Dec 2025 – May 2026",
    category: "Internship", 
    link: "https://luminerra.net/",
    bullets: [
      "Built an internal admin platform for user access management and audit workflows",
      "Worked at a startup accepted into NVIDIA Inception and Intel Partner Alliance programs",
    ],
  },
  {
    role: "Co-Founder & CTO",
    org: "QPin",
    date: "Jul 2025 – Present",
    category: "Leadership",
    link: "https://www.wearqpin.com",
    bullets: [
      "Led a team of seven in the technical development of a wearable digital pin",
      "Designed a 3D-printed hardware case in Fusion360 and programmed the ESP32 microcontroller in Python",
      "Shipped a companion iOS app on the App Store via Swift and BLE",
      "Built the product landing page",
    ],
  },
  {
    role: "Programmer & Builder",
    org: "VEX Robotics",
    date: "Sep 2019 – Present",
    category: "Competition",
    link: "https://events.vex.com/teams/v5rc/4610Z",
    bullets: [
      "World Championship Semifinalist (2025); 2x World Championship Innovate Award (2024, 2026)",
      "NJ State Champion (2024); NJ State Excellence Award and NJ State Finalist (2026)",
      "Led team interviews (viewed 80k+ times across all platforms)",
      "Founded a middle school robotics program. Designed the curriculum and delivered lesson plans to teach 40+ middle school students robotics, including engineering and software development",
    ],
  },
  {
    role: "Outreach Manager",
    org: "Techshare Project",
    date: "Aug 2025 – Present",
    category: "Leadership",
    link: "https://www.techshareproject.org/",
    bullets: [
      "Built partnerships and managed social media for an international 501(c)(3) nonprofit",
      "Led the FutureHacks initiative, planning and running a hackathon",
    ],
  },
];

function ExternalLinkIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
    >
      <polyline points="9 18 15 12 9 6" />
    </svg>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);
  const [openIdx, setOpenIdx] = useState<number | null>(null);

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

  const toggle = (idx: number) =>
    setOpenIdx((prev) => (prev === idx ? null : idx));

  return (
    <section
      ref={containerRef}
      className="relative z-[2] w-full max-w-6xl mx-auto px-4 sm:px-6 pb-24"
    >
      <div className="experience-heading mb-8 flex items-center gap-6">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-lg md:text-xl text-[var(--text-primary)] font-medium whitespace-nowrap">
          Experience
        </p>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      <div className="experience-table rounded-2xl border border-[var(--border)] overflow-hidden">
        {EXPERIENCES.map((exp, idx) => {
          const isLast = idx === EXPERIENCES.length - 1;
          const isOpen = openIdx === idx;
          const colorClass = CATEGORY_COLORS[exp.category];

          return (
            <div
              key={idx}
              className={`exp-row ${!isLast ? "border-b border-[var(--border)]" : ""}`}
            >
              {/* Main row */}
              <button
                onClick={() => toggle(idx)}
                className="w-full flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3.5 hover:bg-[var(--bg-subtle)] transition-colors duration-150 text-left group"
                aria-expanded={isOpen}
              >
                <span className="text-[var(--text-secondary)] opacity-40 group-hover:opacity-80 transition-opacity shrink-0">
                  <ChevronIcon open={isOpen} />
                </span>

                <span
                  className={`shrink-0 text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold px-1.5 sm:px-2 py-0.5 rounded border ${colorClass}`}
                >
                  {exp.category}
                </span>

                <span className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2 min-w-0 flex-1">
                  <span className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {exp.role}
                  </span>
                  <span className="text-[var(--text-secondary)] text-xs sm:text-sm opacity-40 hidden sm:inline shrink-0">@</span>
                  <span className="text-xs sm:text-sm text-[var(--text-secondary)] truncate">
                    {exp.org}
                  </span>
                </span>

                <span className="text-[10px] sm:text-xs text-[var(--text-secondary)] opacity-50 shrink-0 tabular-nums whitespace-nowrap ml-auto pl-2">
                  <span className="hidden sm:inline">{exp.date}</span>
                  <span className="sm:hidden">{exp.date.split("–")[0].trim()}</span>
                </span>
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div className="px-3 sm:px-5 py-4 border-t border-[var(--border)] bg-[var(--bg-subtle)]">
                  <ul className="space-y-2 mb-4">
                    {exp.bullets.map((b, i) => (
                      <li key={i} className="flex items-start gap-2 text-[11px] sm:text-xs">
                        <span className="text-[var(--accent)] shrink-0 mt-0.5">•</span>
                        <span className="text-[var(--text-secondary)]">{b}</span>
                      </li>
                    ))}
                  </ul>

                  {exp.link && (
                    <a
                      href={exp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      Visit {exp.org}
                      <ExternalLinkIcon />
                    </a>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
