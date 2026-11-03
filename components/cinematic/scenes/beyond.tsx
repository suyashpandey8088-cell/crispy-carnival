"use client";
import { interests } from "@/lib/content";
import { SceneShell } from "./scene-shell";
import { goToSceneProgress } from "../director";
export function BeyondScene() {
  return (
    <SceneShell
      id="beyond"
      index={6}
      title="Beyond technology"
      className="personal-scene"
    >
      <div className="personal-heading">
        <span className="mono gold">A LIFE OUTSIDE THE EDITOR.</span>
        <h2>
          More than <em>code.</em>
        </h2>
      </div>
      <div className="personal-panels">
        {interests.map((item, i) => (
          <article
            key={item.title}
            className={`personal-panel personal-${i}`}
            data-panel={i}
          >
            <div className="personal-art" aria-hidden="true">
              <span>{item.symbol}</span>
              <div className="personal-art-grid" />
            </div>
            <div className="personal-copy">
              <span className="mono gold">
                {item.number} / OFFLINE, FULLY PRESENT.
              </span>
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="mono muted">
                DIFFERENT PURSUITS. THE SAME CURIOSITY.
              </span>
            </div>
          </article>
        ))}
      </div>
      <div className="personal-index">
        {interests.map((item, i) => (
          <button
            className="mono personal-nav"
            key={item.title}
            onClick={() => goToSceneProgress("beyond", i / 3)}
          >
            {item.number}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </SceneShell>
  );
}
