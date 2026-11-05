# SUYASH PANDEY® — THE INTERNET IS MY CANVAS.

A loud, neo-maximalist portfolio: Y2K chrome, brutalist windows, acid-lime posters, experimental type, comic cutouts, and seven genuinely scroll-controlled environments. Built with Next.js App Router, TypeScript, GSAP ScrollTrigger, Lenis, React Three Fiber / Three.js / Drei, Framer Motion, Tailwind and custom CSS.

## Run

Node.js 22+:

```bash
npm ci
npm run dev
```

The server binds to `0.0.0.0` and accepts the Arena preview origin. Browser code uses relative URLs; no browser-facing localhost API dependencies or external font services.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

## Seven scenes, one scroll clock

| Scene | Environment | Scroll choreography |
| --- | --- | --- |
| My canvas | Electric lime, oversized Anton, inflated chrome, stickers | Words split and scatter, sculptures zoom/rotate, seal and tape travel |
| The human glitch | Cobalt, orange cutout star, editorial profile window | Independent type travel and scale, window rearrangement, 3D rotation |
| Experience archive | Purple, silver, acid-yellow files | A pinned vertical-controlled horizontal track reveals all five roles |
| Project multiverse | Five distinct, full-screen visual universes | Reversible spatial wipes, layered terminal/chart/document/browser artwork |
| Technical playground | Orange to cyan, chrome gyroscope, raw orbit lines | Four replacing tool groups, expanding geometry, hover/focus/touch explanations |
| Other side of my brain | Pink comic zine, halftone, paper stack | Individually rotated panels physically leave the stack as the next is revealed |
| Grand finale | Orange to lime, checkerboard, explosive typography | Opening statement blows apart; invitation and animated signature take over |

The wheel/touch position controls animation time, including reversals. No automatic slide timers, scroll trapping, forced waits, or keyboard hijacking. Lenis runs on the GSAP ticker. Each timeline is independently pinned and scoped, while a global position synchronizer handles active/inert states, viewport handoffs and 3D blending deterministically. Hash links, refreshes, and browser history are supported. Layout resources settle before pin offsets and deep links are restored.

## Architecture and editing

- `lib/content.ts`: personal copy, contact details, internships, projects, skills and interests. **Unverified employers, dates, responsibilities, achievements, email, social URLs and project links remain explicitly absent.** Add real information here; never invent outcomes or metrics.
- `lib/art-direction.ts`: chapter order, duration, palette, creative copy and project-universe themes. Experience/project durations scale with the content arrays.
- `components/cinematic/scenes/`: seven independent compositions.
- `components/cinematic/director.ts`: scroll choreography, horizontal travel, panel accessibility, deep-link/history handling and complete cleanup.
- `components/cinematic/world-state.ts`: mutable scroll/camera/background state, cross-scene blending and pointer influence; no React state updates per frame.
- `components/cinematic/world-stage.tsx` / `world-canvas.tsx`: one shared, dynamically imported, **demand-rendered** procedural chrome world. DPR is capped at 1, antialiasing is disabled, and hidden-world scroll changes do not render frames. No additional WebGL probe/context.
- `components/navigation/floating-navigation.tsx`: compact floating controls and a native modal navigation overlay, with focus management, Escape dismissal, reduced-motion support and custom wipe transitions.
- `components/cinematic/project-artwork.tsx`: five different responsive editorial illustrations, not pretend product screenshots.
- `app/projects/[slug]/page.tsx`: statically generated, data-driven project detail pages with overview, problem, proposed solution/features, architecture, toolkit and honest link/verification states.
- `app/cinematic.css`: maximalist scene compositions; mobile is separately art-directed rather than a reduced desktop canvas.
- `app/globals.css`: shared graphics, dialogs, navigation, project artwork and detail routes.

To add an internship, append to `experiences` and supply verified fields; the horizontal track, controls and scroll length derive from the count. To add a project, append a `Project`, choose one of the supported `visual` universes (or add another artwork/theme), and the project panels, route generation and controls update automatically.

## Accessibility and progressive enhancement

Reduced motion removes all pins and 3D, exposes every internship/project/tool group and lays out the comic as readable content. The same content-first CSS is the no-JavaScript baseline. Touch devices retain a native cursor and natural vertical pan. The custom cursor is fine-pointer only. Interactive chrome responds to keyboard and touch; skill descriptions respond to hover, focus and click. Inactive panels are inert. Dialogs use the browser top layer, trap focus natively, dismiss with Escape and return focus to the trigger. Audio is optional and **off by default**. No unverifiable external link is presented as functional.

The original AI-generated chrome asterisk was optimized to a transparent 125 KB WebP. Fonts are bundled locally. Project artwork uses lightweight CSS/SVG rather than large image/video downloads. The reflective 3D sculpture has procedural geometry and a small generated environment, with a static chrome fallback when WebGL is unavailable. Do not interpret software-rendered browser tests as a real-device FPS benchmark.

## Browser QA

```bash
npx playwright install chromium  # standard development environment
npm test
```

`playwright.config.mts` covers desktop, touch tablet, touch mobile and reduced motion. If using a preinstalled Chromium, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Tests cover all seven scene clocks forward/reverse, pin release and handoff geometry, five horizontal internships and five replacing projects, hashes/history/reload, project detail routes/404, skills, contact, audio, the single demand-rendered world, native wheel/touch input, motion-preference teardown, the modal menu/focus return, interactive chrome and axe accessibility scans. GPU-only / pinned-scene cases are intentionally skipped on inappropriate profiles.

Production dependency audit: `npm audit --omit=dev` reports zero vulnerabilities at implementation time. Development-only audit advisories should be evaluated separately; no forced breaking dependency upgrades are applied.
