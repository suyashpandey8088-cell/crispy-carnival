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
  const q = (s: string) => root.querySelectorAll(s);
  switch (index) {
    case 0:
      tl.fromTo(
        q(".name-letter"),
        { opacity: 0.12, yPercent: 70 },
        { opacity: 1, yPercent: 0, stagger: 0.027, duration: 0.16 },
        0.1,
      )
        .to(q(".awakening-aside"), { x: -55, opacity: 0, duration: 0.24 }, 0.55)
        .to(
          q(".awakening-name"),
          { scale: 1.08, yPercent: -30, duration: 0.32 },
          0.6,
        )
        .to(
          q(".awakening-scroll"),
          { opacity: 0, y: 20, duration: 0.15 },
          0.05,
        );
      break;
    case 1:
      tl.fromTo(
        q(".possibility-copy"),
        { xPercent: -3, opacity: 1 },
        { xPercent: 0, opacity: 1, duration: 0.25 },
        0,
      )
        .fromTo(
          q(".floating-thought"),
          { y: 70, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.08, duration: 0.16 },
          0.48,
        )
        .to(
          q(".possibility-copy h2"),
          { scale: 0.95, x: -15, duration: 0.3 },
          0.65,
        )
        .to(
          q(".floating-thought"),
          { y: -35, opacity: 0, stagger: 0.035, duration: 0.1 },
          0.85,
        );
      break;
    case 2:
      tl.fromTo(
        q(".identity-headline > *"),
        { xPercent: (i) => (i % 2 ? 35 : -12), opacity: 0.4 },
        { xPercent: 0, opacity: 1, stagger: 0.12, duration: 0.22 },
        0,
      )
        .to(
          q(".identity-headline"),
          { scale: 0.67, xPercent: 0, yPercent: -20, duration: 0.3 },
          0.45,
        )
        .fromTo(
          q(".identity-biography"),
          { xPercent: 25, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 0.3 },
          0.5,
        )
        .fromTo(
          q(".identity-words span"),
          { y: 90, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.07, duration: 0.15 },
          0.55,
        )
        .to(
          q(".identity-orbit"),
          { rotation: 100, scale: 1.3, duration: 1 },
          0,
        );
      break;
    case 3: {
      const track = root.querySelector<HTMLElement>(".journey-track")!;
      tl.to(
        track,
        { x: () => -(track.scrollWidth - root.clientWidth), duration: 1 },
        0,
      ).to(q(".journey-bottom-line span"), { scaleX: 1, duration: 1 }, 0);
      break;
    }
    case 4:
      dissolve(tl, root, ".work-panel");
      break;
    case 5:
      dissolve(tl, root, ".tech-panel");
      tl.to(q(".tech-orbit-one"), { rotation: 150, scale: 1.3, duration: 1 }, 0)
        .to(
          q(".tech-orbit-two"),
          { rotation: -110, scale: 0.8, duration: 1 },
          0,
        )
        .to(q(".technology-heading"), { yPercent: -20, duration: 1 }, 0);
      break;
    case 6:
      dissolve(tl, root, ".personal-panel");
      tl.to(q(".personal-heading"), { xPercent: -8, duration: 1 }, 0);
      break;
    case 7:
      gsap.set(q(".final-invitation"), { autoAlpha: 0, y: 70 });
      tl.to(
        q(".final-first"),
        { scale: 1.13, yPercent: -12, autoAlpha: 0, duration: 0.3 },
        0.23,
      ).to(q(".final-invitation"), { autoAlpha: 1, y: 0, duration: 0.3 }, 0.5);
      break;
  }
  // A normalized, one-unit master clock makes refresh/responsive durations predictable.
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
          host.dataset.ready = "true";
          return;
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
          const name = host.querySelector(".hud-chapter");
          if (name)
            name.textContent = `${String(index + 1).padStart(2, "0")} / ${chapters[index].title.toUpperCase()}`;
        };
        const updates: ((progress: number) => void)[] = [];
        scenes.forEach((root, index) => {
          const chapter = chapters[index];
          const panelSelector =
            index === 3
              ? ".journey-panel"
              : index === 4
                ? ".work-panel"
                : index === 5
                  ? ".tech-panel"
                  : ".personal-panel";
          const count = root.querySelectorAll(panelSelector).length;
          const update = (progress: number) => {
            activate(index);
            directWorld(index, progress);
            root.dataset.progress = progress.toFixed(4);
            const panel = Math.min(
              count - 1,
              index === 3
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
            if (index === 7) {
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
