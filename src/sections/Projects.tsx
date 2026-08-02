import ProjectItem from "./ProjectItem";
import type { ProjectLink } from "./ProjectItem";
import Link from "next/link";
import GithubGraph from "@/components/ui/GithubGraph";

const PROJECTS = [
  {
    title: "Long Exposures iOS App",
    problem: "",
    solution: "An iOS app that turns your Live Photos and videos into real long-exposure shots. Pick a frame range, choose a blend mode, and get motion blur or light trails without a tripod.",
    techStack: ["Swift", "SwiftUI", "Metal"],
    category: "programming" as const,
    imagePath: "/images/long-exposures/LE_cover.png",
    gallery: [
      { type: "image" as const, src: "/images/long-exposures/LE_cover.png" },
      { type: "video" as const, src: "https://cdn.hackclub.com/019fbffd-d8b7-7fc4-9dc2-a66c07bdc3fa/demo.mp4", caption: "App walkthrough" },
      { type: "video" as const, src: "/images/long-exposures/l-e.mp4", caption: "Long exposure result" },
      { type: "image" as const, src: "/images/long-exposures/l-e.webp" },
      { type: "image" as const, src: "/images/long-exposures/le-website.png", caption: "Landing page" },
    ],
    links: [
      { type: "website", url: "https://long-exposures.vercel.app/" } as ProjectLink,
      { type: "github", url: "https://github.com/jameshou28/long-exposures" } as ProjectLink,
    ],
  },
  {
    title: "VEX Robotics (4610Z)",
    problem: "",
    solution: "Designed, programmed, and built robots for the VEX Robotics Competition. Led the team to awards including:",
    modelPath: "/models/vex.glb",
    modelScale: 0.05,
    fallbackImagePath: "/images/vex/pb2.jpeg",
    reversed: true,
    awards: [
      "2026 World Championship Innovate Award",
      "2026 Skills Challenge: Ranked 18th of 6,800+ teams",
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
    gallery: [
      { type: "image" as const, src: "/images/vex/pb2.jpeg" },
      { type: "image" as const, src: "/images/vex/hst1.jpeg" },
      { type: "image" as const, src: "/images/vex/ou1.jpeg" },
      { type: "image" as const, src: "/images/vex/pb1.jpg" },
      { type: "image" as const, src: "/images/vex/pb3.jpg" },
    ],
    links: [
      { type: "custom", url: "https://events.vex.com/teams/v5rc/4610Z", label: "Team Page" } as ProjectLink,
      { type: "custom", url: "https://www.youtube.com/watch?v=6TlJ-XfXd6U", label: "YouTube" } as ProjectLink,
    ],
  },
  {
    title: "QPIN",
    problem: "",
    solution: "Co-Founder & CTO. Used Fusion 360 to design a case for QPin, a wearable digital pin for advocacy and self-expression. Programmed the firmware running on the ESP32 microcontroller.",
    modelPath: "/models/qpin.glb",
    modelRotation: [-Math.PI/4, Math.PI/2, Math.PI/4] as [number, number, number],
    fallbackImagePath: "/images/qpin/qpinRender3.png",
    techStack: ["Python", "ESP32", "Arduino", "PlatformIO", "Fusion360", "Git"],
    awards: ["Most Outstanding Company Award at Leangap Startup Incubator & Pitch Competition 2025"],
    category: "engineering" as const,
    gallery: [
      { type: "image" as const, src: "/images/qpin/Pin1.jpg" },
      { type: "image" as const, src: "/images/qpin/Pin2.jpg" },
      { type: "image" as const, src: "/images/qpin/qpinRender3.png" },
      { type: "video" as const, src: "/images/qpin/GIFDisplay.mp4", caption: "QPin display demo" },
    ],
    links: [
      { type: "website", url: "https://www.wearqpin.com" } as ProjectLink
    ],
  },
  {
    title: "WebAble",
    problem: "",
    solution: "A Chrome extension that improves web accessibility for users with dyslexia. Injects custom CSS (line spacing, letter spacing, dyslexia-friendly fonts) via DOM manipulation.",
    techStack: ["HTML", "CSS", "JavaScript", "Chrome Extension API", "Git"],
    category: "programming" as const,
    imagePath: "/images/webAble/main.png",
    gallery: [
      { type: "image" as const, src: "/images/webAble/main.png" },
      { type: "image" as const, src: "/images/webAble/ex1.png" },
      { type: "image" as const, src: "/images/webAble/ex2.png" },
      { type: "image" as const, src: "/images/webAble/ex3.png" },
    ],
    links: [
      { type: "github", url: "https://github.com/jameshou28/WebAble" } as ProjectLink,
    ],
  }, 
  {
    title: "QPin Connect",
    problem: "",
    solution: "An iOS and Android companion app for QPin. Uses BLE to connect with the ESP32 microcontroller and control what displays on the wearable pin.",
    techStack: ["Swift", "SwiftUI", "BLE", "Kotlin", "Android", "Git"],
    category: "programming" as const,
    imagePath: "/images/QPinConnect/ex1.jpg",
    gallery: [
      { type: "image" as const, src: "/images/QPinConnect/ex1.jpg" },
      { type: "image" as const, src: "/images/QPinConnect/ex2.jpg" },
    ],
    links: [
      { type: "custom", label: "App Store", url: "https://apps.apple.com/us/app/qpin-connect/id6749499794" } as ProjectLink,
    ], 
  },
  { 
    title: "TechShare Project Website",
    problem: "",
    solution: "Built website for the TechShare Project, a STEM Education non-profit that I lead. ",
    techStack: ["TypeScript", "Next.JS", "Vercel", "Git"],
    category: "programming" as const, 
    imagePath: "/techshare/hero.png",
    gallery: [
      { type: "image" as const, src: "/images/techshare/p1.png" },
      { type: "image" as const, src: "/images/techshare/p2.png" },
      { type: "image" as const, src: "/images/techshare/p3.png" },
      { type: "image" as const, src: "/images/techshare/p4.png" },
      { type: "image" as const, src: "/images/techshare/p5.png" },
    ],
    links: [
      { type: "website", url: "https://techshareproject.org" } as ProjectLink,
    ],
  }
  // { 
  //   title: "QPin Website",
  //   problem: "",
  //   // solution: "Built website for QPin, a wearable digital pin for advocacy and self-expression.",
  //   solution: "A marketing and product site for QPin. Built with Flask and ThreeJS to showcase the wearable pin and drive App Store downloads.",
  //   techStack: ["HTML", "CSS", "JS", "Flask", "ThreeJS", "Git"],
  //   category: "programming" as const, 
  //   imagePath: "/images/qpinWeb/ss1.png",
  //   gallery: [
  //     { type: "image" as const, src: "/images/qpinWeb/ss1.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss2.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss3.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss4.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss5.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss6.png" },
  //     { type: "image" as const, src: "/images/qpinWeb/ss7.png" },
  //   ],
  //   links: [
  //     { type: "website", url: "https://wearqpin.com" } as ProjectLink,
  //   ],
  // }
];

export default function Projects({ category }: { category: "engineering" | "programming" }) {
  const filteredProjects = PROJECTS.filter(p => p.category === category);
  
  const title = category === "engineering" 
    ? "Engineering" 
    : "Programming";

  const description = category === "engineering"
    ? "I design and build physical systems, from competition robots to wearable hardware. Most projects involve both CAD and embedded programming."
    : "I build software to solve real problems, including accessibility tools, websites, and apps. I also do competitive programming and compete in USACO Gold.";

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end border-b border-[var(--border)] pb-8 gap-6">
        <div className="max-w-2xl">
          <h2 className="text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold mb-2">Selected Work</h2>
          <h1 className="text-4xl md:text-5xl font-[family-name:var(--font-display)] font-bold text-[var(--text-primary)]">
            {title}
          </h1>
        </div>
        <Link href="/" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors shrink-0">
          &larr; Back to Home
        </Link>
      </div>

      <div className="mb-12 max-w-3xl">
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed">{description}</p>
      </div>
      
      {category === "programming" && (
        <div className="mb-16">
          <div className="mb-6 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 text-sm uppercase tracking-wider text-[var(--text-secondary)] font-semibold">
              <span>GitHub Activity</span>
              <a
                href="https://github.com/jameshou28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors underline decoration-[var(--border)] underline-offset-4 hover:decoration-[var(--accent)]"
              >
                jameshou28
              </a>
            </div>
          </div>
          <GithubGraph />
        </div>
      )}

      <div className="flex flex-col space-y-6">
        {filteredProjects.map((project, idx) => (
          <ProjectItem key={idx} {...project} />
        ))}
      </div>
    </section>
  );
}