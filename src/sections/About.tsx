"use client";

import Link from 'next/link';
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = [
  { category: "Languages", items: "Python, C++, Java, HTML, CSS, JavaScript" },
  { category: "Frameworks", items: "Flask, Django, ThreeJS" },
  { category: "Systems & Tools", items: "Git, Vercel, PlatformIO, ArduinoIDE, Figma" },
  { category: "CAD & Design", items: "Fusion 360, Onshape, Blender" },
  { category: "Adobe Creative Suite", items: "Photoshop, Illustrator, Lightroom, Premiere Pro" },
];

export default function About() {
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Narrative text
    gsap.from(".about-text", {
      y: 50,
      opacity: 0,
      duration: 1.2,
      stagger: 0.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-text-container",
        start: "top 80%",
        once: true,
      }
    });

    // Profile & Skills
    gsap.from(".about-photo", {
      scale: 0.95,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-skills-container",
        start: "top 80%",
        once: true,
      }
    });

    gsap.from(".about-skill", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-skills-container",
        start: "top 80%",
        once: true,
      }
    });


    // Nav Buttons
    gsap.fromTo(".about-nav", 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".about-nav-container",
          start: "top bottom",
          once: true,
        }
      }
    );
  }, { scope: containerRef });

  return (
    <section id="about" ref={containerRef} className="relative z-[2] w-full max-w-6xl mx-auto px-6 py-32">
      <div className="about-text-container text-center space-y-8 mb-24 max-w-4xl mx-auto">
        <h2 className="about-text text-3xl md:text-5xl font-medium font-[family-name:var(--font-display)] text-[var(--text-primary)] leading-tight">
          I build at the intersection of <span className="text-[var(--accent)] font-bold">hardware</span> and <span className="text-[var(--accent)] font-bold">software</span>.
        </h2>
        <p className="about-text text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
          From VEX competition robots to wearable devices to accessibility tools. Every project starts with a problem worth solving.
        </p>
      </div>

      <div className="about-skills-container grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left Side: Photo Placeholder */}
        <div className="about-photo w-full max-w-sm aspect-[3.5/4] rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] overflow-hidden relative flex items-center justify-center mx-auto">
          <p className="text-[var(--text-secondary)] text-sm font-medium">
            [ James Hou ]
          </p>
          {<img src="/images/profile.jpg" alt="James Hou" className="absolute inset-0 w-full h-full object-cover" />}
        </div>

        {/* Right Side: Skills */}
        <div className="h-full flex flex-col justify-center">
          <h3 className="about-skill text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-8 border-b border-[var(--border)] pb-4">
            Technical Skills
          </h3>
          <div className="space-y-6">
            {SKILLS.map((skill, index) => (
              <div key={index} className="about-skill grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-baseline">
                <span className="text-sm font-semibold text-[var(--text-primary)] md:text-right">
                  {skill.category}
                </span>
                <span className="text-sm text-[var(--text-secondary)] md:col-span-2">
                  {skill.items}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>



      {/* Portfolio Navigation */}
      <div className="about-nav-container w-full mt-24 grid grid-cols-1 md:grid-cols-2 gap-8">
        <Link 
          href="/programming"
          className="about-nav group relative overflow-hidden rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] p-12 text-center hover:border-[var(--text-primary)] transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm uppercase tracking-wider text-[var(--accent)] font-semibold mb-4">Software & Web</h3>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">Programming Portfolio &rarr;</h2>
        </Link>
        
        <Link 
          href="/engineering"
          className="about-nav group relative overflow-hidden rounded-3xl bg-[var(--text-primary)] border border-[var(--text-primary)] p-12 text-center hover:bg-transparent transition-all duration-300 cursor-pointer"
        >
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <h3 className="text-sm uppercase tracking-wider text-[var(--bg-subtle)] group-hover:text-[var(--accent)] font-semibold mb-4 transition-colors">Hardware & CAD</h3>
          <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--bg-primary)] group-hover:text-[var(--text-primary)] transition-colors">Engineering Portfolio &rarr;</h2>
        </Link>
      </div>
    </section>
  );
}
