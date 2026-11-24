import { openingPosition } from "./opening-state";
import { ScrambleLabel } from "../../shared/ScrambleLabel";
import { HeroIntro } from "./HeroIntro";
export function Hero() {
  return (
    <div className="hero-sequence" id="home">
      <HeroIntro />
      <header className="hero">
        <a
          className="hero-mark"
          href="#home"
          aria-label="Trumark Agency home"
        ></a>
        <div className="hero-copy">
          <h1>
            A results-driven creative and technology partner for brands ready to
            leave their mark.
          </h1>
          <div className="lead">
            <p>
              A creative and technology partner specialising in building
              memorable brands and digital experiences that deliver results.
            </p>
            <div className="actions">
              <button className="button light" type="button" data-brief="call">
                <ScrambleLabel>Book A Call</ScrambleLabel>
              </button>
              <button className="button" type="button" data-brief="audit">
                <ScrambleLabel>Book Free Audit</ScrambleLabel>
              </button>
            </div>
          </div>
        </div>
        <a
          className="scroll-cue"
          href="#about"
          aria-label="Scroll down to About us"
        >
          <ScrambleLabel>Scroll</ScrambleLabel>
          <svg
            viewBox="0 0 12 12"
            width="0.9em"
            height="0.9em"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M6 1v10M2 7l4 4 4-4" />
          </svg>
        </a>
      </header>
      <script>{openingPosition}</script>
    </div>
  );
}
