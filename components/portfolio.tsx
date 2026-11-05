"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";

import { ArrowUpRight, X, Copy, Check, Volume2, VolumeX } from "lucide-react";
import { personal, type Project } from "@/lib/content";
import { Magnetic } from "./interactions";
import FloatingNavigation from "./navigation/floating-navigation";
import { ProjectArtwork } from "./cinematic/project-artwork";
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: React.ReactNode;
}) {
  return (
    <div className="section-label mono">
      <span className="section-number">{number} /</span>
      {children}
    </div>
  );
}
export function Header() {
  return <FloatingNavigation />;
}
export function ProjectVisual({
  visual,
  large = false,
}: {
  visual: Project["visual"];
  large?: boolean;
}) {
  return <ProjectArtwork visual={visual} large={large} />;
}
export function Contact({ embedded = false }: { embedded?: boolean }) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.current?.open) {
      dialog.current.close();
      trigger.current?.focus();
    }
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  const links = Object.entries(personal.social).filter(
    (entry): entry is [string, string] => !!entry[1],
  );
  return (
    <section
      className={
        embedded
          ? "contact-section contact-embedded"
          : "contact-section section-wrap"
      }
      id={embedded ? undefined : "contact"}
    >
      {!embedded && (
        <>
          <div className="contact-top">
            <SectionLabel number="06">THE NEXT CHAPTER</SectionLabel>
            <span className="mono">
              <i className="status-dot" /> {personal.availability.toUpperCase()}
            </span>
          </div>
          <p className="contact-pretitle" data-reveal>
            EXPECT THE UNEXPECTED.
          </p>
          <h2 data-reveal>
            Let’s build something
            <br />
            <em>remarkable.</em>
            <button
              ref={trigger}
              className="contact-arrow"
              aria-label="Open contact information"
              onClick={() => setOpen(true)}
            >
              <ArrowUpRight strokeWidth={0.7} />
            </button>
          </h2>
        </>
      )}
      <div className="contact-links">
        <Magnetic>
          <button
            ref={embedded ? trigger : undefined}
            className="contact-main-link"
            onClick={() => setOpen(true)}
          >
            Start a conversation <ArrowUpRight size={18} />
          </button>
        </Magnetic>
        <div className="contact-socials">
          {links.length ? (
            links.map(([name, href]) => (
              <a
                href={href}
                key={name}
                target="_blank"
                rel="noopener noreferrer"
              >
                {name}
                <ArrowUpRight size={14} />
              </a>
            ))
          ) : (
            <span className="mono muted">
              VERIFIED SOCIAL LINKS: COMING SOON
            </span>
          )}
        </div>
      </div>
      <dialog
        data-lenis-prevent
        className="contact-dialog"
        ref={dialog}
        onCancel={() => setOpen(false)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setOpen(false);
        }}
        aria-labelledby="contact-dialog-title"
      >
        <button
          className="dialog-close"
          aria-label="Close contact information"
          onClick={() => setOpen(false)}
        >
          <X size={22} />
        </button>
        <span className="mono muted">AN OPEN INVITATION</span>
        <h3 id="contact-dialog-title">
          GOOD IDEAS START
          <br />
          <em>WITH A HELLO.</em>
        </h3>
        {personal.email ? (
          <>
            <a className="contact-email" href={`mailto:${personal.email}`}>
              {personal.email}
              <ArrowUpRight size={20} />
            </a>
            <button
              className="outline-button"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(personal.email!);
                  setCopied(true);
                } catch {
                  setCopied(false);
                }
              }}
            >
              {copied ? <Check size={15} /> : <Copy size={15} />}
              {copied ? "Email copied" : "Copy email"}
            </button>
          </>
        ) : (
          <>
            <p>
              The door is open. The contact details are still being prepared.
            </p>
            <p className="editable-note">
              Email and social profiles have not been verified yet. Add them in{" "}
              <code>lib/content.ts</code> to enable direct contact.
            </p>
            <button className="outline-button" onClick={() => setOpen(false)}>
              Back to the exhibition <ArrowUpRight size={16} />
            </button>
          </>
        )}
      </dialog>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <div className="footer-top">
        <Link href="/" className="footer-name">
          {personal.name.toUpperCase()}
          <span>®</span>
        </Link>
        <span className="mono">
          THE INTERNET IS MY CANVAS.
          <br />
          NO OFF SWITCH FOR CURIOSITY.
        </span>
      </div>
      <div className="footer-bottom mono">
        <span>
          © {new Date().getFullYear()} {personal.name.toUpperCase()}
        </span>
        <span>A WORK IN PROGRESS. JUST LIKE ME.</span>
        <a href="#main">
          BACK TO TOP <ArrowUpRight size={13} />
        </a>
      </div>
    </footer>
  );
}
export function Ambient() {
  const [on, setOn] = useState(false);
  const audio = useRef<AudioContext | null>(null);
  const gain = useRef<GainNode | null>(null);
  useEffect(
    () => () => {
      const context = audio.current;
      audio.current = null;
      gain.current = null;
      if (context && context.state !== "closed")
        void context.close().catch(() => {});
    },
    [],
  );
  async function toggle() {
    if (!audio.current || audio.current.state === "closed") {
      const context = new AudioContext();
      const g = context.createGain();
      g.gain.value = 0;
      g.connect(context.destination);
      [110, 164.81, 220].forEach((freq, i) => {
        const osc = context.createOscillator();
        osc.type = "sine";
        osc.frequency.value = freq;
        const v = context.createGain();
        v.gain.value = 0.12 / (i + 1);
        osc.connect(v);
        v.connect(g);
        osc.start();
      });
      audio.current = context;
      gain.current = g;
    }
    const context = audio.current;
    try {
      await context.resume();
      if (context.state === "closed" || audio.current !== context) return;
      gain.current?.gain.setTargetAtTime(
        on ? 0 : 0.12,
        context.currentTime,
        0.8,
      );
      setOn(!on);
    } catch {
      // The browser can close audio during navigation or suspend it in the background.
      setOn(false);
    }
  }
  return (
    <button
      className="ambient-button mono"
      onClick={toggle}
      aria-pressed={on}
      aria-label={`Turn ambient sound ${on ? "off" : "on"}`}
    >
      {on ? <Volume2 size={13} /> : <VolumeX size={13} />}
      <span>SOUND {on ? "ON" : "OFF"}</span>
    </button>
  );
}
