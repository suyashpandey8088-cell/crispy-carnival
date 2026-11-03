import { personal } from "@/lib/content";
import { Contact } from "@/components/portfolio";
import { SceneShell } from "./scene-shell";
export function FinaleScene() {
  return (
    <SceneShell
      id="contact"
      index={7}
      title="The unwritten chapter"
      className="final-scene"
    >
      <div className="final-first">
        <span className="mono gold">EVERY ENDING IS AN INVITATION.</span>
        <h2>
          The next chapter
          <br />
          <em>is yet to be built.</em>
        </h2>
      </div>
      <div className="final-invitation">
        <span className="mono gold">AN OPEN INVITATION</span>
        <h2>
          Let’s build something
          <br />
          <em>remarkable.</em>
        </h2>
        <Contact embedded />
        <div className="final-signature">
          <span>{personal.name.toUpperCase()}</span>
          <span className="mono">
            ENGINEERED WITH CURIOSITY.
            <br />
            BUILT WITH INTENTION.
          </span>
        </div>
      </div>
      <div className="final-bottom mono">
        <span>
          © {new Date().getFullYear()} {personal.name.toUpperCase()}
        </span>
        <a href="#awakening">BACK TO THE BEGINNING ↗</a>
      </div>
    </SceneShell>
  );
}
