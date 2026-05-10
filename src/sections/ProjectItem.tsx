"use client";

import { useState } from "react";
import Scene from "@/components/3d/Scene";
import ModelViewer from "@/components/3d/ModelViewer";
import PlaceholderGeometry from "@/components/3d/PlaceholderGeometry";
import ProjectCard from "@/components/ui/ProjectCard";

interface ProjectItemProps {
  title: string;
  problem: string;
  solution: string;
  modelPath?: string;
  modelRotation?: [number, number, number];
  placeholderType?: "abstract" | "accessibility";
  techStack: string[];
  awards?: string[];
  additionalNote?: {
    text: string;
    link: string;
  };
  reversed?: boolean;
}

export default function ProjectItem({
  title,
  problem,
  solution,
  modelPath,
  modelRotation = [0, 0, 0],
  placeholderType = "abstract",
  techStack,
  awards,
  additionalNote,
  reversed = false,
}: ProjectItemProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-24`}>
        {/* 3D Model Side */}
        <div 
          className={`h-[50vh] lg:h-[70vh] rounded-2xl bg-[var(--bg-subtle)] overflow-hidden relative cursor-pointer group ${reversed ? "lg:order-2" : "lg:order-1"}`}
          onClick={() => setIsModalOpen(true)}
        >
          <Scene enableControls={false}>
            {modelPath ? (
              <ModelViewer 
                modelPath={modelPath} 
                scale={20}
                rotation={modelRotation}
                autoRotate={true}
                enableParallax={true}
              />
            ) : (
              <PlaceholderGeometry type={placeholderType} />
            )}
          </Scene>
          <div className="absolute inset-0 z-10 hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
            <span className="bg-[var(--bg-elevated)] text-[var(--text-primary)] px-4 py-2 rounded-full text-sm shadow-sm backdrop-blur-sm bg-opacity-90 transition-transform transform scale-95 group-hover:scale-100">
              View Details
            </span>
          </div>
        </div>

        {/* Text Side */}
        <div className={`flex flex-col space-y-6 ${reversed ? "lg:order-1" : "lg:order-2"}`}>
          <h2 className="text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">{title}</h2>

          {problem && (
            <div>
              <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-2">The Problem</h3>
              <p className="text-[var(--text-secondary)] text-lg leading-relaxed">{problem}</p>
            </div>
          )}

          <div>
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
        </div>
      </div>

      <ProjectCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={{ title, problem, solution, techStack, awards, additionalNote }}
      />
    </>
  );
}
