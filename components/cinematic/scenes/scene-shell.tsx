import type { ReactNode, CSSProperties } from "react";
import { chapters } from "@/lib/art-direction";
export function SceneShell({
  id,
  index,
  title,
  children,
  className = "",
}: {
  id: string;
  index: number;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  const chapter = chapters[index];
  return (
    <section
      id={id}
      data-scene={index}
      className={`cinema-scene ${className}`}
      style={
        {
          "--scene-bg": chapter.bg,
          "--scene-ink": chapter.ink,
        } as CSSProperties
      }
      aria-label={title}
    >
      <div className="scene-frame">
        <div className="scene-topline mono">
          <span>
            0{index + 1} / {title.toUpperCase()}
          </span>
          <span>SCROLL IS THE CONTROLLER. CURIOSITY IS THE ENGINE.</span>
          <span>SP® / PERSONAL UNIVERSE</span>
        </div>
        {children}
      </div>
    </section>
  );
}
