import { ArrowDown, ArrowUpRight } from "lucide-react";
import { personal } from "@/lib/content";
import { SceneShell } from "./scene-shell";
export function Awakening() {
  return (
    <SceneShell
      id="awakening"
      index={0}
      title="The awakening"
      className="awakening-scene"
    >
      <div className="awakening-coordinate mono">
        FIG. 001
        <br />
        INTELLIGENCE, BEFORE FORM.
      </div>
      <div className="awakening-aside">
        <span className="mono">EVERY POSSIBILITY BEGINS</span>
        <p>
          with a <em>thought.</em>
        </p>
      </div>
      <div className="awakening-name">
        <p className="mono">ENGINEER. EXPLORER. AN INDEPENDENT MIND.</p>
        <h1 aria-label={personal.name}>
          {personal.name
            .toUpperCase()
            .split("")
            .map((letter, i) => (
              <span className="name-letter" aria-hidden="true" key={i}>
                {letter === " " ? "\u00a0" : letter}
              </span>
            ))}
        </h1>
      </div>
      <a href="#hero" className="skip-awakening mono">
        STEP INSIDE <ArrowUpRight size={13} />
      </a>
      <div className="awakening-scroll mono">
        <span className="scroll-line" />
        <span>SCROLL TO AWAKEN</span>
        <ArrowDown size={13} />
      </div>
    </SceneShell>
  );
}
