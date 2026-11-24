import { testimonials } from "./testimonials";
export function FeaturedWork() {
  return (
    <div className="section-track" id="work">
      <section className="clients split" aria-labelledby="work-title">
        <header>
          <h2 className="eyebrow" id="work-title">
            Featured work
          </h2>
          <p className="section-intro">
            We built eRuchi’s backend and redesigned its interface. For Hisab
            Kitab, we reworked the website. Here’s how the founders describe the
            work.
          </p>
        </header>
        <div className="quotes" id="testimonials">
          {testimonials.map(
            ({ company, card, logo, width, height, quote, name, role }) => (
              <figure key={company}>
                <div className={`client-photo ${card}`}>
                  <img
                    loading="lazy"
                    src={logo}
                    alt={company}
                    width={width}
                    height={height}
                  />
                </div>
                <blockquote>{quote}</blockquote>
                <figcaption>
                  <strong>{name}</strong>
                  {role}
                </figcaption>
              </figure>
            ),
          )}
        </div>
      </section>
    </div>
  );
}
