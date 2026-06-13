"use client";

import { useEffect, useCallback, useState } from "react";

export interface GalleryItem {
  type: "image" | "video";
  src: string;
  caption?: string;
}

interface GalleryModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: GalleryItem[];
  projectTitle: string;
}

export default function GalleryModal({ isOpen, onClose, items, projectTitle }: GalleryModalProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Reset index when opening
  useEffect(() => {
    if (isOpen) setCurrentIndex(0);
  }, [isOpen]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => { document.body.style.overflow = "unset"; };
  }, [isOpen]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  }, [items.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  }, [items.length]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose, goNext, goPrev]);

  if (!isOpen) return null;

  const hasItems = items.length > 0;
  const current = hasItems ? items[currentIndex] : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal container — fixed height so controls stay pinned regardless of image size */}
      <div className="relative z-10 w-full max-w-5xl mx-4 h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-white text-lg font-medium font-[family-name:var(--font-display)]">
            {projectTitle}
            {hasItems && (
              <span className="text-white/50 ml-3 text-sm">
                {currentIndex + 1} / {items.length}
              </span>
            )}
          </h2>
          <button
            onClick={onClose}
            className="text-white/70 hover:text-white transition-colors p-2"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        {hasItems && current ? (
          <div className="relative flex-1 min-h-0 flex items-center justify-center rounded-2xl overflow-hidden bg-black/30">
            {current.type === "image" ? (
              <img
                src={current.src}
                alt={current.caption || projectTitle}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video
                src={current.src}
                controls
                className="max-w-full max-h-full"
              />
            )}

            {/* Navigation arrows */}
            {items.length > 1 && (
              <>
                <button
                  onClick={goPrev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 flex items-center justify-center transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm text-white/80 hover:text-white hover:bg-black/60 flex items-center justify-center transition-all"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center rounded-2xl bg-black/20 min-h-[300px]">
            <p className="text-white/40 text-sm">No gallery items yet</p>
          </div>
        )}

        {/* Caption — fixed slot so the thumbnail strip below never shifts */}
        <p className="text-white/60 text-sm text-center mt-3 h-5 truncate">{current?.caption}</p>

        {/* Thumbnail strip */}
        {items.length > 1 && (
          <div className="flex gap-2 justify-center mt-4 overflow-x-auto pb-2">
            {items.map((item, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all flex-shrink-0 ${
                  idx === currentIndex 
                    ? "border-[var(--accent)] opacity-100" 
                    : "border-transparent opacity-50 hover:opacity-80"
                }`}
              >
                {item.type === "image" ? (
                  <img src={item.src} alt="" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-white/10 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="white" stroke="none">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
