# James Hou - Personal Website

My personal website

## Features

- **Interactive 3D models** — `.glb` models (VEX robot, QPin) rendered with React Three Fiber + Drei, with auto-rotating orbit controls and studio lighting.
- **Performance-aware rendering** — a `useDeviceCapability` hook lowers DPR and disables antialiasing on mobile / low-core devices to keep 3D smooth.
- **Scroll & entrance animation** — GSAP + ScrollTrigger drive the hero typewriter, staggered reveals, and parallax on featured cards.
- **Two project portfolios** — separate `/programming` and `/engineering` routes filtered from a single project dataset, each with tech stacks, awards, and a gallery modal.
- **Live GitHub activity** — contribution calendar via `react-github-calendar` on the programming page.
- **Polished UI touches** — custom cursor, site-wide particle background, a loading screen that preloads key assets, and a light editorial theme driven by CSS variables.
- **SEO & sharing** — per-page metadata, Open Graph / Twitter cards, JSON-LD `Person` structured data, `robots.ts`, and `sitemap.ts`.

## Tech Stack

| Area         | Tools                                                               |
| ------------ | ------------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| 3D           | [three](https://threejs.org), @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Animation    | [GSAP](https://gsap.com) (+ ScrollTrigger), @gsap/react             |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com), CSS variables, Space Grotesk + DM Sans |
| Icons / misc | lucide-react, react-github-calendar                                 |
| Deployment   | [Vercel](https://vercel.com)                                        |

## Project Structure

```
src/
├── app/                  # App Router routes
│   ├── layout.tsx        # Root layout: fonts, metadata, JSON-LD, global UI
│   ├── page.tsx          # Home (Hero + About)
│   ├── programming/      # Software & web portfolio
│   ├── engineering/      # Hardware & CAD portfolio
│   ├── contact/          # Contact page
│   ├── robots.ts         # robots.txt
│   └── sitemap.ts        # sitemap.xml
├── sections/             # Page sections (Hero, About, Experience, Projects, Contact)
├── components/
│   ├── 3d/               # Scene, ModelViewer, FloatingShapes, placeholder geometry
│   └── ui/               # Navbar, Footer, cursor, modal, loading screen, etc.
├── data/                 # portfolioAssets.ts — preload manifest
└── hooks/                # useDeviceCapability — adaptive rendering
public/
├── models/               # .glb 3D models
└── images/               # Project media (per-project folders)
```

---

Built by [James Hou](https://github.com/jameshou28).
