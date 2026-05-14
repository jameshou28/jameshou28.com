import ProjectItem from "./ProjectItem";
import Link from "next/link";

const PROJECTS = [
  {
    title: "VEX Robotics (4610Z)",
    problem: "",
    solution: "Designed, programmed, and built robots for the VEX Robotics Competition. Led team to awards including:",
    modelPath: "/models/qpin2.glb",
    reversed: true,
    awards: [
      "2026 World Championship Innovate Award",
      "2026 Ranked 18th out of 6,800+ teams in Skills Challenge",
      "2026 NJ State Championship Excellence Award, State Finalist",
      "2025 World Championship Semifinalist",
      "2025 LAUNCH Signature Event (international) Design Award",
      "2024 World Championship Innovate Award",
      "2024 NJ State Championship State Champion, Design Award"
    ],
    additionalNote: {
      text: "Interviews viewed 80k+ times across all platforms",
      link: "https://www.youtube.com/watch?v=6TlJ-XfXd6U"
    },
    category: "engineering" as const,
    techStack: ["Fusion360", "Onshape", "C++", "Git"],
    gallery: [],
  },
  {
    title: "QPIN",
    problem: "",
    solution: "Co-Founder & CTO. Used Fusion 360 to design case for QPin, a wearable digital pin for advocacy and self-expression. Programmed software used on microcontrollers (ESP32).",
    modelPath: "/models/qpin.glb",
    modelRotation: [-Math.PI/4, Math.PI, Math.PI] as [number, number, number],
    techStack: ["C++", "CAD", "PCB Design", "Embedded Systems", "ESP32"],
    awards: ["Most Outstanding Company Award at Leangap Startup Incubator & Pitch Competition 2025"],
    category: "engineering" as const,
    gallery: [],
  },
  {
    title: "WebAble",
    problem: "",
    solution: "Chrome extension that uses DOM manipulation to allow users to better navigate any website.",
    techStack: ["HTML", "CSS", "JavaScript", "Chrome Extension API", "Git"],
    category: "programming" as const,
    gallery: [],
  },
  {
    title: "QPin Connect",
    problem: "",
    solution: "Built companion iOS app for QPIN, a wearable digital pin for advocacy and self-expression.",
    techStack: ["Swift", "BLE"],
    category: "programming" as const,
    gallery: [],
  },
  {
    title: "QPin Website",
    problem: "",
    solution: "Built website for QPin, a wearable digital pin for advocacy and self-expression.",
    techStack: ["HTML", "CSS", "JS", "Flask", "ThreeJS"],
    category: "programming" as const,
    gallery: [],
  }
];

export default function Projects({ category }: { category: "engineering" | "programming" }) {
  const filteredProjects = PROJECTS.filter(p => p.category === category);
  
  const title = category === "engineering" 
    ? "Engineering" 
    : "Programming";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-[var(--bg-primary)]">
      <div className="mb-12 flex justify-between items-end border-b border-[var(--border)] pb-8">
        <div>
          <h2 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Selected Work</h2>
          <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">{title}</h3>
        </div>
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors">
          &larr; Back to Home
        </Link>
      </div>
      
      <div className="flex flex-col space-y-12">
        {filteredProjects.map((project, idx) => (
          <ProjectItem key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
