"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  X,
  Menu,
  Copy,
  Check,
  Volume2,
  VolumeX,
} from "lucide-react";
import { personal, navigation, type Project } from "@/lib/content";
import { Magnetic } from "./interactions";
function SectionLabel({ number, children }: { number: string; children: React.ReactNode }) {
  return <div className="section-label mono"><span className="section-number">{number} /</span>{children}</div>;
}
export function Header() {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const close = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenu(false);
    };
    document.addEventListener("keydown", close);
    return () => document.removeEventListener("keydown", close);
  }, [menu]);
  return (
    <header className="site-header">
      <Link href="/" className="brand" aria-label="Suyash Pandey home">
        <span className="monogram">
          sp<span>∗</span>
        </span>
        <span className="brand-name">
          {personal.name.toUpperCase()}
          <span>AN INDEPENDENT MIND.</span>
        </span>
      </Link>
      <nav className="desktop-nav" aria-label="Main navigation">
        {navigation.map((n) => (
          <Link key={n.href} href={n.href}>
            {n.label}
          </Link>
        ))}
      </nav>
      <Magnetic className="header-contact">
        <Link href="/#contact" className="outline-button">
          Let’s talk <ArrowUpRight size={15} />
        </Link>
      </Magnetic>
      <button
        className="menu-toggle"
        aria-label={menu ? "Close navigation" : "Open navigation"}
        aria-expanded={menu}
        aria-controls="mobile-nav"
        onClick={() => setMenu(!menu)}
      >
        {menu ? <X /> : <Menu />}
      </button>
      <AnimatePresence>
        {menu && (
          <motion.nav
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="mobile-nav"
            id="mobile-nav"
            aria-label="Mobile navigation"
          >
            {[...navigation, { label: "Let’s talk", href: "/#contact" }].map(
              (n) => (
                <Link key={n.href} href={n.href} onClick={() => setMenu(false)}>
                  {n.label}
                  <ArrowUpRight size={20} />
                </Link>
              ),
            )}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
export function ProjectVisual({
  visual,
  large = false,
}: {
  visual: Project["visual"];
  large?: boolean;
}) {
  if (visual === "neural")
    return (
      <div className={`project-visual visual-neural ${large ? "large" : ""}`}>
        <Image
          src="/images/neural-field.webp"
          priority={large}
          alt="A luminous network of interconnected champagne-gold nodes"
          fill
          sizes={large ? "100vw" : "(max-width: 700px) 100vw, 65vw"}
        />
        <span className="visual-grid" />
      </div>
    );
  if (visual === "prediction")
    return (
      <div className="project-visual visual-prediction">
        <div className="prediction-ring ring-one" />
        <div className="prediction-ring ring-two" />
        <div className="prediction-ring ring-three" />
        <div className="prediction-axis" />
        <div className="prediction-core">
          <span className="mono">THE POSSIBILITIES</span>
          <span className="infinity">∞</span>
          <span className="mono">ARE IN THE PATTERNS</span>
        </div>
        <span className="chart-meta mono">INPUT → INSIGHT</span>
      </div>
    );
  if (visual === "rag")
    return (
      <div className="project-visual visual-rag">
        <div className="knowledge-sheet sheet-back">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="knowledge-sheet sheet-front">
          <span className="mono">CONTEXT IS EVERYTHING.</span>
          <span className="sheet-letter">
            a<span>∗</span>
          </span>
          <i />
          <i />
          <i />
        </div>
        <span className="chart-meta mono">RETRIEVE. CONNECT. UNDERSTAND.</span>
      </div>
    );
  if (visual === "web")
    return (
      <div className="project-visual visual-web">
        <span className="web-type">
          What
          <br />
          <em>if?</em>
        </span>
        <div className="web-orbit" />
        <span className="chart-meta mono">AN EXPERIMENT IN POSSIBILITY</span>
      </div>
    );
  return (
    <div className="project-visual visual-data">
      <div className="data-bars">
        {Array.from({ length: 18 }, (_, i) => (
          <i
            key={i}
            style={{ height: `${20 + Math.sin(i * 0.8) * 15 + i * 3}%` }}
          />
        ))}
      </div>
      <span className="chart-meta mono">EVERY PATTERN TELLS A STORY.</span>
    </div>
  );
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
      className="contact-section section-wrap"
      id={embedded ? undefined : "contact"}
    >
      <div className="contact-top">
        <SectionLabel number="06">THE NEXT CHAPTER</SectionLabel>
        <span className="mono">
          <i className="status-dot" /> {personal.availability.toUpperCase()}
        </span>
      </div>
      <p className="contact-pretitle" data-reveal>
        Every great idea starts somewhere.
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
      <div className="contact-links">
        <Magnetic>
          <button className="text-link" onClick={() => setOpen(true)}>
            Start a conversation <ArrowUpRight size={18} />
          </button>
        </Magnetic>
        <div className="social-links">
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
            <span className="mono muted">SOCIAL LINKS COMING SOON</span>
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
          Good things begin
          <br />
          <em>with a conversation.</em>
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
          ENGINEERED WITH CURIOSITY.
          <br />
          BUILT WITH INTENTION.
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
      className="ambient-toggle mono"
      onClick={toggle}
      aria-pressed={on}
      aria-label={`Turn ambient sound ${on ? "off" : "on"}`}
    >
      {on ? <Volume2 size={13} /> : <VolumeX size={13} />}
      <span>SOUND {on ? "ON" : "OFF"}</span>
    </button>
  );
}
