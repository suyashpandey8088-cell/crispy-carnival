"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { experiences } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import { goToSceneProgress } from "../director";
import { Burst } from "../graphics";
import { SceneShell } from "./scene-shell";
export function JourneyScene() {
  const count = experiences.length;
  return (
    <SceneShell
      id="experience"
      index={2}
      title="The experience archive"
      className="journey-scene"
    >
      <h2 className="journey-heading">
        BUILT THROUGH
        <br />
        <span>EXPERIENCE.</span>
      </h2>
      <div className="journey-rail">
        <span className="mono">{copy.experience.label}</span>
        <div className="journey-ticks">
          {experiences.map((e, i) => (
            <button
              className="mono journey-tick"
              aria-label={`Read experience ${e.id}: ${e.role}`}
              key={e.id}
              onClick={() =>
                goToSceneProgress("experience", i / Math.max(1, count - 1))
              }
            >
              {e.id}
            </button>
          ))}
        </div>
      </div>
      <div className="journey-window">
        <div
          className="journey-track"
          style={{ "--entry-count": count } as React.CSSProperties}
        >
          {experiences.map((e, i) => (
            <article
              className={`journey-panel journey-color-${i % 5}`}
              data-panel={i}
              key={e.id}
              aria-label={`Experience ${e.id}: ${e.role}`}
            >
              <div
                className="journey-number"
                aria-hidden="true"
                data-number={e.id}
              />
              <div className="journey-orbit" aria-hidden="true" />
              <Burst className="journey-burst" />
              <div className="journey-art-label mono">
                CHAPTER {e.id}
                <br />
                {e.field.toUpperCase()}
              </div>
              <div className="experience-file art-pane">
                <div className="window-chrome">
                  <span>EXPERIENCE_{e.id}.LOG</span>
                  <span>↗</span>
                </div>
                <div className="journey-copy">
                  <span className="mono">
                    {e.company || "COMPANY: TO BE VERIFIED"} /{" "}
                    {e.dates || "DURATION: TO BE ADDED"}
                  </span>
                  <h3>{e.role}</h3>
                  <p className="journey-theme">{e.theme}</p>
                  <div className="experience-details">
                    <div>
                      <span className="mono">RESPONSIBILITIES</span>
                      <p>
                        {e.responsibilities ||
                          "Editable placeholder — add verified responsibilities."}
                      </p>
                    </div>
                    <div>
                      <span className="mono">TECHNOLOGIES</span>
                      <p>
                        {e.technologies?.join(" / ") ||
                          "To be verified and added."}
                      </p>
                    </div>
                    <div>
                      <span className="mono">ACHIEVEMENTS</span>
                      <p>
                        {e.achievements.length
                          ? e.achievements.join(" · ")
                          : "Awaiting verified details. No assumed results."}
                      </p>
                    </div>
                  </div>
                  <div className="journey-panel-controls">
                    <button
                      onClick={() =>
                        goToSceneProgress(
                          "experience",
                          Math.max(0, i - 1) / Math.max(1, count - 1),
                        )
                      }
                      disabled={i === 0}
                      aria-label="Previous experience"
                    >
                      <ArrowLeft size={17} />
                    </button>
                    <span className="mono">
                      {e.id} / {String(count).padStart(2, "0")}
                    </span>
                    <button
                      onClick={() =>
                        goToSceneProgress(
                          "experience",
                          Math.min(count - 1, i + 1) / Math.max(1, count - 1),
                        )
                      }
                      disabled={i === count - 1}
                      aria-label="Next experience"
                    >
                      <ArrowRight size={17} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="journey-bottom-line">
        <span />
      </div>
    </SceneShell>
  );
}
