"use client";

import { useEffect } from "react";

interface ProjectCardProps {
  isOpen: boolean;
  onClose: () => void;
  project: {
    title: string;
    problem: string;
    solution: string;
    techStack: string[];
    awards?: string[];
    additionalNote?: {
      text: string;
      link: string;
    };
  };
}

export default function ProjectCard({ isOpen, onClose, project }: ProjectCardProps) {
  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-12">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-full overflow-y-auto bg-[var(--bg-primary)] rounded-3xl shadow-2xl border border-[var(--border)] p-8 md:p-12 transform transition-all">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full hover:bg-[var(--bg-subtle)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 6L6 18M6 6l12 12"/>
          </svg>
        </button>

        <h2 className="text-4xl font-bold font-[family-name:var(--font-display)] mb-8 text-[var(--text-primary)]">{project.title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            {project.problem && (
              <div>
                <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">The Problem</h3>
                <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{project.problem}</p>
              </div>
            )}

            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">{project.problem ? "The Solution" : "Description"}</h3>
              <p className="text-[var(--text-primary)] text-lg leading-relaxed">{project.solution}</p>
            </div>
          </div>
          
          <div>
            {project.awards && project.awards.length > 0 && (
              <div className="p-6 bg-[var(--bg-elevated)] rounded-2xl border border-[var(--border)] mb-8">
                <h3 className="font-semibold text-[var(--accent)] mb-3">Awards & Achievements</h3>
                <ul className="space-y-2">
                  {project.awards.map((award, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                      <span className="text-[var(--accent)] mt-1">•</span>
                      <span>{award}</span>
                    </li>
                  ))}
                </ul>
                {project.additionalNote && (
                  <div className="mt-4 pt-4 border-t border-[var(--border)]">
                    <a
                      href={project.additionalNote.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
                    >
                      {project.additionalNote.text} →
                    </a>
                  </div>
                )}
              </div>
            )}

            <h3 className="text-sm uppercase tracking-wider text-[var(--text-primary)] font-semibold mb-4">Tech Stack</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.techStack.map((tech) => (
                <span key={tech} className="px-3 py-1 rounded-full border border-[var(--border)] text-sm text-[var(--text-secondary)]">
                  {tech}
                </span>
              ))}
            </div>

            <div className="p-6 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)]">
              <h3 className="font-semibold text-[var(--text-primary)] mb-2">Engineering Notes</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                More detailed technical writeup for this project goes here. This area can include specific CAD challenges, firmware constraints, or manufacturing details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
