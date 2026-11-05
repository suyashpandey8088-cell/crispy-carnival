import { projectThemes } from "@/lib/art-direction";
import type { Project } from "@/lib/content";
import { Burst, Smiley } from "./graphics";
export function ProjectArtwork({
  visual,
  large = false,
}: {
  visual: Project["visual"];
  large?: boolean;
}) {
  const theme = projectThemes[visual];
  return (
    <div
      className={`project-artwork artwork-${visual} ${large ? "artwork-large" : ""}`}
      style={
        {
          "--art-bg": theme.bg,
          "--art-ink": theme.ink,
          "--art-accent": theme.accent,
        } as React.CSSProperties
      }
      aria-label={`Editorial visual for ${theme.label.toLowerCase()}, not a product screenshot`}
      role="img"
    >
      <div className="art-grid" aria-hidden="true" />
      {visual === "neural" && (
        <div className="code-universe" aria-hidden="true">
          <div className="code-fragment fragment-a">
            {"{ curiosity: Infinity }"}
          </div>
          <div className="code-fragment fragment-b">{"</ordinary>"}</div>
          <div className="terminal-pane art-pane">
            <div className="window-chrome">
              <span>● ● ●</span>
              <span>review_assistant.py</span>
              <span>↗</span>
            </div>
            <div className="terminal-content">
              <span className="terminal-number">01</span>
              <p>
                <span>def</span> build_what_is_next():
                <br />
                &nbsp;&nbsp;idea = <b>&quot;question everything&quot;</b>
                <br />
                &nbsp;&nbsp;<span>return</span> intelligence + intention
                <br />
                <br />
                <i># a second set of eyes</i>
                <br />
                {">"} CONTEXT_LOADED
                <br />
                {">"} REVIEW_REQUESTED<span className="terminal-caret">▌</span>
              </p>
              <strong>{"{ }"}</strong>
            </div>
            <div className="terminal-footer">
              AI × HUMAN CURIOSITY <span>ILLUSTRATIVE CONCEPT</span>
            </div>
          </div>
          <span className="code-stamp">
            GOOD CODE.
            <br />
            BETTER QUESTIONS.
          </span>
          <Burst className="code-burst" />
        </div>
      )}
      {visual === "prediction" && (
        <div className="data-universe" aria-hidden="true">
          <div className="data-axis" />
          <div className="data-orbit" />
          <span className="data-infinity">∞</span>
          <div className="dimensional-bars">
            {[23, 47, 35, 67, 51, 89, 74, 100].map((height, i) => (
              <i key={i} style={{ height: `${height}%` }} />
            ))}
          </div>
          <div className="data-ticket art-pane">
            <span className="mono">PREDICTION.LAB</span>
            <strong>
              DATA INTO
              <br />
              DIRECTION.
            </strong>
            <span className="mono">INPUT → PATTERN → POSSIBILITY</span>
          </div>
          <span className="data-label mono">
            NO CRYSTAL BALL.
            <br />
            JUST BETTER QUESTIONS.
          </span>
        </div>
      )}
      {visual === "rag" && (
        <div className="rag-universe" aria-hidden="true">
          <svg className="connection-lines" viewBox="0 0 800 600">
            <path
              d="M80 200 400 350 680 150M100 500 400 350 690 520M400 350 400 70"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeDasharray="7 6"
            />
          </svg>
          <div className="document doc-one art-pane">
            <span className="mono">SOURCE_01.PDF ↗</span>
            <strong>Aa</strong>
            <i />
            <i />
            <i />
          </div>
          <div className="document doc-two art-pane">
            <span className="mono">CONTEXT.TXT</span>
            <strong>
              THE
              <br />
              DOTS.
            </strong>
            <i />
            <i />
          </div>
          <div className="rag-core">
            <span>RETRIEVE.</span>
            <strong>CONNECT.</strong>
            <span>GENERATE.</span>
          </div>
          <div className="context-stamp">
            CONTEXT
            <br />
            IS KING.
          </div>
          <div className="rag-node node-one" />
          <div className="rag-node node-two" />
        </div>
      )}
      {visual === "web" && (
        <div className="web-universe" aria-hidden="true">
          <div className="browser-behind art-pane">
            <div className="window-chrome">
              <span>● ● ●</span>
              <span>what_if.html</span>
            </div>
            <span>
              MAKE
              <br />
              SOME
              <br />
              NOISE.
            </span>
          </div>
          <div className="experimental-browser art-pane">
            <div className="window-chrome">
              <span>● ● ●</span>
              <span>the_internet_is_a_playground.com</span>
              <span>↗</span>
            </div>
            <strong>
              WHAT
              <br />
              <em>IF?</em>
            </strong>
            <Smiley />
            <div className="browser-status mono">
              STATUS: CREATIVELY UNSTABLE.
            </div>
          </div>
          <Burst className="browser-burst" />
        </div>
      )}
      {visual === "data" && (
        <div className="extra-universe" aria-hidden="true">
          <div className="experiment-orbit" />
          <span className="extra-type">
            WHY
            <br />
            NOT<span>?</span>
          </span>
          <div className="extra-tile">
            WORK IN
            <br />
            PROGRESS ↗
          </div>
          <Burst />
          <span className="extra-bottom mono">
            SMALL EXPERIMENTS. BIG QUESTIONS.
          </span>
        </div>
      )}
      <span className="artwork-caption mono">
        EDITORIAL STUDY / NOT A PRODUCT SCREENSHOT
      </span>
    </div>
  );
}
