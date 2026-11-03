"use client";
import { useEffect, useState, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

export function CustomCursor() {
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
