"use client";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { experiences } from "@/lib/content";
import { goToSceneProgress } from "../director";
import { SceneShell } from "./scene-shell";
export function JourneyScene() {
  return (
    <SceneShell
      id="experience"
      index={3}
      title="The journey"
      className="journey-scene"
    >
      <div className="journey-rail">
        <span className="mono">FIVE CHAPTERS. ONE ENDURING CURIOSITY.</span>
        <div className="journey-ticks">
          {experiences.map((e) => (
            <button
              className="mono journey-tick"
              aria-label={`Read experience ${e.id}: ${e.role}`}
              key={e.id}
              onClick={() =>
                goToSceneProgress(
                  "experience",
                  (Number(e.id) - 1) / (experiences.length - 1),
                )
              }
            >
              {e.id}
            </button>
          ))}
        </div>
      </div>
      <div className="journey-window">
        <div className="journey-track">
          {experiences.map((e, i) => (
            <article
              className="journey-panel"
              data-panel={i}
              key={e.id}
              aria-label={`Experience ${e.id}: ${e.role}`}
            >
              <div className="journey-art-label mono">
                STUDY {e.id} / 05
                <br />
                {e.field.toUpperCase()}
              </div>
              <span
                className="journey-giant"
                aria-hidden="true"
                data-number={e.id}
              />
              <div className="journey-copy">
                <span className="mono gold">
                  {e.company || "COMPANY TO BE ADDED"} /{" "}
                  {e.dates || "DATES PENDING"}
                </span>
                <h2>{e.role}</h2>
                <p className="journey-theme">{e.theme}</p>
                <div className="journey-tags mono">
                  {e.skills.map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
                <p className="journey-verification">
                  {e.responsibilities ||
                    "Role confirmed. Company, dates, responsibilities, and achievements are editable placeholders awaiting verification."}
                </p>
                <div className="journey-panel-controls">
                  <button
                    onClick={() =>
                      goToSceneProgress("experience", Math.max(0, i - 1) / 4)
                    }
                    disabled={i === 0}
                    aria-label="Previous experience"
                  >
                    <ArrowLeft size={17} />
                  </button>
                  <span className="mono">{e.id} / 05</span>
                  <button
                    onClick={() =>
                      goToSceneProgress("experience", Math.min(4, i + 1) / 4)
                    }
                    disabled={i === 4}
                    aria-label="Next experience"
                  >
                    <ArrowRight size={17} />
                  </button>
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
