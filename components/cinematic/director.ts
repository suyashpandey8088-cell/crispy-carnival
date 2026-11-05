"use client";
import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import { chapters, directWorld, blendWorld } from "./world-state";

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
let scrollToChapter:
  ((id: string, progress: number, immediate?: boolean) => void) | null = null;
export function goToSceneProgress(id: string, progress = 0) {
  if (scrollToChapter) scrollToChapter(id, progress);
  else {
    const scene = document.getElementById(id);
    const panels = scene?.querySelectorAll<HTMLElement>("[data-panel]");
    const target = panels?.length
      ? panels[Math.round(progress * (panels.length - 1))]
      : scene;
    target?.scrollIntoView({ behavior: "auto", block: "start" });
  }
}
function panelAccess(root: HTMLElement, index: number, panelSelector: string) {
  root.querySelectorAll<HTMLElement>(panelSelector).forEach((panel, i) => {
    panel.inert = i !== index;
    panel.setAttribute("aria-hidden", String(i !== index));
  });
}
function dissolve(tl: gsap.core.Timeline, root: HTMLElement, selector: string) {
  const panels = gsap.utils.toArray<HTMLElement>(
    root.querySelectorAll(selector),
  );
  gsap.set(panels.slice(1), {
    autoAlpha: 0,
    yPercent: 15,
    scale: 1.07,
    clipPath: "inset(100% 0% 0% 0%)",
  });
  panels.forEach((panel, i) => {
    if (!i) return;
    const at = (i - 0.42) / (panels.length - 1);
    const duration = 0.4 / (panels.length - 1);
    tl.to(
      panels[i - 1],
      { autoAlpha: 0, scale: 0.94, yPercent: -8, duration },
      at,
    ).to(
      panel,
      {
        autoAlpha: 1,
        scale: 1,
        yPercent: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        duration,
      },
      at,
    );
  });
}
function choreography(
  index: number,
  root: HTMLElement,
  tl: gsap.core.Timeline,
) {
  const q = (selector: string) => root.querySelectorAll(selector);
  switch (index) {
    case 0:
      tl.to(
        q(".canvas-word"),
        {
          xPercent: (i) => (i % 2 ? 35 : -45),
          yPercent: (i) => (i % 2 ? -20 : 20),
          rotation: (i) => (i % 2 ? 8 : -8),
          scaleX: 1.15,
          stagger: 0.035,
          duration: 0.62,
        },
        0.25,
      )
        .to(
          q(".opening-chrome"),
          {
            xPercent: 40,
            yPercent: -25,
            rotation: 95,
            scale: 1.4,
            duration: 1,
          },
          0,
        )
        .to(
          q(".opening-smiley"),
          { xPercent: -150, yPercent: -150, rotation: -120, duration: 1 },
          0,
        )
        .to(
          q(".creative-sticker"),
          { rotation: -25, yPercent: 55, duration: 1 },
          0,
        )
        .to(
          q(".opening-seal"),
          { rotation: 240, yPercent: -80, duration: 1 },
          0,
        )
        .to(q(".opening-profile"), { yPercent: -20, duration: 1 }, 0);
      break;
    case 1:
      tl.fromTo(
        q(".identity-line"),
        { xPercent: (i) => (i % 2 ? 22 : -7) },
        { xPercent: 0, stagger: 0.08, duration: 0.35 },
        0,
      )
        .to(
          q(".identity-headline"),
          { scale: 0.78, xPercent: -3, yPercent: -8, duration: 0.32 },
          0.35,
        )
        .fromTo(
          q(".identity-window"),
          { yPercent: 55, rotation: 12, autoAlpha: 0 },
          { yPercent: 0, rotation: -4, autoAlpha: 1, duration: 0.35 },
          0.35,
        )
        .to(
          q(".identity-chrome"),
          { rotation: 120, xPercent: 30, scale: 1.2, duration: 1 },
          0,
        )
        .to(
          q(".identity-burst"),
          { rotation: -100, scale: 1.3, duration: 1 },
          0,
        );
      break;
    case 2: {
      const track = root.querySelector<HTMLElement>(".journey-track")!;
      tl.to(
        track,
        { x: () => -(track.scrollWidth - root.clientWidth), duration: 1 },
        0,
      )
        .to(q(".journey-bottom-line span"), { scaleX: 1, duration: 1 }, 0)
        .to(q(".journey-number"), { rotation: -8, duration: 1 }, 0)
        .to(q(".journey-burst"), { rotation: 180, duration: 1 }, 0);
      break;
    }
    case 3:
      dissolve(tl, root, ".work-panel");
      const panels = Array.from(root.querySelectorAll(".work-panel"));
      panels.forEach((panel, i) => {
        const at = i / panels.length,
          duration = 1 / panels.length;
        tl.fromTo(
          panel.querySelectorAll(".art-pane"),
          { yPercent: 9, rotation: -4 },
          { yPercent: -8, rotation: 3, stagger: 0.025, duration },
          at,
        );
      });
      break;
    case 4:
      dissolve(tl, root, ".tech-panel");
      tl.to(q(".tech-orbit-one"), { rotation: 190, scale: 1.4, duration: 1 }, 0)
        .to(
          q(".tech-orbit-two"),
          { rotation: -150, scale: 0.8, duration: 1 },
          0,
        )
        .to(q(".tech-burst"), { rotation: 220, duration: 1 }, 0)
        .to(
          q(".technology-heading"),
          { skewX: -6, xPercent: -5, duration: 1 },
          0,
        );
      break;
    case 5: {
      const cards = Array.from(
        root.querySelectorAll<HTMLElement>(".personal-panel"),
      );
      cards.forEach((card, i) => {
        gsap.set(card, { zIndex: cards.length - i });
        if (i < cards.length - 1)
          tl.to(
            card,
            {
              xPercent: -155,
              yPercent: -90,
              rotation: -42,
              scale: 0.8,
              duration: 0.35 / (cards.length - 1),
            },
            (i + 0.6) / (cards.length - 1),
          );
      });
      tl.to(q(".personal-burst"), { rotation: 200, duration: 1 }, 0);
      break;
    }
    case 6:
      gsap.set(q(".final-invitation"), { autoAlpha: 0, yPercent: 35 });
      tl.to(
        q(".final-first"),
        { scale: 2.5, rotation: -8, autoAlpha: 0, duration: 0.28 },
        0.18,
      )
        .to(
          q(".final-invitation"),
          { autoAlpha: 1, yPercent: 0, duration: 0.3 },
          0.42,
        )
        .fromTo(
          q(".final-signature > span"),
          { yPercent: 130 },
          { yPercent: 0, stagger: 0.008, duration: 0.15 },
          0.7,
        )
        .to(
          q(".final-chrome"),
          { rotation: 180, yPercent: 25, scale: 0.8, duration: 1 },
          0,
        )
        .to(q(".final-seal"), { rotation: 200, duration: 1 }, 0);
      break;
  }
  const marquees = q(".marquee-inner");
  if (marquees.length) tl.to(marquees, { xPercent: -25, duration: 1 }, 0);
  tl.to({}, { duration: 0.001 }, 0.999);
}
export function useCinematicDirector(
  container: React.RefObject<HTMLDivElement | null>,
) {
  useLayoutEffect(() => {
    if (!container.current) return;
    const host = container.current;
    const media = gsap.matchMedia();
    let disposed = false;
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        const reduced = !!context.conditions?.reduced;
        host.dataset.motion = reduced ? "reduced" : "full";
        if (reduced) {
          directWorld(0, 0.4);
          // The readable path also waits for typography before exposing layout as ready.
          // Otherwise a late local font can move a native link during a click/scroll.
          let alive = true;
          let frame = 0;
          document.fonts.ready.then(() => {
            if (!alive) return;
            frame = requestAnimationFrame(() => {
              if (alive) host.dataset.ready = "true";
            });
          });
          return () => {
            alive = false;
            cancelAnimationFrame(frame);
          };
        }
        let active = true;
        const previousRestoration = history.scrollRestoration;
        history.scrollRestoration = "manual";
        const lenis = new Lenis({
          duration: 0.85,
          smoothWheel: true,
          syncTouch: false,
        });
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        lenis.on("scroll", ScrollTrigger.update);
        const scenes = Array.from(
          host.querySelectorAll<HTMLElement>(".cinema-scene[data-scene]"),
        );
        const controllers = new Map<string, ScrollTrigger>();
        let current = -1;
        const activate = (index: number) => {
          if (index === current) return;
          current = index;
          scenes.forEach((scene, i) => {
            scene.inert = i !== index;
          });
          host
            .querySelectorAll<HTMLElement>(".chapter-link")
            .forEach((link, i) => {
              link.setAttribute("aria-current", i === index ? "step" : "false");
            });
          host
            .querySelectorAll(".hud-chapter, .nav-scene-name")
            .forEach((name) => {
              name.textContent = `${String(index + 1).padStart(2, "0")} / ${chapters[index].title.toUpperCase()}`;
            });
        };
        const updates: ((progress: number) => void)[] = [];
        scenes.forEach((root, index) => {
          const chapter = chapters[index];
          const panelSelector =
            index === 2
              ? ".journey-panel"
              : index === 3
                ? ".work-panel"
                : index === 4
                  ? ".tech-panel"
                  : ".personal-panel";
          const count = root.querySelectorAll(panelSelector).length;
          const update = (progress: number) => {
            activate(index);
            directWorld(index, progress);
            root.dataset.progress = progress.toFixed(4);
            const panel = Math.min(
              count - 1,
              index === 2
                ? Math.round(progress * Math.max(0, count - 1))
                : Math.floor(progress * Math.max(0, count - 1) + 0.12),
            );
            if (count) {
              panelAccess(root, panel, panelSelector);
              root.dataset.activePanel = String(panel);
              root
                .querySelectorAll(
                  ".journey-tick, .work-dot, .tech-nav, .personal-nav",
                )
                .forEach((button, i) =>
                  button.setAttribute("aria-pressed", String(i === panel)),
                );
            }
            if (index === 6) {
              const invitation =
                root.querySelector<HTMLElement>(".final-invitation");
              if (invitation) invitation.inert = progress < 0.5;
            }
            const hud = host.querySelector<HTMLElement>(".hud-scene-progress");
            if (hud) hud.style.transform = `scaleX(${progress})`;
          };
          updates.push(update);
          const timeline = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
              id: chapter.id,
              trigger: root,
              start: "top top",
              end: () =>
                `+=${Math.round(innerHeight * chapter.length * (innerWidth < 760 ? 0.7 : 1))}`,
              pin: true,
              scrub: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
              onRefresh: (self) => {
                root.dataset.scrollStart = String(self.start);
                root.dataset.scrollEnd = String(self.end);
              },
            },
          });
          choreography(index, root, timeline);
          controllers.set(chapter.id, timeline.scrollTrigger!);
        });
        const sync = () => {
          const y = window.scrollY;
          let index = 0;
          chapters.forEach((chapter, i) => {
            if (y >= controllers.get(chapter.id)!.start) index = i;
          });
          const controller = controllers.get(chapters[index].id)!;
          const start = Number(controller.start) || 0;
          const end = Number(controller.end) || start + 1;
          const progress = Math.max(
            0,
            Math.min(1, (y - start) / Math.max(1, end - start)),
          );
          updates[index](progress);
          const next =
            chapters[index + 1] && controllers.get(chapters[index + 1].id);
          if (next && y > end && next.start > end)
            blendWorld(index + 1, (y - end) / (next.start - end));
        };
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: sync,
          onRefresh: sync,
        });
        const jump = (id: string, progress: number, immediate = false) => {
          const controller = controllers.get(id);
          if (!controller) return;
          const value =
            controller.start +
            (controller.end - controller.start) *
              Math.max(0.002, Math.min(0.998, progress));
          lenis.scrollTo(value, {
            immediate,
            duration: immediate ? 0 : 0.9,
            onComplete: sync,
          });
          if (immediate) {
            ScrollTrigger.update();
            sync();
          }
        };
        scrollToChapter = jump;
        const navigate = (event: MouseEvent) => {
          if (
            event.button !== 0 ||
            event.metaKey ||
            event.ctrlKey ||
            event.shiftKey ||
            event.altKey
          )
            return;
          const anchor = (
            event.target as HTMLElement
          ).closest<HTMLAnchorElement>("a[href]");
          if (!anchor || anchor.target || anchor.hasAttribute("download"))
            return;
          const url = new URL(anchor.href, location.href);
          if (
            url.origin !== location.origin ||
            url.pathname !== "/" ||
            !url.hash
          )
            return;
          const id = decodeURIComponent(url.hash.slice(1));
          if (!controllers.has(id)) return;
          event.preventDefault();
          if (location.hash !== url.hash) history.pushState(null, "", url.hash);
          jump(id, 0);
        };
        const restore = () => {
          const id = decodeURIComponent(location.hash.slice(1));
          if (controllers.has(id)) jump(id, 0, true);
        };
        document.addEventListener("click", navigate, true);
        window.addEventListener("hashchange", restore);
        window.addEventListener("popstate", restore);
        const refresh = () => {
          if (disposed || !active) return;
          ScrollTrigger.refresh();
          lenis.resize();
          restore();
          sync();
          host.dataset.ready = "true";
        };
        // Wait for real layout resources, not arbitrary animation timers. This prevents
        // hash restoration against partially calculated pin-spacer offsets.
        const loaded =
          document.readyState === "complete"
            ? Promise.resolve()
            : new Promise<void>((resolve) =>
                window.addEventListener("load", () => resolve(), {
                  once: true,
                }),
              );
        let firstFrame = 0;
        let settledFrame = 0;
        Promise.all([document.fonts.ready, loaded]).then(() => {
          if (disposed || !active) return;
          firstFrame = requestAnimationFrame(() => {
            settledFrame = requestAnimationFrame(refresh);
          });
        });
        sync();
        return () => {
          active = false;
          cancelAnimationFrame(firstFrame);
          cancelAnimationFrame(settledFrame);
          history.scrollRestoration = previousRestoration;
          scrollToChapter = null;
          document.removeEventListener("click", navigate, true);
          window.removeEventListener("hashchange", restore);
          window.removeEventListener("popstate", restore);
          gsap.ticker.remove(tick);
          lenis.destroy();
          scenes.forEach((scene) => {
            scene.inert = false;
            scene
              .querySelectorAll<HTMLElement>("[data-panel], .final-invitation")
              .forEach((el) => {
                el.inert = false;
                el.removeAttribute("aria-hidden");
              });
          });
        };
      },
      host,
    );
    return () => {
      disposed = true;
      media.revert();
      delete host.dataset.motion;
      delete host.dataset.ready;
    };
  }, [container]);
}
