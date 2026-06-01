"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const EXPERIENCES = [
  {
    role: "Software Engineering Intern",
    org: "Luminerra",
    date: "Dec 2025 – May 2026",
    description:
      "Built internal admin platform for managing user access and audit workflows. Implemented multi-agent orchestration system that analyzes security, compliance, and operational clauses in real estate acquisition documents.",
    tags: ["Python", "Multi-Agent AI", "Admin Systems"],
    link: null,
  },
  {
    role: "Co-Founder & CTO",
    org: "QPin",
    date: "July 2025 – Present",
    description:
      "Co-founded hardware startup building a wearable digital pin for advocacy and self-expression. Designed 3D-printed case in Fusion360, programmed the microcontroller in Python, and shipped a companion iOS app.",
    tags: ["Fusion360", "Python", "Swift", "ESP32"],
    link: "https://www.wearqpin.com",
  },
  {
    role: "Lead Programmer & Builder",
    org: "Robot Revolution — VEX Robotics 4610Z",
    date: "Sept 2019 – Present",
    description:
      "Lead programmer on a VEX World Championship team. Ranked 18th of 6,800+ teams globally in the 2026 Skills Challenge. World Semifinalist (2025). Multiple state and world-level awards.",
    tags: ["C++", "Motion Control", "LiDAR", "Onshape"],
    link: "https://events.vex.com/teams/v5rc/4610Z",
  },
  {
    role: "Fellow",
    org: "Computer Engineering for Good — NYU",
    date: "June – July 2025",
    description:
      "Designed and built a low-cost weather monitoring network using LoRa microcontrollers, GPS, and environmental sensors. Deployed 12 stations to map air quality data across a 6-mile radius.",
    tags: ["LoRa", "UART", "Embedded Systems", "C++"],
    link: null,
  },
  {
    role: "Outreach Manager",
    org: "Techshare Project",
    date: "Aug 2025 – Present",
    description:
      "Build partnerships and create social media content for an international 501(c)(3) nonprofit promoting technology access and STEM education. Developing the Eduquality 2.0 mobile app.",
    tags: ["Nonprofit", "Mobile Dev", "STEM Outreach"],
    link: null,
  },
];

export default function Experience() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    gsap.from(".experience-heading", {
      y: 30,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".experience-heading",
        start: "top 85%",
        once: true,
      },
    });

    gsap.from(".experience-card", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.12,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".experience-list",
        start: "top 80%",
        once: true,
      },
    });
  }, { scope: containerRef });

  return (
    <section
      ref={containerRef}
      className="relative z-[2] w-full max-w-6xl mx-auto px-6 pb-24"
    >
      {/* Section header — matches the "Featured Projects" divider pattern */}
      <div className="experience-heading mb-10 flex items-center gap-6">
        <span className="h-px flex-1 bg-[var(--border)]" />
        <p className="text-lg md:text-xl text-[var(--text-primary)] font-medium whitespace-nowrap">
          Experience
        </p>
        <span className="h-px flex-1 bg-[var(--border)]" />
      </div>

      {/* Card list */}
      <div className="experience-list flex flex-col gap-4">
        {EXPERIENCES.map((exp, idx) => (
          <div
            key={idx}
            className="experience-card group relative rounded-3xl border border-[var(--border)] bg-[var(--bg-subtle)] p-6 md:p-8 transition-colors duration-300 hover:border-[var(--text-primary)]"
          >
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              {/* Left: role + org + description */}
              <div className="flex-1 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <h3 className="text-lg font-semibold text-[var(--text-primary)] leading-snug">
                    {exp.role}
                  </h3>
                  <span className="hidden sm:inline text-[var(--border)]">·</span>
                  <span className="text-sm font-medium text-[var(--accent)]">
                    {exp.org}
                  </span>
                </div>

                <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-2xl">
                  {exp.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 pt-1">
                  {exp.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full border border-[var(--border)] text-xs text-[var(--text-secondary)]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: date + optional link */}
              <div className="flex flex-row md:flex-col items-start md:items-end gap-3 shrink-0">
                <span className="text-xs uppercase tracking-wider text-[var(--text-secondary)] font-semibold whitespace-nowrap">
                  {exp.date}
                </span>

                {exp.link && (
                  <a
                    href={exp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    aria-label={`Visit ${exp.org}`}
                  >
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                    Visit
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
