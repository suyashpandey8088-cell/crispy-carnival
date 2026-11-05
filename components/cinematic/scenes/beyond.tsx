"use client";
import { interests } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import { SceneShell } from "./scene-shell";
import { goToSceneProgress } from "../director";
import { Smiley, Burst, Tape } from "../graphics";
export function BeyondScene() {
  return (
    <SceneShell
      id="beyond"
      index={5}
      title={copy.beyond.label}
      className="personal-scene"
    >
      <div className="personal-heading">
        <span className="mono">THE OTHER SIDE OF MY BRAIN.</span>
        <h2>
          NOT EVERYTHING
          <br />
          REVOLVES AROUND <span>CODE.</span>
        </h2>
      </div>
      <div className="comic-caption">PLOT TWIST!</div>
      <div className="personal-panels">
        {interests.map((item, i) => (
          <article
            key={item.title}
            className={`personal-panel personal-${i}`}
            data-panel={i}
          >
            <div className="comic-frame-label mono">
              OFFLINE_MODE_0{i + 1} <span>↗</span>
            </div>
            <div className="personal-art" aria-hidden="true">
              <span>{item.symbol}</span>
              <div className="personal-art-grid" />
              {i === 0 && <span className="comic-speech">YOUR MOVE.</span>}
              {i === 1 && <span className="comic-speech">SMASH!</span>}
              {i === 2 && (
                <span className="comic-speech">ONE MORE CHAPTER.</span>
              )}
              {i === 3 && <Smiley />}
            </div>
            <div className="personal-copy">
              <h3>{item.title}</h3>
              <p>{item.subtitle}</p>
              <span className="mono">DIFFERENT PURSUITS. SAME CURIOSITY.</span>
            </div>
          </article>
        ))}
      </div>
      <Burst className="personal-burst" />
      <Tape className="personal-tape">
        GO OUTSIDE. MAKE A MOVE. START SOMETHING. ✳
      </Tape>
      <div className="personal-index">
        {interests.map((item, i) => (
          <button
            className="mono personal-nav"
            key={item.title}
            onClick={() =>
              goToSceneProgress("beyond", i / Math.max(1, interests.length - 1))
            }
          >
            {item.number}
            <span>{item.title}</span>
          </button>
        ))}
      </div>
    </SceneShell>
  );
}
