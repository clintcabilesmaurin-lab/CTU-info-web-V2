import { officialLinks } from "../data/campus.js";

const sampleEvents = [
  {
    index: "01",
    type: "ACADEMIC COMMUNITY",
    title: "Campus Academic Forum",
    description: "A sample event card for academic talks, learning sessions, and campus knowledge-sharing activities.",
    href: officialLinks.calendar,
    action: "Check the official calendar"
  },
  {
    index: "02",
    type: "STUDENT LIFE",
    title: "Student Organizations Open House",
    description: "A sample event card for student groups to introduce their activities and ways to get involved.",
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
          <p className="section-intro">Discover activities and opportunities around campus. Confirm dates and registration details through the official CTU channels.</p>
        </div>
        <p className="events-note">The cards below are sample entries for the website assignment, not confirmed CTU event announcements. Check the official calendar for verified schedules.</p>
        <div className="events-grid">
          {sampleEvents.map((event) => (
            <article className="event-card reveal" key={event.index}>
              <div className="event-card__date">
                <span>DATE</span>
                <strong>TBA</strong>
                <small>2026–2027</small>
              </div>
              <div className="event-card__body">
                <span className="event-card__type">{event.type}</span>
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <a href={event.href} target="_blank" rel="noreferrer">{event.action} <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
