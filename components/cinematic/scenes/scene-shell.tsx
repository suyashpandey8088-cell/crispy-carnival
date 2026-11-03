import type { ReactNode } from "react";
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
  return (
    <section
      id={id}
      data-scene={index}
      className={`cinema-scene ${className}`}
      aria-label={title}
    >
      <div className="scene-frame">
        <div className="scene-topline mono">
          <span>
            <i>+</i> {String(index + 1).padStart(2, "0")} /{" "}
            {title.toUpperCase()}
          </span>
          <span>AN INDEPENDENT MIND. AN UNFOLDING STORY.</span>
        </div>
        {children}
      </div>
    </section>
  );
}
