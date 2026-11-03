"use client";
import Link from "next/link";
import { ArrowUpRight, ArrowLeft, ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectVisual } from "@/components/portfolio";
import { goToSceneProgress } from "../director";
import { SceneShell } from "./scene-shell";
export function WorkScene() {
  return (
    <SceneShell
      id="work"
      index={4}
      title="Ideas made tangible"
      className="work-scene"
    >
      <div className="project-stage">
        {projects.map((p, i) => (
          <article
            className="work-panel"
            data-panel={i}
            key={p.slug}
            aria-label={`Project ${p.number}: ${p.title}`}
          >
            <div className="work-backdrop">
              <ProjectVisual visual={p.visual} large />
            </div>
            <div className="work-shade" />
            <div className="work-caption mono">
              <span>EXPLORATION {p.number} / 05</span>
              <span>{p.year}</span>
            </div>
            <div className="work-copy">
              <span className="mono gold">{p.category}</span>
              <h2>{p.title}</h2>
              <p>{p.description}</p>
              <Link
                className="work-explore"
                href={`/projects/${p.slug}`}
                data-cursor="EXPLORE"
              >
                Explore the idea
                <span>
                  <ArrowUpRight size={21} strokeWidth={1} />
                </span>
              </Link>
            </div>
            <div className="work-technologies mono">
              {p.technologies.map((t) => (
                <span key={t}>{t}</span>
              ))}
            </div>
            <div className="work-architecture mono">
              <span>THOUGHTFULLY BUILT.</span>
              <span>DETAILS TO BE VERIFIED.</span>
            </div>
          </article>
        ))}
      </div>
      <div className="work-controls">
        <span className="mono">THE EXPLORATION INDEX</span>
        <div>
          {projects.map((p, i) => (
            <button
              key={p.slug}
              className="work-dot mono"
              aria-label={`View project ${p.number}: ${p.title}`}
              onClick={() => goToSceneProgress("work", i / 4)}
            >
              {p.number}
            </button>
          ))}
        </div>
        <span className="work-direction mono">
          <ArrowLeft size={13} />
          SCROLL TO EXPLORE
          <ArrowRight size={13} />
        </span>
      </div>
    </SceneShell>
  );
}
