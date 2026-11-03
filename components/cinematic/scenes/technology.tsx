"use client";
import { useState } from "react";
import { skillGroups } from "@/lib/content";
import { SceneShell } from "./scene-shell";
import { goToSceneProgress } from "../director";
export function TechnologyScene() {
  const [description, setDescription] = useState(
    "Select a technology to explore its role in the toolkit.",
  );
  return (
    <SceneShell
      id="skills"
      index={5}
      title="The technical world"
      className="technology-scene"
    >
      <div className="technology-heading">
        <span className="mono gold">TOOLS ARE EXTENSIONS</span>
        <h2>
          of <em>imagination.</em>
        </h2>
      </div>
      <div className="tech-orbit tech-orbit-one" aria-hidden="true" />
      <div className="tech-orbit tech-orbit-two" aria-hidden="true" />
      <div className="tech-category-nav">
        {skillGroups.map((g, i) => (
          <button
            className="mono tech-nav"
            key={g.title}
            onClick={() => goToSceneProgress("skills", i / 3)}
          >
            <span>0{i + 1}</span>
            {g.title}
          </button>
        ))}
      </div>
      <div className="tech-panels">
        {skillGroups.map((g, i) => (
          <div key={g.title} className="tech-panel" data-panel={i}>
            <span className="mono gold">CONSTELLATION 0{i + 1}</span>
            <h3>{g.title}</h3>
            <div className="tech-labels">
              {g.skills.map((s, n) => (
                <button
                  style={{ "--label-index": n } as React.CSSProperties}
                  key={s.name}
                  onClick={() => setDescription(`${s.name} — ${s.description}`)}
                  onFocus={() => setDescription(`${s.name} — ${s.description}`)}
                  onMouseEnter={() =>
                    setDescription(`${s.name} — ${s.description}`)
                  }
                >
                  {s.name}
                  <span>↗</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <p className="tech-description" aria-live="polite">
        {description}
      </p>
      <span className="tech-coordinates mono">
        KNOWLEDGE IS NOT STATIC.
        <br />
        NEITHER IS THIS WORLD.
      </span>
    </SceneShell>
  );
}
