import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { personal } from "@/lib/content";
import { copy } from "@/lib/art-direction";
import {
  ChromeSticker,
  CircularSeal,
  Smiley,
  Tape,
  Barcode,
  Burst,
} from "../graphics";
import { SceneShell } from "./scene-shell";
export function Awakening() {
  return (
    <SceneShell
      id="awakening"
      index={0}
      title="The internet is my canvas"
      className="opening-scene"
    >
      <div className="opening-grid" aria-hidden="true" />
      <span className="opening-eyebrow mono">{copy.opening.eyebrow}</span>
      <h1 className="canvas-headline" aria-label="The internet is my canvas.">
        {copy.opening.lines.map((line, i) => (
          <span className={`canvas-word word-${i}`} key={line}>
            {line}
          </span>
        ))}
      </h1>
      <div className="opening-side-note mono">
        IDEAS WITHOUT BORDERS.
        <br />
        CODE WITHOUT THE ORDINARY.
        <br />A LITTLE CONTROLLED CHAOS.
      </div>
      <ChromeSticker className="opening-chrome" priority />
      <CircularSeal className="opening-seal" />
      <div className="creative-sticker">
        CREATIVE
        <br />
        BY DEFAULT.
        <ArrowUpRight size={24} />
      </div>
      <Smiley className="opening-smiley" />
      <Burst className="opening-burst" />
      <div className="opening-profile">
        <strong>
          {personal.name.toUpperCase()}
          <sup>®</sup>
        </strong>
        <p className="mono">
          {copy.opening.description}
          <br />
          {copy.opening.roles}
        </p>
        <Barcode />
      </div>
      <Tape className="opening-tape">{copy.opening.marquee}</Tape>
      <a className="scroll-invitation mono" href="#about">
        <span>
          SCROLL TO
          <br />
          MAKE A MESS.
        </span>
        <ArrowDownRight />
      </a>
      <span className="opening-coordinate mono">
        NOT A TEMPLATE.
        <br />A STATE OF MIND.
      </span>
    </SceneShell>
  );
}
