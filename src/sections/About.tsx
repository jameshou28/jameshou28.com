"use client";

import dynamic from 'next/dynamic';

const GitHubCalendar = dynamic(() => import('react-github-calendar').then((mod) => mod.GitHubCalendar), {
  ssr: false,
});

const SKILLS = [
  { category: "Languages", items: "Python, C++, Java, HTML, CSS, JavaScript" },
  { category: "Frameworks", items: "Flask, Django" },
  { category: "Systems & Tools", items: "Git, Vercel, PlatformIO, ArduinoIDE, Figma" },
  { category: "CAD & Design", items: "Fusion 360, Onshape" },
  { category: "Adobe Creative Suite", items: "Photoshop, Illustrator, Lightroom, Premiere Pro" },
];

export default function About() {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-32 bg-[var(--bg-primary)]">
      <div className="text-center space-y-8 mb-24 max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-medium font-[family-name:var(--font-display)] text-[var(--text-primary)] leading-tight">
          I build at the intersection of <span className="text-[var(--accent)] font-bold">hardware</span> and <span className="text-[var(--accent)] font-bold">software</span>.
        </h2>
        <p className="text-xl md:text-2xl text-[var(--text-secondary)] font-light leading-relaxed">
          From VEX competition robots to wearable devices to accessibility tools. Every project starts with a problem worth solving.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        {/* Left Side: Photo Placeholder */}
        <div className="w-full aspect-[4/5] md:aspect-square lg:aspect-[4/5] rounded-3xl bg-[var(--bg-subtle)] border border-[var(--border)] overflow-hidden relative flex items-center justify-center">
          <p className="text-[var(--text-secondary)] text-sm font-medium">
            [ Upload profile photo to /public/profile.jpg ]
          </p>
          {/* <img src="/profile.jpg" alt="James Hou" className="absolute inset-0 w-full h-full object-cover" /> */}
        </div>

        {/* Right Side: Skills */}
        <div className="h-full flex flex-col justify-center">
          <h3 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-8 border-b border-[var(--border)] pb-4">
            Technical Arsenal
          </h3>
          <div className="space-y-6">
            {SKILLS.map((skill, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-2 md:gap-4 items-baseline">
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

      {/* Bottom: GitHub Graph */}
      <div className="w-full">
        <h3 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-8 border-b border-[var(--border)] pb-4 text-center">
          Open Source & Commits
        </h3>
        <div className="p-8 bg-[var(--bg-subtle)] rounded-2xl border border-[var(--border)] flex justify-center overflow-x-auto overflow-y-hidden">
          <div className="min-w-[700px] flex justify-center">
            <GitHubCalendar 
              username="jameshou28" 
              colorScheme="light"
              blockSize={14}
              blockMargin={5}
              fontSize={14}
              theme={{
                light: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a'],
                dark: ['#ebe8e4', '#a1ecd4', '#5ddca9', '#2ab989', '#00b87a']
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
