# James Hou - Personal Website

My personal website and portfolio!

## Features

- Interactive 3D models: `.glb` models rendered with React Three Fiber + Drei. Also has auto-rotating orbit controls and studio lighting.
- Performance-aware rendering: a `useDeviceCapability` hook lowers DPR and disables antialiasing on phones.
- Scroll & entrance animation: GSAP + ScrollTrigger for hero typewriter, reveals, and parallax.
- Project portfolios: separate `/programming` and `/engineering` routes, each with projects, awards, and gallery modals.
- Live GitHub activity: Live GitHub contribution calendar in my programming portfolio.
- Extra UI elements: custom cursor, particle background, and a loading screen to preload assets.

## Tech Stack

| Area         | Tools                                                               |
| ------------ | ------------------------------------------------------------------- |
| Framework    | [Next.js 16](https://nextjs.org) (App Router), React 19, TypeScript |
| 3D           | [three](https://threejs.org), @react-three/fiber, @react-three/drei, @react-three/postprocessing |
| Animation    | [GSAP](https://gsap.com) (+ ScrollTrigger), @gsap/react             |
| Styling      | [Tailwind CSS v4](https://tailwindcss.com), CSS variables, Space Grotesk + DM Sans |
| Icons/misc   | lucide-react, react-github-calendar                                 |
| Deployment   | [Vercel](https://vercel.com)                                        |

---

Built by [James Hou](https://github.com/jameshou28).
