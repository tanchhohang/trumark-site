import { Fragment } from "react";
import { services } from "../expertise/services";
import { PanelNavigation } from "./PanelNavigation";
export function Panels() {
  return (
    <>
      <PanelNavigation />
      <dialog
        id="all-services"
        aria-labelledby="all-services-label"
        data-panel=""
      >
        <button type="button" className="close" aria-label="Close All services">
          ×
        </button>
        <h2 id="all-services-label">All services</h2>
        {services.map((service) => (
          <Fragment key={service.name}>
            <h3>{service.name}</h3>
            <p>{service.description}</p>
          </Fragment>
        ))}
      </dialog>
      <dialog id="blog" aria-labelledby="blog-label" data-panel="">
        <button type="button" className="close" aria-label="Close Blog">
          ×
        </button>
        <h2 id="blog-label">Blog</h2>
        <article>
          <h3>What should I bring to a first call?</h3>
          <p>
            Bring a link to your current site, a sense of who uses it, and one
            or two things you want to improve. A rough brief is enough to start.
          </p>
        </article>
        <p className="panel-links">
          <a href="#faq">Studio FAQ</a>{" · "}
          <a href="#contact-options">Contact the studio</a>
        </p>
      </dialog>
      <dialog id="faq" aria-labelledby="faq-label" data-panel="">
        <button type="button" className="close" aria-label="Close FAQ">
          ×
        </button>
        <h2 id="faq-label">FAQ</h2>
        <div className="faq-list">
          <details name="questions">
            <summary>Can we work with you on just one service?</summary>
            <p>
              Yes. Bring us a single brief for branding, strategy, development,
              or marketing. We can also bring those disciplines together for a
              larger project.
            </p>
          </details>
          <details name="questions">
            <summary>Can you work with an existing brand or website?</summary>
            <p>
              Yes. The Hisab Kitab project began with an existing website. For
              eRuchi, the work included both the interface and the backend.
            </p>
          </details>
          <details name="questions">
            <summary>What should I bring to a first call?</summary>
            <p>
              Bring a link to your current site, a sense of who uses it, and one
              or two things you want to improve. A rough brief is enough to
              start.
            </p>
          </details>
          <details name="questions">
            <summary>How do we plan the budget and timeline?</summary>
            <p>
              Start with what you need to launch, any dates you’re working
              towards, and your budget range. Those details help us agree on the
              scope together.
            </p>
          </details>
        </div>
      </dialog>
    </>
  );
}
