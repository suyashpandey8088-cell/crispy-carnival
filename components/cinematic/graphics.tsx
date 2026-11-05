"use client";
import { useId } from "react";
import Image from "next/image";
export function ChromeSticker({
  className = "",
  priority = false,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <button
      className={`chrome-sticker ${className}`}
      aria-label="Play with the chrome sculpture"
      data-cursor="PLAY"
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse") return;
        const r = event.currentTarget.getBoundingClientRect();
        event.currentTarget.style.setProperty(
          "--mx",
          `${(event.clientX - r.left - r.width / 2) * 0.09}px`,
        );
        event.currentTarget.style.setProperty(
          "--my",
          `${(event.clientY - r.top - r.height / 2) * 0.09}px`,
        );
      }}
      onPointerLeave={(event) => {
        event.currentTarget.style.setProperty("--mx", "0px");
        event.currentTarget.style.setProperty("--my", "0px");
      }}
      onClick={(event) => {
        const next = (Number(event.currentTarget.dataset.turn) || 0) + 45;
        event.currentTarget.dataset.turn = String(next);
        event.currentTarget.style.setProperty("--turn", `${next}deg`);
      }}
    >
      <Image
        src="/images/chrome-chaos.webp"
        alt="Inflated liquid-chrome star with iridescent reflections"
        fill
        priority={priority}
        sizes="(max-width: 760px) 70vw, 42vw"
      />
    </button>
  );
}
export function Smiley({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`smiley ${className}`}
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="46"
        fill="currentColor"
        stroke="#080808"
        strokeWidth="3"
      />
      <ellipse cx="35" cy="39" rx="5" ry="9" fill="#080808" />
      <ellipse cx="65" cy="39" rx="5" ry="9" fill="#080808" />
      <path
        d="M25 58c4 25 45 28 51 0"
        stroke="#080808"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
export function Burst({ className = "" }: { className?: string }) {
  return (
    <svg
      className={`burst ${className}`}
      viewBox="0 0 200 200"
      aria-hidden="true"
    >
      <path
        fill="currentColor"
        d="m100 0 14 57 37-45-10 58 55-20-35 46 39 28-58 3 17 57-45-36-14 52-14-52-45 36 17-57-58-3 39-28L4 50l55 20-10-58 37 45z"
      />
    </svg>
  );
}
export function CircularSeal({
  className = "",
  text = "NOT YOUR AVERAGE PORTFOLIO. KEEP EXPLORING. ",
}: {
  className?: string;
  text?: string;
}) {
  const id = useId().replace(/:/g, "");
  return (
    <div className={`circular-seal ${className}`} aria-hidden="true">
      <svg viewBox="0 0 160 160">
        <defs>
          <path
            id={id}
            d="M80,80 m-60,0 a60,60 0 1,1 120,0 a60,60 0 1,1 -120,0"
          />
        </defs>
        <circle
          cx="80"
          cy="80"
          r="79"
          fill="#f5f2ea"
          stroke="#080808"
          strokeWidth="2"
        />
        <text fontSize="11" fontWeight="600" letterSpacing="1.5">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <Smiley />
    </div>
  );
}
export function Tape({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`marquee-tape ${className}`} aria-hidden="true">
      <div className="marquee-inner">
        {Array.from({ length: 6 }, (_, i) => (
          <span key={i}>{children} </span>
        ))}
      </div>
    </div>
  );
}
export function Barcode({ className = "" }: { className?: string }) {
  return <div className={`barcode ${className}`} aria-hidden="true" />;
}
