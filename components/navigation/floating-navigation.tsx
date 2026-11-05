"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Menu, X } from "lucide-react";
import { chapters } from "@/lib/art-direction";
import { personal } from "@/lib/content";
import { Smiley, Burst } from "@/components/cinematic/graphics";
export default function FloatingNavigation() {
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  useEffect(() => {
    const previous = document.body.style.overflow;
    if (open) {
      dialog.current?.showModal();
      document.body.style.overflow = "hidden";
    } else if (dialog.current?.open) {
      dialog.current.close();
      button.current?.focus();
    }
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <>
      <header className="floating-header">
        <Link
          className="identity-mark"
          href="/#awakening"
          aria-label={`${personal.name} home`}
        >
          <span>
            SP<span>®</span>
          </span>
          <span>
            {personal.name.toUpperCase()}
            <small>INDEPENDENT MIND. INTERNET NATIVE.</small>
          </span>
        </Link>
        <span className="header-note mono">
          PERSONAL EXPERIMENT / {new Date().getFullYear()}
          <br />
          <span className="nav-scene-name">WELCOME TO MY INTERNET.</span>
        </span>
        <button
          className="nav-open"
          ref={button}
          aria-haspopup="dialog"
          aria-expanded={open}
          onClick={() => setOpen(true)}
        >
          <span>MENU</span>
          <span className="menu-icon">
            <Menu size={19} />
          </span>
        </button>
      </header>
      <dialog
        className="navigation-dialog"
        ref={dialog}
        data-lenis-prevent
        aria-labelledby="navigation-title"
        onCancel={() => setOpen(false)}
      >
        <button
          className="navigation-close"
          onClick={() => setOpen(false)}
          aria-label="Close navigation"
        >
          <span>CLOSE</span>
          <X size={24} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              className="navigation-layout"
              initial={reduced ? false : { clipPath: "inset(0 0 100% 0)" }}
              animate={{ clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="navigation-poster">
                <span className="mono">NO WRONG TURNS. ONLY NEW TABS.</span>
                <h2 id="navigation-title">
                  JUMP
                  <br />
                  RIGHT
                  <br />
                  IN
                  <ArrowDownRight />
                </h2>
                <Smiley />
                <Burst />
                <span className="mono">
                  {personal.name.toUpperCase()}®<br />
                  THE INTERNET IS MY CANVAS.
                </span>
              </div>
              <nav aria-label="Main navigation">
                {chapters.map((chapter, i) => (
                  <motion.div
                    key={chapter.id}
                    initial={reduced ? false : { x: 40, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: reduced ? 0 : 0.06 * i }}
                  >
                    <Link
                      href={`/#${chapter.id}`}
                      onClick={() => setOpen(false)}
                    >
                      <span className="mono">0{i + 1}</span>
                      <span>{chapter.label}</span>
                      <ArrowUpRight />
                    </Link>
                  </motion.div>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </dialog>
    </>
  );
}
