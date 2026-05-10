import ProjectItem from "./ProjectItem";

const PROJECTS = [
  {
    title: "QPIN",
    problem: "People with mobility or accessibility needs struggle to perform simple hardware interactions. Traditional wearables are bulky or unintuitive.",
    solution: "A compact, wearable device that maps intuitive gestures to complex commands, bringing seamless interaction to users through custom hardware and firmware.",
    modelPath: "/models/qpin.glb",
    modelRotation: [-Math.PI/4, Math.PI, Math.PI] as [number, number, number],
    techStack: ["C++", "CAD", "PCB Design", "Embedded Systems"],
  },
  {
    title: "VEX Robotics (4610Z)",
    problem: "Competition robotics requires high precision, rapid iteration, and flawless execution under strict constraints.",
    solution: "Engineered a custom competition robot with advanced kinematics and control systems, leading the 4610Z team through rigorous iterative design.",
    modelPath: "/models/qpin2.glb",
    techStack: ["Robotics", "Kinematics", "C++", "VEX V5"],
    reversed: true,
  },
  {
    title: "WebAble",
    problem: "The web remains inaccessible for many users, and developers lack easy drop-in tools to verify and enforce accessibility standards.",
    solution: "Built WebAble to bridge the gap, providing a robust suite of accessibility web tools designed for seamless developer integration.",
    techStack: ["React", "Next.js", "Accessibility", "TypeScript"],
    placeholderType: "accessibility" as const,
  }
];

export default function Projects() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24 bg-[var(--bg-primary)]">
      <div className="mb-12">
        <h2 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Selected Work</h2>
        <h3 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">Engineering What Matters</h3>
      </div>
      
      <div className="flex flex-col space-y-12">
        {PROJECTS.map((project, idx) => (
          <ProjectItem key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}
