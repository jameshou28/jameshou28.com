"use client";

import { useState, useRef } from "react";
import Scene from "@/components/3d/Scene";
import ModelViewer from "@/components/3d/ModelViewer";
import GalleryModal, { GalleryItem } from "@/components/ui/GalleryModal";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ProjectItemProps {
  title: string;
  problem: string;
  solution: string;
  modelPath?: string;
  modelRotation?: [number, number, number];
  imagePath?: string;
  techStack: string[];
  awards?: string[];
  additionalNote?: {
    text: string;
    link: string;
  };
  reversed?: boolean;
  category: "engineering" | "programming";
  gallery?: GalleryItem[];
}

export default function ProjectItem({
  title,
  problem,
  solution,
  modelPath,
  modelRotation = [0, 0, 0],
  imagePath,
  techStack,
  awards,
  additionalNote,
  reversed = false,
  category,
  gallery = [],
}: ProjectItemProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const ctx = containerRef.current;
    if (!ctx) return;

    // Visual side animation
    gsap.fromTo(ctx.querySelector(".project-visual"),
      { scale: 0.95, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctx,
          start: "top 80%",
          once: true,
        },
      }
    );

    // Text stagger
    gsap.fromTo(ctx.querySelectorAll(".project-text"),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctx,
          start: "top 80%",
          once: true,
        },
      }
    );
  }, { scope: containerRef });

  return (
    <div ref={containerRef}>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24`}>
        {/* Visual Side */}
        <div className={`${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <div className="project-visual opacity-0 h-[50vh] lg:h-[70vh] rounded-2xl bg-[var(--bg-subtle)] overflow-hidden relative">
            {category === "engineering" && modelPath ? (
              /* Engineering: Interactive 3D model */
              <Scene enableControls={true}>
                <ModelViewer
                  modelPath={modelPath}
                  scale={20}
                  rotation={modelRotation}
                  autoRotate={true}
                  enableParallax={false}
                />
              </Scene>
            ) : imagePath ? (
              /* Programming with image */
              <img
                src={imagePath}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : (
              /* Placeholder for projects without images yet */
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--border)] flex items-center justify-center">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--text-secondary)]">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                      <line x1="8" y1="21" x2="16" y2="21" />
                      <line x1="12" y1="17" x2="12" y2="21" />
                    </svg>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)]">Preview coming soon</p>
                </div>
              </div>
            )}
          </div>

          {/* Gallery Button */}
          <button
            onClick={() => setIsGalleryOpen(true)}
            className="project-text opacity-0 mt-4 w-full py-3 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all"
          >
            View Gallery →
          </button>
        </div>

        {/* Text Side */}
        <div className={`flex flex-col space-y-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
          <h2 className="project-text opacity-0 text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">{title}</h2>

          {problem && (
            <div className="project-text opacity-0">
              <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">The Problem</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{problem}</p>
            </div>
          )}

          <div className="project-text opacity-0">
            <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">{problem ? "The Solution" : "Description"}</h3>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed">{solution}</p>
          </div>

          {awards && awards.length > 0 && (
            <div className="project-text opacity-0 pt-4">
              <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-3">Awards & Achievements</h3>
              <ul className="space-y-2">
                {awards.map((award, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                    <span className="text-[var(--accent)] mt-1">•</span>
                    <span>{award}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {additionalNote && (
            <div className="project-text opacity-0 pt-2">
              <a
                href={additionalNote.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                {additionalNote.text} →
              </a>
            </div>
          )}

          <div className="project-text opacity-0 flex flex-wrap gap-2 pt-4">
            {techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full border border-[var(--border)] text-sm text-[var(--text-secondary)]">
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      <GalleryModal
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
        items={gallery}
        projectTitle={title}
      />
    </div>
  );
}
