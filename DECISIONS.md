# Design & Technical Decisions

## Phase 1: Scaffold
- **Framework:** Next.js 14 App Router. Chosen for SSR capabilities, route grouping, and robust ecosystem.
- **Styling:** Tailwind CSS 3. Chosen for utility-first styling and easy design system token management.
- **Aesthetic:** Bright Studio Gallery (`#f5f3f0` background, deep mint accent). Shifted from dark mode to provide a cleaner, editorial exhibition vibe.
- **3D Ecosystem:** React Three Fiber (R3F), Drei, Postprocessing. Chosen for declarative WebGL management and rich component ecosystem.
- **Animation:** GSAP + ScrollTrigger for HTML elements. R3F `useFrame` for 3D elements. Chosen because GSAP handles scroll-synced stagger animations better than Framer Motion for complex DOM trees.
- **Folder Structure:** Moved `app` to `src/app` for cleaner root directory separation.
