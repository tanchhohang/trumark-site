import { ScrambleLabel } from "../../shared/ScrambleLabel";
import type { CSSProperties } from "react";
import { services } from "./services";
import { ServiceEntrance } from "./ServiceEntrance";
export function Expertise() {
  return (
    <div className="section-track" id="services">
      <section className="expertise" aria-labelledby="services-title">
        <div className="expertise-copy">
          <h2 className="eyebrow" id="services-title">
            <span>Area of expertise</span>
          </h2>
          <p className="section-intro">
            Bring us in for one part of a project, or work with us from the
            first brand sketches through launch.
          </p>
          {/* <a className="button" href="#all-services">
            <ScrambleLabel>All Services</ScrambleLabel>
          </a> */}
        </div>
        <ol className="service-list">
          {services.map(({ name, words, gradient, description }) => (
            <li
              className="service"
              key={name}
              tabIndex={0}
              style={{ "--service-gradient": gradient } as CSSProperties}
            >
              <h3>
                <span className="service-word">
                  <ScrambleLabel>{words[0]}</ScrambleLabel>
                </span>
                <span className="service-preview" aria-hidden="true"></span>
                {words[1] && (
                  <>
                    {" "}
                    <span className="service-word">
                      <ScrambleLabel>{words[1]}</ScrambleLabel>
                    </span>
                  </>
                )}
              </h3>
              <div className="service-detail">
                <div>
                  <p>{description}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <ServiceEntrance />
      </section>
    </div>
  );
}
