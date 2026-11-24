import { ScrambleLabel } from "../../shared/ScrambleLabel";
import { MenuBehavior } from "./MenuBehavior";
export function Header() {
  return (
    <nav className="site-nav" aria-label="Main navigation">
      <MenuBehavior />
      <a className="wordmark" href="#home" aria-label="Trumark Agency home">
        <span className="wordmark-name" aria-hidden="true">
          trumark<sup>®</sup>
        </span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-label="Navigation menu"
        aria-expanded="false"
        aria-controls="nav-panel"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className="nav-panel" id="nav-panel">
        <div className="nav-index">
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#work">Our Work</a>
        </div>
        <div className="nav-studio">
          <span>Kathmandu, Nepal</span>
          <a href="#contact-options">
            <ScrambleLabel>Contact us</ScrambleLabel>
          </a>
          <button type="button" data-brief="audit">
            <ScrambleLabel>Book Free Audit</ScrambleLabel>
          </button>
        </div>
      </div>
    </nav>
  );
}
