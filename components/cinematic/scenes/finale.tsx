import { personal } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import { Contact } from "@/components/portfolio";
import { ChromeSticker, Smiley, Burst, CircularSeal, Tape } from "../graphics";
import { SceneShell } from "./scene-shell";
export function FinaleScene() {
  return (
    <SceneShell
      id="contact"
      index={6}
      title="The grand finale"
      className="final-scene"
    >
      <div className="final-checker" aria-hidden="true" />
      <div className="final-first">
        <span className="mono">NO ACHIEVEMENT UNLOCKED. JUST GOOD TASTE.</span>
        <h2>
          YOU MADE IT
          <br />
          TO <span>THE END.</span>
        </h2>
        <Smiley />
      </div>
      <div className="final-invitation">
        <span className="mono">
          COOL THINGS HAPPEN WHEN CURIOUS PEOPLE MEET.
        </span>
        <h2>
          NOW LET’S BUILD
          <br />
          SOMETHING
          <br />
          <span>UNEXPECTED.</span>
        </h2>
        <Contact embedded />
        <CircularSeal
          className="final-seal"
          text="LET’S MAKE SOMETHING THAT MATTERS. "
        />
        <div className="final-signature" aria-label={personal.name}>
          {personal.name
            .toUpperCase()
            .split("")
            .map((letter, i) => (
              <span key={i}>{letter === " " ? "\u00a0" : letter}</span>
            ))}
          <sup>®</sup>
        </div>
      </div>
      <ChromeSticker className="final-chrome" />
      <Burst className="final-burst" />
      <Tape className="final-tape">{copy.contact.signature} ✳</Tape>
      <div className="final-bottom mono">
        <span>
          © {new Date().getFullYear()} {personal.name.toUpperCase()}®
        </span>
        <a href="#awakening">RUN IT BACK ↗</a>
      </div>
    </SceneShell>
  );
}
