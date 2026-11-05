"use client";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/lib/content";
import { copy, projectThemes } from "@/lib/art-direction";
import { ProjectArtwork } from "../project-artwork";
import { goToSceneProgress } from "../director";
import { SceneShell } from "./scene-shell";
export function WorkScene() {
  return (
    <SceneShell
      id="work"
      index={3}
      title={copy.work.label}
      className="work-scene"
    >
      <div className="project-stage">
        {projects.map((p, i) => {
          const theme = projectThemes[p.visual];
          return (
            <article
              className={`work-panel work-${p.visual}`}
              data-panel={i}
              key={p.slug}
              aria-label={`Project ${p.number}: ${p.title}`}
              style={
                {
                  "--project-bg": theme.bg,
                  "--project-ink": theme.ink,
                  "--project-accent": theme.accent,
                } as React.CSSProperties
              }
            >
              <div className="work-backdrop">
                <ProjectArtwork visual={p.visual} large />
              </div>
              <div className="work-caption mono">
                <span>
                  {copy.work.heading} / {p.number}
                </span>
                <span>{p.year}</span>
              </div>
              <div className="work-copy">
                <span className="project-category mono">{p.category}</span>
                <h2>{p.displayTitle}</h2>
                <p>{p.description}</p>
                <a
                  className="work-explore"
                  href={`/projects/${p.slug}`}
                  data-cursor="ENTER"
                >
                  Explore the idea
                  <ArrowUpRight size={24} />
                </a>
              </div>
              <div className="work-technologies mono">
                {p.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <span
                className="work-index-number"
                aria-hidden="true"
                data-number={p.number}
              />
            </article>
          );
        })}
      </div>
      <div className="work-controls">
        <span className="mono">PICK YOUR UNIVERSE →</span>
        <div>
          {projects.map((p, i) => (
            <button
              className="work-dot mono"
              key={p.slug}
              aria-label={`View project ${p.number}: ${p.title}`}
              onClick={() =>
                goToSceneProgress("work", i / Math.max(1, projects.length - 1))
              }
            >
              {p.number}
            </button>
          ))}
        </div>
        <span className="mono">KEEP SCROLLING. KEEP QUESTIONING.</span>
      </div>
    </SceneShell>
  );
}
