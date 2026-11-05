import { personal } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import { ChromeSticker, Smiley, Burst, Tape } from "../graphics";
import { SceneShell } from "./scene-shell";
export function IdentityScene() {
  return (
    <SceneShell
      id="about"
      index={1}
      title={copy.about.label}
      className="identity-scene"
    >
      <div className="identity-halftone" aria-hidden="true" />
      <h2 className="identity-headline">
        {copy.about.lines.map((line, i) => (
          <span className={`identity-line line-${i}`} key={line}>
            {line}
          </span>
        ))}
      </h2>
      <Burst className="identity-burst" />
      <ChromeSticker className="identity-chrome" />
      <div className="identity-window art-pane">
        <div className="window-chrome">
          <span>● ● ●</span>
          <span>human_glitch.exe</span>
          <span>×</span>
        </div>
        <div className="identity-biography">
          <span className="mono">MEET THE HUMAN BEHIND THE TABS.</span>
          <h3>{copy.about.subhead}</h3>
          <p>{personal.introduction}</p>
          <p>{personal.interests}</p>
          <span className="profile-name">
            {personal.name}
            <span>↗</span>
          </span>
        </div>
      </div>
      <div className="identity-sticker">
        <Smiley />
        <span>
          100% HUMAN.
          <br />
          MOSTLY CAFFEINATED.
        </span>
      </div>
      <Tape className="identity-tape">
        THINK DIFFERENT. THEN BUILD DIFFERENT. ✳
      </Tape>
    </SceneShell>
  );
}
