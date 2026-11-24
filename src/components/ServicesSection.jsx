import { services, officialLinks } from "../data/campus.js";

export default function ServicesSection() {
  return (
    <section className="section services-section" id="services" aria-labelledby="services-title">
      <div className="page-width">
        <div className="section-heading section-heading--services reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"></span> SUPPORT FOR YOUR NEXT STEP</p>
            <h2 id="services-title">Find what you<br /><em>need to thrive.</em></h2>
          </div>
          <div className="section-heading__aside">
            <p className="section-intro">A quick route to the campus resources students use most. Office schedules and requirements may change, so confirm details through the official campus channels.</p>
            <a className="text-link" href={officialLinks.offices} target="_blank" rel="noreferrer">Campus office directory <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article className={`service-card service-card--${service.tone} reveal`} key={service.number}>
              <div className="service-card__top"><span>{service.number}</span><span aria-hidden="true">↗</span></div>
              <p className="service-card__label">{service.label}</p>
              <h3>{service.title}</h3>
              <p className="service-card__description">{service.description}</p>
              <a href={service.href} target="_blank" rel="noreferrer">{service.action} <span aria-hidden="true">↗</span></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
