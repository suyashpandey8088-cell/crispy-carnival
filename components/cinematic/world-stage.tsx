"use client";
import { Component, useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { world, subscribeWorld, publishWorld } from "./world-state";
const WorldCanvas = dynamic(() => import("./world-canvas"), { ssr: false });
class WorldBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export default function WorldStage() {
  const stage = useRef<HTMLDivElement>(null);
  const fallback = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [unavailable, setUnavailable] = useState(false);
  useEffect(() => {
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const check = () => {
      setReady(false);
      if (media.matches) {
        setEnabled(false);
        return;
      }
      if ("WebGL2RenderingContext" in window) setEnabled(true);
      else setUnavailable(true);
    };
    check();
    media.addEventListener("change", check);
    const update = () => {
      if (stage.current) {
        stage.current.style.backgroundColor = `rgb(${world.bgR},${world.bgG},${world.bgB})`;
        stage.current.style.setProperty(
          "--world-opacity",
          String(world.opacity),
        );
        stage.current.dataset.worldScene = String(world.scene);
      }
      if (fallback.current) {
        const mobile = innerWidth < 760;
        const y = mobile ? world.fallbackY : 0;
        fallback.current.style.transform = `translate3d(${world.x * (mobile ? 45 : 100)}vw,${y}vh,0) rotate(${world.rotation * 12}deg) scale(${(mobile ? 0.65 : 0.8) + world.zoom * 0.2})`;
      }
    };
    const pointer = (event: PointerEvent) => {
      if (event.pointerType !== "mouse" || media.matches) return;
      world.pointerX = (event.clientX / innerWidth - 0.5) * 2;
      world.pointerY = (event.clientY / innerHeight - 0.5) * 2;
      publishWorld();
    };
    window.addEventListener("pointermove", pointer, { passive: true });
    const unsubscribe = subscribeWorld(update);
    update();
    return () => {
      unsubscribe();
      window.removeEventListener("pointermove", pointer);
      media.removeEventListener("change", check);
    };
  }, []);
  return (
    <div
      className={`world-stage ${ready && enabled && !unavailable ? "world-ready" : ""}`}
      ref={stage}
      aria-hidden="true"
    >
      <div className="world-halo" />
      <div className="world-fallback" ref={fallback}>
        <Image
          src="/images/chrome-chaos.webp"
          alt=""
          fill
          priority
          sizes="(max-width: 700px) 100vw, 75vw"
        />
      </div>
      {enabled && !unavailable && (
        <WorldBoundary onError={() => setUnavailable(true)}>
          <div className="world-canvas">
            <WorldCanvas onReady={() => setReady(true)} />
          </div>
        </WorldBoundary>
      )}
      <div className="world-vignette" />
    </div>
  );
}
