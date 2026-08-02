"use client";

import { useState } from "react";
import Scene from "@/components/3d/Scene";
import ModelViewer from "@/components/3d/ModelViewer";
import ModelErrorBoundary from "@/components/3d/ModelErrorBoundary";
import GalleryModal, { GalleryItem } from "@/components/ui/GalleryModal";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export interface ProjectLink {
  type: "github" | "website" | "custom";
  url: string;
  label?: string;
}

interface ProjectItemProps {
  title: string;
  problem: string;
  solution: string;
  modelPath?: string;
  modelRotation?: [number, number, number];
  modelScale?: number;
  imagePath?: string;
  fallbackImagePath?: string;
  techStack: string[];
  awards?: string[];
  additionalNote?: {
    text: string;
    link: string;
  };
  reversed?: boolean;
  category: "engineering" | "programming";
  gallery?: GalleryItem[];
  links?: ProjectLink[];
}

function LinkIcon({ type }: { type: ProjectLink["type"] }) {
  if (type === "github") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    );
  }
  if (type === "website") {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ProjectItem({
  title,
  problem,
  solution,
  modelPath,
  modelRotation = [0, 0, 0],
  modelScale,
  imagePath,
  fallbackImagePath,
  techStack,
  awards,
  additionalNote,
  reversed = false,
  category,
  gallery = [],
  links = [],
}: ProjectItemProps) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const { hasWebGL } = useDeviceCapability();

  return (
    <div>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-6`}>
        <div className={`${reversed ? "lg:order-2" : "lg:order-1"}`}>
          <div className={`rounded-2xl bg-[var(--bg-subtle)] overflow-hidden relative ${
            category === "programming" && imagePath ? "" : "h-[50vh] lg:h-[70vh]"
          }`}>
            {category === "engineering" && modelPath && hasWebGL ? (
              <ModelErrorBoundary
                fallback={
                  fallbackImagePath ? (
                    <img
                      src={fallbackImagePath}
                      alt={title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <p className="text-sm text-[var(--text-secondary)]">Preview unavailable</p>
                    </div>
                  )
                }
              >
                <Scene enableControls={true}>
                  <ModelViewer
                    modelPath={modelPath}
                    scale={modelScale || 20}
                    rotation={modelRotation}
                    autoRotate={true}
                    enableParallax={false}
                  />
                </Scene>
              </ModelErrorBoundary>
            ) : category === "engineering" && modelPath && fallbackImagePath ? (
              <img
                src={fallbackImagePath}
                alt={title}
                className="w-full h-full object-cover"
              />
            ) : imagePath ? (
              <img
                src={imagePath}
                alt={title}
                className="block mx-auto w-full h-auto max-h-[clamp(20rem,55vh,32rem)] object-contain"
                style={{ width: "auto", maxWidth: "100%" }}
              />
            ) : (
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

          <button
            onClick={() => setIsGalleryOpen(true)}
            className="mt-4 w-full py-3.5 rounded-xl border border-[var(--accent)] bg-transparent text-sm font-semibold text-[var(--accent)] hover:bg-[var(--accent)]/10 hover:-translate-y-0.5 transition-all"
          >
            View Gallery →
          </button>
        </div>
        <div className={`flex flex-col space-y-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">{title}</h2>

          {problem && (
            <div className="">
              <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">The Problem</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{problem}</p>
            </div>
          )}

          <div className="">
            <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">{problem ? "The Solution" : "Description"}</h3>
            <p className="text-[var(--text-primary)] text-lg leading-relaxed">{solution}</p>
          </div>

          {awards && awards.length > 0 && (
            <div className="pt-4">
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
            <div className="pt-2">
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

          <div className="flex flex-wrap gap-2 pt-4">
            {techStack.map((tech) => (
              <span key={tech} className="px-3 py-1 rounded-full border border-[var(--border)] text-sm text-[var(--text-secondary)]">
                {tech}
              </span>
            ))}
          </div> 
          {links.length > 0 && (
            <div className="flex items-center gap-3 pt-4">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all text-sm"
                >
                  <LinkIcon type={link.type} />
                  <span>{link.label || (link.type === "github" ? "GitHub" : link.type === "website" ? "Website" : "Link")}</span>
                </a>
              ))}
            </div>
          )}
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
