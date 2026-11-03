"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
export function ExperienceRuntime() {
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      reduced ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      anchors: true,
    });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(update);
    const context = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 32, opacity: 0.12 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 93%", once: true },
          },
        );
      });
      gsap.utils.toArray<HTMLElement>(".word-reveal span").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.22 },
          {
            opacity: 1,
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              end: "top 50%",
              scrub: true,
            },
          },
        );
      });
      gsap.to(".hero-art-inner", {
        y: 110,
        rotation: 5,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1000px)", () => {
        ScrollTrigger.create({
          trigger: ".experience-layout",
          start: "top 110px",
          end: "bottom 75%",
          pin: ".experience-art",
          pinSpacing: false,
        });
      });
    });
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    document.fonts.ready.then(refresh);
    return () => {
      window.removeEventListener("load", refresh);
      context.revert();
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, [reduced]);
  return <CustomCursor />;
}
function CustomCursor() {
  const [label, setLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100),
    y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 550, damping: 42 }),
    sy = useSpring(y, { stiffness: 550, damping: 42 });
  useEffect(() => {
    if (
      !window.matchMedia(
        "(pointer:fine) and (prefers-reduced-motion: no-preference)",
      ).matches
    )
      return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const el = (e.target as HTMLElement).closest("[data-cursor], a, button");
      setLabel(el?.getAttribute("data-cursor") || (el ? "link" : ""));
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);
  return (
    <motion.div
      aria-hidden="true"
      className={`custom-cursor ${label ? "is-active" : ""} ${label && label !== "link" ? "is-label" : ""}`}
      style={{ left: sx, top: sy, opacity: visible ? 1 : 0 }}
    >
      {label !== "link" ? label : ""}
    </motion.div>
  );
}
export function Magnetic({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const x = useMotionValue(0),
    y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 }),
    sy = useSpring(y, { stiffness: 200, damping: 20 });
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduced || e.pointerType !== "mouse") return;
        const rect = e.currentTarget.getBoundingClientRect();
        x.set((e.clientX - rect.left - rect.width / 2) * 0.12);
        y.set((e.clientY - rect.top - rect.height / 2) * 0.15);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
export function Opening() {
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (
      sessionStorage.getItem("exhibition-entered") ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const id = window.setTimeout(() => setOpen(false), 0);
      return () => clearTimeout(id);
    }
    const enter = window.setTimeout(() => setOpen(true), 0);
    const start = performance.now();
    const id = window.setInterval(() => {
      const value = Math.min(100, Math.round((performance.now() - start) / 16));
      setProgress(value);
      if (value === 100) {
        setOpen(false);
        sessionStorage.setItem("exhibition-entered", "true");
        clearInterval(id);
      }
    }, 40);
    return () => {
      clearInterval(id);
      clearTimeout(enter);
    };
  }, []);
  return (
    <motion.div
      className="opening"
      aria-hidden={!open}
      initial={false}
      style={{ pointerEvents: open ? "auto" : "none" }}
      animate={{
        opacity: open ? 1 : 0,
        visibility: open ? "visible" : "hidden",
      }}
      transition={{ duration: reduced ? 0 : 0.6 }}
    >
      <div className="opening-glow" />
      <span className="mono">THE ARCHITECTURE OF INTELLIGENCE</span>
      <p>SUYASH PANDEY</p>
      <span className="mono">ENGINEERING IDEAS INTO REALITY.</span>
      <div className="opening-bottom">
        <span className="mono">
          ENTERING THE EXHIBITION — {String(progress).padStart(2, "0")}%
        </span>
        <button
          tabIndex={open ? 0 : -1}
          onClick={() => {
            setOpen(false);
            sessionStorage.setItem("exhibition-entered", "true");
          }}
        >
          Skip intro ↗
        </button>
      </div>
    </motion.div>
  );
}
