import { ArrowUpRight } from "lucide-react";
import { SceneShell } from "./scene-shell";
export function HeroScene() {
  return (
    <SceneShell
      id="hero"
      index={1}
      title="Creating possibilities"
      className="possibility-scene"
    >
      <div className="hero-grid-lines" aria-hidden="true" />
      <div className="possibility-copy">
        <span className="mono gold">AI & DATA SCIENCE ENGINEERING</span>
        <h2>
          <span>Engineering</span>
          <span>ideas.</span>
          <em>Creating</em>
          <em>possibilities.</em>
        </h2>
        <p>
          Not just building technology.
          <br />
          Building what comes next.
        </p>
        <a href="#work" className="text-link">
          Enter the explorations <ArrowUpRight size={17} />
        </a>
      </div>
      <div className="floating-thought thought-one mono">
        01 — QUESTION EVERYTHING.
      </div>
      <div className="floating-thought thought-two mono">
        02 — CONNECT THE UNEXPECTED.
      </div>
      <div className="floating-thought thought-three mono">
        03 — MAKE IT MEANINGFUL.
      </div>
      <div className="sculpture-caption mono">
        <span>THOUGHT → FRAGMENT → POSSIBILITY</span>
        <span className="sculpture-phase">A CONTINUOUS TRANSFORMATION</span>
      </div>
    </SceneShell>
  );
}
