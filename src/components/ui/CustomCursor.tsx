"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useDeviceCapability } from "@/hooks/useDeviceCapability";

export default function CustomCursor() {
  const { isMobile } = useDeviceCapability();
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // We only want the custom cursor on non-touch devices
    if (isMobile) return;

    // Hide default cursor on desktop
    document.body.style.cursor = "none";
    const hideCursorElements = () => {
      document.querySelectorAll("a, button, input, select, textarea, [role='button'], .cursor-pointer").forEach(el => {
        (el as HTMLElement).style.cursor = "none";
      });
    };
    
    // Initial hide and observer for dynamically added elements
    hideCursorElements();
    const observer = new MutationObserver(hideCursorElements);
    observer.observe(document.body, { childList: true, subtree: true });

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    if (!cursor || !follower) return;

    // Center initially
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    const onMouseMove = (e: MouseEvent) => {
      // Main dot follows instantly
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0,
        ease: "none",
      });
      
      // Trailing circle follows with delay
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out",
      });
    };

    // Event delegation for hover states
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        gsap.to(cursor, { scale: 0, opacity: 0, duration: 0.2 });
        gsap.to(follower, { 
          scale: 1.5, 
          backgroundColor: "rgba(0, 184, 122, 0.2)", // accent-glow
          borderColor: "transparent",
          duration: 0.3 
        });
      }
    };
    
    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("a, button, [role='button'], .cursor-pointer")) {
        gsap.to(cursor, { scale: 1, opacity: 1, duration: 0.2 });
        gsap.to(follower, { 
          scale: 1, 
          backgroundColor: "transparent", 
          borderColor: "var(--text-secondary)",
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseover", onMouseOver);
    document.addEventListener("mouseout", onMouseOut);

    return () => {
      document.body.style.cursor = "auto";
      observer.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
      // Restore cursor for elements
      document.querySelectorAll("a, button, input, select, textarea, [role='button'], .cursor-pointer").forEach(el => {
        (el as HTMLElement).style.cursor = "auto";
      });
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference hidden md:block"
      />
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-8 h-8 border border-[var(--text-secondary)] rounded-full pointer-events-none z-[9998] transition-colors duration-300 hidden md:block"
      />
    </>
  );
}
