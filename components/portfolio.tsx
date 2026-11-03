"use client";
import { useEffect, useRef, useState, Component, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowDown,
  X,
  Plus,
  Minus,
  Menu,
  MoveUpRight,
  Copy,
  Check,
  Volume2,
  VolumeX,
  Rotate3D,
} from "lucide-react";
import {
  personal,
  navigation,
  projects,
  experiences,
  skillGroups,
  interests,
  type Project,
} from "@/lib/content";
import { ExperienceRuntime, Magnetic, Opening } from "./interactions";
const Sculpture = dynamic(() => import("./sculpture"), {
  ssr: false,
  loading: () => (
    <div className="scene-loading mono">Illuminating the form…</div>
  ),
});

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
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
function Hero() {
  const [interactive, setInteractive] = useState(false);
  const [sceneError, setSceneError] = useState(false);
  const reduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const visible = useInView(heroRef, { margin: "100px" });
  function activate() {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2");
    if (!gl) {
      setSceneError(true);
      return;
    }
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    setInteractive(true);
  }
  return (
    <section ref={heroRef} className="hero" aria-labelledby="hero-heading">
      <div className="hero-topline mono">
        <span>
          <i className="tiny-cross">+</i> THE ARCHITECTURE OF INTELLIGENCE
        </span>
        <span className="edition">A PERSONAL EXHIBITION — VOL. 01</span>
      </div>
      <div
        className="hero-art"
        data-cursor={interactive ? "INTERACT" : undefined}
      >
        <div
          className={`hero-art-inner ${interactive ? "is-interactive" : ""}`}
        >
          <Image
            src="/images/intelligence-sculpture.webp"
            alt="An impossible flowing titanium sculpture with warm bronze reflections, symbolizing interconnected ideas"
            fill
            priority
            sizes="(max-width: 700px) 100vw, 65vw"
          />
        </div>
        {interactive && visible && (
          <div className="live-scene">
            <SceneBoundary
              onError={() => {
                setInteractive(false);
                setSceneError(true);
              }}
            >
              <Sculpture reducedMotion={!!reduced} />
            </SceneBoundary>
          </div>
        )}
        <div className="art-coordinate mono">
          FIG. 001 — INTELLIGENCE IN MOTION
        </div>
        <span className="orbit-label mono">THOUGHT → FORM</span>
      </div>
      <div className="hero-copy">
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <h1 id="hero-heading">
            Engineering
            <br />
            ideas into
            <br />
            <em>reality.</em>
            <span className="heading-star">✳</span>
          </h1>
        </motion.div>
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="hero-description"
        >
          <span className="short-rule" />
          <p>
            Not just building technology.
            <br />
            <strong>Building what comes next.</strong>
          </p>
        </motion.div>
        <Magnetic className="hero-cta">
          <Link href="#work" className="text-link">
            Explore my work{" "}
            <span className="circle-arrow">
              <ArrowUpRight size={18} strokeWidth={1.3} />
            </span>
          </Link>
        </Magnetic>
      </div>
      <div className="form-control">
        <button
          className="form-button mono"
          onClick={() => (interactive ? setInteractive(false) : activate())}
          aria-pressed={interactive}
        >
          {interactive ? <X size={14} /> : <Rotate3D size={15} />}{" "}
          {interactive ? "RETURN TO STILL" : "EXPLORE THE FORM"}
          <span>↗</span>
        </button>
        {sceneError && (
          <span className="scene-error">
            3D is unavailable on this device. Enjoy the still artwork.
          </span>
        )}
      </div>
      <div className="hero-footer">
        <a className="scroll-cue mono" href="#about">
          <span className="scroll-icon">
            <ArrowDown size={13} />
          </span>{" "}
          SCROLL TO DISCOVER
        </a>
        <div className="hero-discipline mono">
          AI & DATA SCIENCE ENGINEERING
          <span>DEVELOPER / CREATOR / PROBLEM SOLVER</span>
        </div>
        <div className="availability mono">
          <span>
            <i className="status-dot" /> OPEN TO POSSIBILITIES
          </span>
          <span>
            BASED IN {personal.location.toUpperCase()}{" "}
            <span className="location-mark">↗</span>
          </span>
        </div>
      </div>
    </section>
  );
}
function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: ReactNode;
}) {
  return (
    <div className="section-label mono">
      <span className="section-number">{number} /</span>
      {children}
    </div>
  );
}
function About() {
  const words = "Curiosity is where everything begins.".split(" ");
  return (
    <section className="about-section section-wrap" id="about">
      <SectionLabel number="01">THE THINKING BEHIND THE WORK</SectionLabel>
      <div className="about-grid">
        <div className="about-title" data-reveal>
          <span className="small-pretitle mono">
            A MIND IN CONSTANT MOTION.
          </span>
          <h2 className="word-reveal">
            {words.map((word, i) => (
              <span key={word} className={i > 2 ? "serif-italic" : ""}>
                {word}{" "}
              </span>
            ))}
          </h2>
        </div>
        <div className="about-copy" data-reveal>
          <span className="about-symbol">✳</span>
          <p>
            I’m <span className="ivory">{personal.name}.</span>
            <br />
            An engineer by education.
            <br />
            An explorer by nature.
          </p>
          <p>{personal.introduction}</p>
          <p>{personal.interests}</p>
          <a href="#experience" className="text-link small">
            Discover my journey <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="manifesto mono">
        <span>THINK DEEPLY.</span>
        <span>BUILD MEANINGFULLY.</span>
        <span>
          STAY CURIOUS. <MoveUpRight size={13} />
        </span>
      </div>
    </section>
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
function Projects() {
  const [expanded, setExpanded] = useState(false);
  return (
    <section id="work" className="work-section section-wrap">
      <div className="section-top">
        <SectionLabel number="02">SELECTED EXPLORATIONS</SectionLabel>
        <span className="mono muted">THOUGHTFULLY BUILT. ALWAYS EVOLVING.</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Ideas made
          <br />
          <em>tangible.</em>
        </h2>
        <p>
          A selection of ideas at the intersection
          <br />
          of intelligence, utility, and imagination.
        </p>
      </div>
      <div className="project-grid">
        {projects
          .slice(0, expanded ? projects.length : 3)
          .map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`project-card ${index === 0 ? "project-featured" : ""}`}
              data-cursor="EXPLORE"
              data-reveal
            >
              <div className="project-image">
                <ProjectVisual visual={project.visual} />
                <div className="project-image-top mono">
                  <span>EXPLORATION {project.number}</span>
                  <span>
                    {project.visual === "neural"
                      ? "AI / ENGINEERING"
                      : "DESIGN / INTELLIGENCE"}
                  </span>
                </div>
                <span className="project-open">
                  <ArrowUpRight size={22} strokeWidth={1} />
                </span>
                {index === 0 && (
                  <div className="project-overlay-text">
                    <span className="mono">
                      HUMAN CURIOSITY. MACHINE INTELLIGENCE.
                    </span>
                    <span>
                      Thinking,
                      <br />
                      <em>in another dimension.</em>
                    </span>
                  </div>
                )}
              </div>
              <div className="project-info">
                <div>
                  <span className="mono project-category">
                    {project.number} — {project.category}
                  </span>
                  <h3>{project.title}</h3>
                </div>
                <ArrowUpRight size={24} strokeWidth={1} />
              </div>
              <p className="project-description">{project.description}</p>
            </Link>
          ))}
      </div>
      <div className="work-bottom">
        <span className="mono muted">
          AN OPEN ARCHIVE OF IDEAS & EXPERIMENTS.
        </span>
        <Magnetic>
          <button
            className="outline-button"
            onClick={() => setExpanded(!expanded)}
            aria-expanded={expanded}
          >
            {expanded ? "Show selected work" : "View all explorations"}
            {expanded ? <Minus size={15} /> : <Plus size={15} />}
          </button>
        </Magnetic>
      </div>
    </section>
  );
}
function Experience() {
  const [active, setActive] = useState(0);
  const [expanded, setExpanded] = useState<number | null>(0);
  const archive = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting)
            setActive(Number((entry.target as HTMLElement).dataset.index));
        }
      },
      { rootMargin: "-25% 0px -40% 0px", threshold: 0.15 },
    );
    archive.current
      ?.querySelectorAll("[data-index]")
      .forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  return (
    <section className="experience-section section-wrap" id="experience">
      <SectionLabel number="03">THE EXPERIENCE ARCHIVE</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2>
          Every chapter,
          <br />
          <em>a new perspective.</em>
        </h2>
        <p>
          Five internships. Different environments.
          <br />
          One enduring desire to learn and build.
        </p>
      </div>
      <div className="experience-layout">
        <div className="experience-art">
          <div className={`exhibit-object object-${active}`}>
            <div className="exhibit-loop loop-one" />
            <div className="exhibit-loop loop-two" />
            <div className="exhibit-loop loop-three" />
          </div>
          <div className="exhibit-plinth" />
          <div className="exhibit-caption mono">
            <span>STUDY {experiences[active].id} / 05</span>
            <span>{experiences[active].field}</span>
          </div>
          <span className="exhibit-watermark">e.</span>
        </div>
        <div className="experience-entries" ref={archive}>
          {experiences.map((exp, index) => (
            <article
              key={exp.id}
              data-index={index}
              className={`experience-entry ${active === index ? "active" : ""}`}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
            >
              <button
                className="experience-trigger"
                onClick={() => {
                  setExpanded(expanded === index ? null : index);
                  setActive(index);
                }}
                aria-expanded={expanded === index}
                aria-controls={`experience-${index}`}
              >
                <span className="mono exp-number">{exp.id}</span>
                <span>
                  <span className="mono exp-company">
                    {exp.company || "COMPANY TO BE ADDED"} ·{" "}
                    {exp.dates || "DATES PENDING"}
                  </span>
                  <h3>{exp.role}</h3>
                </span>
                {expanded === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence initial={false}>
                {expanded === index && (
                  <motion.div
                    id={`experience-${index}`}
                    className="experience-detail"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35 }}
                  >
                    <p>{exp.theme}</p>
                    <div className="exp-skills mono">
                      {exp.skills.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    <p className="editable-note">
                      {exp.responsibilities ||
                        "Role confirmed. Company, dates, responsibilities, and achievements are editable and awaiting verification."}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Skills() {
  const [selected, setSelected] = useState<string | null>(null);
  const skill = skillGroups
    .flatMap((g) => g.skills)
    .find((s) => s.name === selected);
  return (
    <section className="skills-section section-wrap" id="skills">
      <SectionLabel number="04">THE TECHNICAL ARSENAL</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2>
          Tools are extensions
          <br />
          <em>of imagination.</em>
        </h2>
        <p>
          The right tools don’t replace thinking.
          <br />
          They give it somewhere to go.
        </p>
      </div>
      <div className="skills-layout">
        <div className="skill-orbit" aria-hidden="true">
          <div className="skill-orbit-ring" />
          <div className="skill-orbit-ring ring-tilted" />
          <span className="orbit-center">✳</span>
          <span className="orbit-word orbit-python">Python</span>
          <span className="orbit-word orbit-react">React</span>
          <span className="orbit-word orbit-ai">AI</span>
          <span className="orbit-word orbit-data">Data</span>
          <span className="mono orbit-caption">
            A CONSTELLATION OF POSSIBILITIES
          </span>
        </div>
        <div className="skill-groups">
          {skillGroups.map((group, i) => (
            <div className="skill-group" key={group.title} data-reveal>
              <span className="mono skill-category">
                <span>0{i + 1}</span>
                {group.title}
              </span>
              <div className="skill-list">
                {group.skills.map((s) => (
                  <button
                    aria-pressed={selected === s.name}
                    key={s.name}
                    onClick={() => setSelected(s.name)}
                    onFocus={() => setSelected(s.name)}
                    onMouseEnter={() => setSelected(s.name)}
                  >
                    {s.name}
                    <span>↗</span>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="skill-description" aria-live="polite">
            <span className="status-dot" />
            <p>
              {skill ? (
                <>
                  <strong>{skill.name}</strong> — {skill.description}
                </>
              ) : (
                "Select a technology to explore its role in the toolkit."
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
function Beyond() {
  return (
    <section className="beyond-section section-wrap" id="beyond">
      <SectionLabel number="05">BEYOND THE SCREEN</SectionLabel>
      <div className="section-heading" data-reveal>
        <h2>
          Because there’s more
          <br />
          to me <em>than code.</em>
        </h2>
        <p>
          Good ideas rarely happen in one place.
          <br />
          These are a few of mine.
        </p>
      </div>
      <div className="interest-grid">
        {interests.map((interest, i) => (
          <article
            className={`interest interest-${i}`}
            key={interest.title}
            data-reveal
          >
            <div className="interest-art" aria-hidden="true">
              <span>{interest.symbol}</span>
              {i === 0 && <div className="chess-board" />}
              {i === 1 && <div className="badminton-lines" />}
              {i === 2 && <div className="book-lines" />}
            </div>
            <div className="interest-info">
              <span className="mono">{interest.number} / OFFLINE</span>
              <h3>{interest.title}</h3>
              <p>{interest.subtitle}</p>
            </div>
          </article>
        ))}
      </div>
      <p className="beyond-note">
        Different pursuits. <em>The same curiosity.</em>
      </p>
    </section>
  );
}
export function Contact() {
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
    <section className="contact-section section-wrap" id="contact">
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
function Ambient() {
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
export default function Portfolio() {
  return (
    <>
      <Opening />
      <Header />
      <main id="main">
        <Hero />
        <div className="chapter-divider">
          <span className="mono">
            INTELLIGENCE IS A JOURNEY, NOT A DESTINATION.
          </span>
          <span>✳</span>
          <span className="mono">THIS IS MINE.</span>
        </div>
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Beyond />
        <Contact />
      </main>
      <Footer />
      <Ambient />
      <ExperienceRuntime />
    </>
  );
}
