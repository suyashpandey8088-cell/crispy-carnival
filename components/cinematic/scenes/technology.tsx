"use client";
import { useState } from "react";
import { skillGroups } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import { SceneShell } from "./scene-shell";
import { Burst, Barcode } from "../graphics";
import { goToSceneProgress } from "../director";
export function TechnologyScene() {
  const [description, setDescription] = useState(
    "Touch or hover a technology. Find out what makes it tick.",
  );
  return (
    <SceneShell
      id="skills"
      index={4}
      title="The technical playground"
      className="technology-scene"
    >
      <div className="technology-heading">
        <span className="mono">{copy.skills.label}</span>
        <h2>
          MY TOOLBOX
          <br />
          IS A LITTLE
          <br />
          <span>UNHINGED.</span>
        </h2>
      </div>
      <div className="tech-orbit tech-orbit-one" aria-hidden="true" />
      <div className="tech-orbit tech-orbit-two" aria-hidden="true" />
      <Burst className="tech-burst" />
      <div className="tech-category-nav">
        {skillGroups.map((g, i) => (
          <button
            className="mono tech-nav"
            key={g.title}
            onClick={() =>
              goToSceneProgress(
                "skills",
                i / Math.max(1, skillGroups.length - 1),
              )
            }
          >
            <span>0{i + 1}</span>
            {g.title}
          </button>
        ))}
      </div>
      <div className="tech-panels">
        {skillGroups.map((g, i) => (
          <div className="tech-panel" data-panel={i} key={g.title}>
            <span className="mono">
              TOOLKIT_0{i + 1} / NO BORING TOOLS. JUST BORING USES.
            </span>
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
      <Barcode className="tech-barcode" />
      <span className="tech-label-note mono">
        NOT A SKILL METER.
        <br />A PLAYGROUND OF POSSIBILITIES.
      </span>
    </SceneShell>
  );
}
