import { ScrambleLabel } from "../../shared/ScrambleLabel";
import { SummaryLinks } from "../../shared/SummaryLinks";
import { FooterReveals } from "./FooterReveals";
export function Footer() {
  return (
    <footer
      className="site-footer section-panel"
      aria-labelledby="footer-title"
    >
      <div className="frame">
        <div className="footer-main">
          <div className="footer-invitation">
            <h2 id="footer-title">
              Let’s put your next
              <br />
              idea to work
            </h2>
            <div className="footer-actions">
              <button type="button" className="button solid" data-brief="call">
                <ScrambleLabel>Book A Call</ScrambleLabel>
              </button>
              <button type="button" className="button" data-brief="audit">
                <ScrambleLabel>Book Free Audit</ScrambleLabel>
              </button>
            </div>
          </div>
          <div className="footer-directory">
            <nav aria-labelledby="sitemap-title">
              <h3 id="sitemap-title">Sitemap</h3>
              <ul>
                <li>
                  <a href="#home">
                    <ScrambleLabel>Home</ScrambleLabel>
                  </a>
                </li>
                <li>
                  <a href="#about">
                    <ScrambleLabel>About us</ScrambleLabel>
                  </a>
                </li>
                <li>
                  <a href="#work">
                    <ScrambleLabel>Our work</ScrambleLabel>
                  </a>
                </li>
                <li>
                  <a href="#services">
                    <ScrambleLabel>Services</ScrambleLabel>
                  </a>
                </li>
                <li>
                  <a href="#testimonials">
                    <ScrambleLabel>Testimonials</ScrambleLabel>
                  </a>
                </li>
              </ul>
            </nav>
            <div>
              <h3>Connect</h3>
              <ul>
                <li>
                  <a
                    href="https://www.linkedin.com/company/trumarkagency"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ScrambleLabel>LinkedIn</ScrambleLabel>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/trumarkagency/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ScrambleLabel>Instagram</ScrambleLabel>
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3>Offices</h3>
              <ul>
                <li>Kathmandu</li>
              </ul>
            </div>
            <nav className="footer-admin" aria-labelledby="admin-title">
              <h3 id="admin-title">Admin</h3>
              <ul>
                <li>
                  <button
                    type="button"
                    className="footer-text-button"
                    data-brief="audit"
                  >
                    <ScrambleLabel>Book free audit</ScrambleLabel>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div className="footer-summary">
          <p>Ask AI for a summary of Trumark</p>
          <SummaryLinks icons />
        </div>
      </div>
      <FooterReveals />
    </footer>
  );
}
