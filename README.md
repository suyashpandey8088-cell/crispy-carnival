# Suyash Pandey — An Unfolding Story

A continuous scroll-controlled portfolio exhibition. Eight independent cinematic scenes share one persistent metallic 3D world. The scroll wheel—not elapsed time—is the animation clock.

## Run

Node.js 22+:

```bash
npm ci
npm run dev
```

Open http://localhost:3000. The server binds to `0.0.0.0` and accepts the Arena preview domain.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## The choreography

| Scene             | Scroll-controlled action                                                       |
| ----------------- | ------------------------------------------------------------------------------ |
| Awakening         | Sculpture illumination, camera approach, letter-by-letter name reveal          |
| Possibility       | Rotation → six separated metallic components → floating thoughts → reassembly  |
| Identity          | Travelling editorial words, scaled/rearranged typography, biography reveal     |
| Journey           | One pinned viewport, five horizontally travelling internship compositions      |
| Work              | Five full-viewport projects replace one another through scrubbed spatial wipes |
| Technical world   | Orbital structures, advancing camera, four technology constellations           |
| Beyond technology | Chess, badminton, books, creativity and leadership enter/leave in place        |
| Finale            | Sculpture recedes into darkness; an invitation replaces the opening statement  |

All major transitions use normalized GSAP timelines with `scrub: true`. Each scene pins for a viewport-relative duration, with shorter travel distances on mobile. The natural one-viewport hand-off between scenes maintains visual continuity through the fixed world; it does not introduce an empty spacer. There is no scroll snapping, forced auto-advance, or timed introduction gate.

## Code architecture

- **`components/cinematic/scenes/`** — eight independent reusable React scene components plus the common `SceneShell`.
- **`components/cinematic/director.ts`** — scoped GSAP match-media lifecycle, scene timelines, pin durations, horizontal track calculations, active-panel accessibility, Lenis integration, chapter navigation, deep-link restoration, and complete cleanup.
- **`components/cinematic/world-state.ts`** — a small mutable render bridge. Scene progress deterministically defines rotation, fragment separation, assembly, illumination, camera approach, and composition. No React state update on every scroll frame.
- **`components/cinematic/world-canvas.tsx`** — the one shared React Three Fiber canvas. Six procedural metallic parts, procedural reflections, and deterministic particles. No autonomous rotations, orbit controls, elapsed-time animation, or external HDR/model requests. `frameloop="demand"` invalidates only when the director publishes new scroll state; pixel ratio is capped at 1.
- **`components/cinematic/world-stage.tsx`** — lazy-loaded WebGL, failure boundary, and a compressed artwork fallback that also follows scroll transforms. The scene remains usable without WebGL.
- **`components/cinematic/experience.tsx`** — scene composition, persistent chapter navigation, and progress HUD.
- **`app/cinematic.css`** — responsive cinematic and reduced-motion compositions.
- **`components/portfolio.tsx`** — shared header, project visual studies, contact dialog, audio toggle, and detail-page footer.
- **`components/interactions.tsx`** — Framer Motion magnetic interactions and fine-pointer custom cursor only. The previous independent entrance-reveal runtime and timed loading gate have been removed.
- **`app/projects/[slug]/page.tsx`** — five statically rendered project-detail routes.

### Browser navigation

Natural document scrolling is preserved. Same-page chapter links resolve to the actual ScrollTrigger start, rather than a transformed element's current DOM offset. Modified clicks and external/project links retain their browser behavior. Hashes are restored after fonts/load, pin calculations, and `lenis.resize()`—not against the document's unpinned height. Refresh and back/forward navigation are supported.

Inactive overlapping project, technology, and interest panels are inert and hidden from accessibility APIs; active panels are keyboard navigable. Numbered controls provide alternatives to long scrolling sequences. Reduced-motion mode removes all pins, scrub transforms, the live canvas, and smooth scrolling and shows every entry in readable document order. Switching the preference at runtime tears down/recreates the appropriate experience.

## Editing content

**`lib/content.ts` is the content source of truth:**

- `personal`: name, discipline, introduction, interests, email, social URLs, availability, achievements.
- `experiences`: the five user-confirmed roles; companies, dates, actual responsibilities, and achievements remain unset.
- `projects`: editorial title, proposed scope, technologies, features, architecture, verification note, GitHub/demo URLs, and visual direction.
- `skillGroups`: editable user-supplied skills and descriptions—not proficiency ratings.
- `interests`: personal-interest studies.

Before publishing as a verified professional portfolio:

1. Supply verified email and social profiles. Until then, the contact dialog transparently explains their absence; no fabricated destination is used.
2. Add real internship company names, dates, responsibilities, and achievements.
3. Replace proposed project scope with verified implementation details, source/demo URLs, real screenshots, and measured results.
4. Review project status labels and dates. No achievements, accuracy metrics, or deployment URLs have been invented.
5. Add a production canonical URL and review metadata in `app/layout.tsx`.

Current project imagery is original editorial artwork, not a product screenshot. The two compressed WebP artworks total approximately 216 KB before Next.js image optimization. The supplied reference photographs are not used as website assets. Fonts are self-hosted. Ambient audio is synthesized locally, silent by default, and requires explicit opt-in.

## Browser verification

```bash
npx playwright install --with-deps chromium
npm test
```

The configuration starts or reuses the app server. A system Chromium can be supplied through `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`.

Playwright covers desktop (1440px), tablet (820px), mobile (390px), and reduced motion:

- Every scene scrubbed forward and backward at measured progress points.
- All eight pins and their natural releases/hand-offs, with no blank gaps.
- Every horizontal internship and every full-screen project.
- Chapter links, direct hashes, refresh, browser back, and overflow.
- All project-detail routes and an unknown-project 404.
- Technology descriptions, modal contact interaction, and opt-in audio.
- Automated axe WCAG A/AA checks on the readable reduced-motion experience.
- A desktop WebGL smoke test verifies one canvas, camera movement, component separation/reassembly, and a stable camera when scrolling stops.
- Native wheel/touch scrolling and runtime reduced-motion teardown/recreation.

Automated checks complement—not replace—real-device accessibility and GPU/performance review. Software-rendered headless Chromium is useful for correctness, not a claim of real-device frame rates. Build output, test artifacts, screenshots, and browser binaries are not committed.
