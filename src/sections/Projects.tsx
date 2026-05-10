import ProjectItem from "./ProjectItem";
import Link from "next/link";

const PROJECTS = [
  {
    title: "QPIN",
    problem: "People with mobility or accessibility needs struggle to perform simple hardware interactions. Traditional wearables are bulky or unintuitive.",
    solution: "A compact, wearable device that maps intuitive gestures to complex commands, bringing seamless interaction to users through custom hardware and firmware.",
    modelPath: "/models/qpin.glb",
    modelRotation: [-Math.PI/4, Math.PI, Math.PI] as [number, number, number],
    techStack: ["C++", "CAD", "PCB Design", "Embedded Systems"],
    category: "engineering",
  },
  {
    title: "VEX Robotics (4610Z)",
    problem: "Competition robotics requires high precision, rapid iteration, and flawless execution under strict constraints.",
    solution: "Engineered a custom competition robot with advanced kinematics and control systems, leading the 4610Z team through rigorous iterative design.",
    modelPath: "/models/qpin2.glb",
    techStack: ["Robotics", "Kinematics", "C++", "VEX V5"],
    reversed: true,
    category: "engineering",
  },
  {
    title: "WebAble",
    problem: "The web remains inaccessible for many users, and developers lack easy drop-in tools to verify and enforce accessibility standards.",
    solution: "Built WebAble to bridge the gap, providing a robust suite of accessibility web tools designed for seamless developer integration.",
    techStack: ["React", "Next.js", "Accessibility", "TypeScript"],
    placeholderType: "accessibility" as const,
    category: "programming",
  }
];

export default function Projects({ category }: { category: "engineering" | "programming" }) {
  const filteredProjects = PROJECTS.filter(p => p.category === category);
  
  const title = category === "engineering" 
    ? "Hardware & CAD" 
    : "Software & Web";

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
