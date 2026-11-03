import { personal } from "@/lib/content";
import { SceneShell } from "./scene-shell";
export function IdentityScene() {
  return (
    <SceneShell
      id="about"
      index={2}
      title="The mind behind the work"
      className="identity-scene"
    >
      <div className="identity-orbit" aria-hidden="true" />
      <h2 className="identity-headline">
        <span>Curiosity</span>
        <span>drives</span>
        <em>everything.</em>
      </h2>
      <div className="identity-biography">
        <span className="mono gold">NOT A JOB TITLE. A WAY OF THINKING.</span>
        <h3>
          An engineer by education.
          <br />
          <em>An explorer by nature.</em>
        </h3>
        <p>{personal.introduction}</p>
        <p>{personal.interests}</p>
      </div>
      <div className="identity-words mono">
        <span>INTELLIGENCE</span>
        <span>IMAGINATION</span>
        <span>INTENTION</span>
      </div>
      <span className="identity-footnote mono">
        THINK DEEPLY. BUILD MEANINGFULLY. STAY CURIOUS.
      </span>
    </SceneShell>
  );
}
