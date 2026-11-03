# The Architecture of Intelligence

A cinematic personal exhibition for Suyash Pandey. Built with Next.js App Router, React, TypeScript, Tailwind CSS, GSAP/ScrollTrigger, Framer Motion, Lenis, Three.js, React Three Fiber, Drei, and Lucide.

## Run locally

Requires Node.js 22+.

```bash
npm install
npm run dev
```

Open http://localhost:3000. The development server listens on `0.0.0.0` and accepts the Arena preview domain. Fonts are self-hosted; there are no external font, image, environment-map, or audio requests.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Edit the exhibition

**`lib/content.ts` is the content source of truth.**

- `personal`: name, discipline, location, availability, introduction, interests, email, social profiles, and achievements.
- `experiences`: five user-confirmed internship roles. Company, dates, responsibilities, and achievements are intentionally unset.
- `projects`: project concepts, descriptions, proposed toolkits, features, architecture steps, result verification notes, GitHub/demo URLs, and visual direction. Each entry generates its own statically rendered detail route.
- `skillGroups`: user-supplied editable technologies and descriptions; this is not a proficiency rating.
- `interests`: the four editorial personal-interest studies.
- `navigation`: exhibition navigation destinations.

### Before publishing as a verified portfolio

1. Add a real `personal.email` and verified social URLs. Until then, contact opens a transparent explanation and no fake email or social destination is shown.
2. Fill in the internship companies, dates, actual responsibilities, and achievements. The role descriptions are editorial framing, not claims about particular employers.
3. Replace each project's proposed scope with its actual implementation. Add genuine GitHub/demo URLs and measured results only when available. `null` links display non-clickable pending labels.
4. Add actual product screenshots to project-detail pages. The current project imagery is original editorial artwork, explicitly identified as such—not product screenshots.
5. Review project status/year labels. No project dates, accuracy scores, or achievements have been invented.
6. Update metadata in `app/layout.tsx` and add a canonical production URL once known.

## Experience architecture

- `components/portfolio.tsx`: responsive exhibition chapters, shared navigation/footer, project artwork, interactive archive, skills, native contact dialog, and opt-in ambient audio.
- `components/interactions.tsx`: short skippable/session-aware opening, Lenis integration, scoped GSAP reveals/pinning, pointer-aware cursor, and magnetic interactions. Animation and event listeners are cleaned up on unmount.
- `components/sculpture.tsx`: dynamically imported procedural metallic torus-knot study, procedural reflection environment, particles, pointer/scroll response, and orbit controls. No external 3D models or HDR maps.
- `app/projects/[slug]/page.tsx`: five statically generated project-detail routes with architecture diagrams and verification notes.
- `app/globals.css`: editorial design system and desktop/tablet/mobile compositions.

### Performance and fallback decisions

The initial hero uses a compressed original sculpture artwork. Live WebGL is **explicitly opt-in** via “Explore the form,” not downloaded until requested, and is unmounted when off-screen. This is deliberate: mobile visitors and lower-powered devices should receive the same visual identity without paying for a permanent WebGL render loop. If WebGL is unavailable, the still artwork remains and an explanation appears.

The canvas caps pixel ratio at 1.5, uses a procedural mesh, a small particle budget, and a low-resolution procedural environment. The two original generated WebP artworks total approximately 216 KB before Next.js image optimization. They take inspiration from the visual direction, not the supplied reference photographs themselves.

Reduced-motion preferences disable smooth scrolling, pinned GSAP sequences, CSS rotation, the intro, and the custom cursor. Touch devices keep their native cursor and use buttons for skill descriptions and archive entries. Ambient audio is synthesized locally with Web Audio and starts only after explicit opt-in. The contact dialog supports Escape, native modal focus management, and background-scroll locking.

## Browser tests

```bash
npx playwright install --with-deps chromium
npm test
```

The Playwright configuration starts or reuses the development server. Tests cover desktop (1440px), tablet (820px), mobile (390px), and reduced motion: chapter presence, gallery expansion, project navigation, all five detail routes, 404s, overflow, mobile navigation, archive controls, skill descriptions, contact dismissal, and opt-in audio. Automated axe WCAG A/AA scans run on the exhibition and a case study. A desktop-only smoke test checks the opening and optional WebGL lifecycle.

A system Chromium can be used with `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. No screenshots, browser binaries, test artifacts, or build output are committed.

Automated checks complement—not replace—manual accessibility, visual, and real-device performance review. Live WebGL appearance and frame rate depend on the visitor's GPU.
