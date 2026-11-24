import { officialLinks } from "../data/campus.js";

const eventResources = [
  {
    index: "01",
    title: "Academic Calendar & Activities",
    description: "Check official academic dates, campus activities, and university announcements before making plans.",
    href: officialLinks.calendar,
    action: "Open campus calendar"
  },
  {
    index: "02",
    title: "Student Organizations & Campus Life",
    description: "Explore student groups, cultural affairs, sports, wellness, and opportunities to take part in campus life.",
    href: officialLinks.organizations,
    action: "Explore student activities"
  }
];

export default function EventsSection() {
  return (
    <section className="section events-section" id="events" aria-labelledby="events-title">
      <div className="page-width">
        <div className="events-heading reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"></span> MAKE ROOM FOR WHAT'S NEXT</p>
            <h2 id="events-title">Be part of<br /><em>the moment.</em></h2>
          </div>
          <p className="section-intro">Find the official campus calendar and activity channels. Dates are maintained by CTU, so use the official listings for confirmed schedules.</p>
        </div>
        <div className="event-resources">
          {eventResources.map((item) => (
            <a className="event-resource reveal" href={item.href} target="_blank" rel="noreferrer" key={item.index}>
              <span className="event-resource__index">{item.index}</span>
              <span className="event-resource__content">
                <strong>{item.title}</strong>
                <span>{item.description}</span>
                <b>{item.action} ↗</b>
              </span>
              <span className="event-resource__arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
