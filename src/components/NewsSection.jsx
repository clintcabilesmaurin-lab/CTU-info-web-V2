import { news, officialLinks } from "../data/campus.js";

export default function NewsSection() {
  return (
    <section className="section news-section" id="news" aria-labelledby="news-title">
      <div className="page-width">
        <div className="section-heading reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"></span> THE CAMPUS, IN MOTION</p>
            <h2 id="news-title">Stories worth<br /><em>sharing.</em></h2>
          </div>
          <p className="section-intro">The latest stories and achievements from the CTU Naga community, linked directly to the university's official updates.</p>
          <a className="text-link" href={officialLinks.news} target="_blank" rel="noreferrer">All campus news <span aria-hidden="true">↗</span></a>
        </div>
        <div className="news-grid">
          {news.map((item, index) => (
            <article className={`news-card reveal ${index === 0 ? "news-card--feature" : ""}`} key={item.url}>
              <a className="news-card__image" href={item.url} target="_blank" rel="noreferrer" aria-label={`Read: ${item.title}`}>
                <img src={item.image} alt={item.imageAlt} loading="lazy" />
                <span className="news-card__image-arrow" aria-hidden="true">↗</span>
              </a>
              <div className="news-card__body">
                <div className="news-meta"><span>{item.category}</span><time dateTime={item.dateTime}>{item.date}</time></div>
                <h3><a href={item.url} target="_blank" rel="noreferrer">{item.title}</a></h3>
                <p>{item.summary}</p>
                <a className="text-link" href={item.url} target="_blank" rel="noreferrer">Read the story <span aria-hidden="true">↗</span></a>
              </div>
            </article>
          ))}
        </div>
        <p className="content-source">News and photographs sourced from the official CTU Naga website. Last checked: November 24, 2026.</p>
      </div>
    </section>
  );
}
