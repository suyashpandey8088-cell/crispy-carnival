"use client";
import { useRef } from "react";
import { Header, Ambient } from "@/components/portfolio";
import { CustomCursor } from "@/components/interactions";
import { useCinematicDirector } from "./director";
import { chapters } from "./world-state";
import WorldStage from "./world-stage";
import { Awakening } from "./scenes/awakening";

import { IdentityScene } from "./scenes/identity";
import { JourneyScene } from "./scenes/journey";
import { WorkScene } from "./scenes/work";
import { TechnologyScene } from "./scenes/technology";
import { BeyondScene } from "./scenes/beyond";
import { FinaleScene } from "./scenes/finale";
export default function CinematicExperience() {
  const root = useRef<HTMLDivElement>(null);
  useCinematicDirector(root);
  return (
    <div className="cinematic-experience" ref={root}>
      <WorldStage />
      <Header />
      <main id="main">
        <Awakening />

        <IdentityScene />
        <JourneyScene />
        <WorkScene />
        <TechnologyScene />
        <BeyondScene />
        <FinaleScene />
      </main>
      <nav className="chapter-navigation" aria-label="Exhibition chapters">
        {chapters.map((chapter, i) => (
          <a
            href={`#${chapter.id}`}
            key={chapter.id}
            className="chapter-link"
            aria-label={`Chapter ${i + 1}: ${chapter.title}`}
          >
            <span className="chapter-tooltip">{chapter.title}</span>
            <span className="chapter-mark">0{i + 1}</span>
          </a>
        ))}
      </nav>
      <div className="cinema-hud" aria-hidden="true">
        <span className="hud-chapter mono">01 / MY CANVAS</span>
        <div className="hud-progress">
          <span className="hud-scene-progress" />
        </div>
        <span className="mono hud-instruction">
          SCROLL. BREAK THINGS. REPEAT.
        </span>
      </div>
      <Ambient />
      <CustomCursor />
    </div>
  );
}
