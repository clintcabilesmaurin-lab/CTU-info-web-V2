import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ThreeScene from "./components/ThreeScene.jsx";
import Reveal from "./components/Reveal.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const news = [
  {
    date: "20 NOV 2026",
    category: "CAMPUS & COMMUNITY",
    title: "Life-saving skills in BLS and First Aid",
    summary: "CTU–Naga brought practical emergency-response knowledge to the community through a basic life support and first aid workshop.",
    href: "https://www.ctu.edu.ph/naga/"
  },
  {
    date: "19 NOV 2026",
    category: "UNIVERSITY DEVELOPMENT",
    title: "ICPA capacity-building training",
    summary: "Campus representatives completed a four-day university-wide capacity-building activity in Camotes.",
    href: "https://www.ctu.edu.ph/naga/"
  },
  {
    date: "19 NOV 2026",
    category: "CAMPUS ACHIEVEMENT",
    title: "Faculty secures fourth place in charter anniversary competitions",
    summary: "CTU–Naga faculty members earned fourth place overall in the 17th Charter Anniversary competitions.",
    href: "https://www.ctu.edu.ph/naga/"
  }
];

const services = [
  { number: "01", title: "Registrar's Office", description: "For enrollment records, academic documents, and student registration concerns.", href: "https://www.ctu.edu.ph/naga/about/all-offices/" },
  { number: "02", title: "Library Services", description: "Find learning resources and campus library support for your studies.", href: "https://www.ctu.edu.ph/naga/about/all-offices/" },
  { number: "03", title: "Campus Directory", description: "Find the right campus office and its official contact information.", href: "https://www.ctu.edu.ph/naga/about/all-offices/" },
  { number: "04", title: "Academic Programs", description: "Explore undergraduate and graduate program information published by CTU.", href: "https://www.ctu.edu.ph/naga/academics/undergraduate-programs/" }
];

const programs = [
  { code: "BEEd", name: "Bachelor in Elementary Education", type: "UNDERGRADUATE" },
  { code: "BSEd", name: "Bachelor of Secondary Education · Mathematics", type: "UNDERGRADUATE" },
  { code: "BTLEd", name: "Bachelor in Technology and Livelihood Education · Home Economics", type: "UNDERGRADUATE" },
  { code: "MAEd", name: "Master of Arts in Education", type: "GRADUATE" },
  { code: "MAVEd", name: "Master in Vocational Education", type: "GRADUATE" },
  { code: "MPA", name: "Master in Public Administration", type: "GRADUATE" }
];

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

export default function App() {
  const pageRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
    intro.from(".utility-bar", { y: -18, opacity: 0, duration: 0.55 })
      .from(".site-header", { y: -18, opacity: 0, duration: 0.65 }, "-=0.3")
      .from(".hero-copy > *", { y: 28, opacity: 0, duration: 0.8, stagger: 0.12 }, "-=0.2")
      .from(".hero-visual", { x: 30, opacity: 0, duration: 1 }, "-=0.75");
  }, { scope: pageRef });

  const closeMenu = () => setMenuOpen(false);

  return (
    <div ref={pageRef}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <div className="utility-bar">
        <div className="container utility-inner">
          <span>REPUBLIC OF THE PHILIPPINES <i /> CEBU TECHNOLOGICAL UNIVERSITY</span>
          <a href="https://www.ctu.edu.ph/naga/">OFFICIAL CAMPUS WEBSITE <Arrow /></a>
        </div>
      </div>

      <header className="site-header">
        <div className="container header-inner">
          <a className="brand" href="#home" aria-label="CTU Naga home">
            <img src="/assets/ctu-logo.png" alt="Cebu Technological University seal" />
            <span><strong>CEBU TECHNOLOGICAL</strong><b>UNIVERSITY</b><small>NAGA EXTENSION CAMPUS</small></span>
          </a>
          <button className="menu-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
          <nav className={menuOpen ? "primary-nav is-open" : "primary-nav"} aria-label="Primary">
            <a href="#home" onClick={closeMenu}>Home</a>
            <a href="#about" onClick={closeMenu}>About</a>
            <a href="#news" onClick={closeMenu}>Campus News</a>
            <a href="#services" onClick={closeMenu}>Student Services</a>
            <a href="#programs" onClick={closeMenu}>Programs</a>
          </nav>
          <a className="header-cta" href="#contact">Get in touch <Arrow /></a>
        </div>
      </header>

      <main id="main-content">
        <section className="hero" id="home">
          <div className="hero-grid container">
            <div className="hero-copy">
              <div className="eyebrow"><span /> CTU NAGA EXTENSION CAMPUS <span className="eyebrow-line" /></div>
              <h1>Learn with purpose.<br /><em>Lead with impact.</em></h1>
              <p className="hero-lead">A place to build knowledge, discover your potential, and turn learning into meaningful service for the community.</p>
              <div className="hero-actions">
                <a className="button button-primary" href="#about">Discover our campus <Arrow /></a>
                <a className="button button-quiet" href="#programs">Explore programs <span aria-hidden="true">↓</span></a>
              </div>
              <div className="hero-meta"><span>01 / 03</span><span>ACCESS · EXCELLENCE · EQUITY</span></div>
            </div>
            <div className="hero-visual">
              <div className="hero-photo">
                <img src="https://www.ctu.edu.ph/naga/wp-content/uploads/sites/26/2024/11/CTU-Naga-Campus.jpg" alt="Cebu Technological University Naga Extension Campus building" onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=1200&q=85"; }} />
                <div className="photo-shade" />
                <div className="photo-caption"><span>THE CAMPUS</span><strong>Learning rooted in community.</strong></div>
              </div>
              <div className="hero-orbit-wrap"><ThreeScene /></div>
              <div className="hero-index"><span>CTU</span><strong>NAGA</strong><small>CEBU · PH</small></div>
              <div className="hero-side-note">KNOWLEDGE IN MOTION</div>
            </div>
          </div>
          <div className="hero-bottom"><span>SCROLL TO EXPLORE</span><span /></div>
        </section>

        <section className="stats-band" aria-label="Campus overview">
          <div className="container stats-grid">
            <div><strong>2013</strong><span>Campus established</span></div>
            <div><strong>2014</strong><span>Academic operations began</span></div>
            <div><strong>6</strong><span>Programs listed on CTU pages</span></div>
            <div><strong>Naga</strong><span>Central Poblacion · Cebu</span></div>
          </div>
        </section>

        <Reveal>
          <section className="section about-section" id="about">
            <div className="container">
              <div className="section-kicker" data-reveal>01 — GET TO KNOW US</div>
              <div className="section-heading" data-reveal>
                <h2>A campus with<br /><em>a community spirit.</em></h2>
                <p>Rooted in the City of Naga, CTU Naga Extension Campus brings public higher education closer to learners and communities in southern Cebu.</p>
              </div>
              <div className="about-layout">
                <div className="about-image" data-reveal>
                  <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=1200&q=85" alt="University students walking together on a campus" loading="lazy" />
                  <span>01 / A PLACE TO GROW</span>
                </div>
                <div className="about-story" data-reveal>
                  <span className="story-index">A SHORT HISTORY</span>
                  <p className="story-lead">From a shared city vision to a growing place of learning.</p>
                  <p>CTU Naga was established on September 5, 2013 through an agreement between Cebu Technological University and the City Government of Naga. Classes began in 2014–2015 in a renovated former market building.</p>
                  <p>The campus building was inaugurated on January 28, 2019, continuing the partnership that brings accessible higher education to the community.</p>
                  <a className="text-link" href="https://www.ctu.edu.ph/naga/about/campus-history/">Explore campus history <Arrow /></a>
                  <div className="about-values"><div><b>01</b><span>Access</span></div><div><b>02</b><span>Excellence</span></div><div><b>03</b><span>Equity</span></div></div>
                </div>
              </div>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section programs-section" id="programs">
            <div className="container">
              <div className="section-kicker" data-reveal>02 — ACADEMIC PATHWAYS</div>
              <div className="section-heading section-heading-row" data-reveal>
                <h2>Find your <em>direction.</em></h2>
                <p>Program names below are drawn from CTU's published Naga campus listings. Confirm current availability and admission requirements with the campus.</p>
              </div>
              <div className="program-list">
                {programs.map((program, index) => <a className="program-row" href="https://www.ctu.edu.ph/naga/academics/undergraduate-programs/" key={program.code} data-reveal>
                  <span className="program-number">0{index + 1}</span><span className="program-code">{program.code}</span><span className="program-name">{program.name}</span><span className="program-type">{program.type}</span><Arrow />
                </a>)}
              </div>
              <a className="text-link program-more" href="https://www.ctu.edu.ph/naga/academics/">View official academic information <Arrow /></a>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section news-section" id="news">
            <div className="container">
              <div className="section-kicker" data-reveal>03 — WHAT'S HAPPENING</div>
              <div className="section-heading section-heading-row" data-reveal>
                <h2>Stories from <em>CTU–Naga.</em></h2>
                <a className="text-link" href="https://www.ctu.edu.ph/naga/">All campus updates <Arrow /></a>
              </div>
              <div className="news-grid">
                {news.map((item, index) => <article className="news-card" key={item.title} data-reveal>
                  <div className={`news-art news-art-${index + 1}`}><span>{item.category}</span><strong>0{index + 1}</strong><i>CTU NAGA</i></div>
                  <div className="news-body"><div className="news-date">{item.date}</div><h3>{item.title}</h3><p>{item.summary}</p><a className="text-link" href={item.href}>Read campus update <Arrow /></a></div>
                </article>)}
              </div>
              <p className="source-note">News titles and dates are based on the official CTU Naga website as checked on November 24, 2026.</p>
            </div>
          </section>
        </Reveal>

        <Reveal>
          <section className="section services-section" id="services" aria-label="Student services">
            <div className="container">
              <div className="section-kicker" data-reveal>04 — SUPPORT FOR STUDENTS</div>
              <div className="section-heading section-heading-row" data-reveal>
                <h2>Here to help you <em>move forward.</em></h2>
                <p>Find the campus office or academic information you need. Office contacts and services can change, so use the official directory for the latest details.</p>
              </div>
              <div className="services-grid">
                {services.map((service) => <article className="service-card" key={service.number} data-reveal>
                  <span className="service-number">{service.number}</span><div><h3>{service.title}</h3><p>{service.description}</p><a href={service.href}>Visit resource <Arrow /></a></div>
                </article>)}
              </div>
            </div>
          </section>
        </Reveal>

        <section className="contact-section" id="contact">
          <div className="contact-orbit"><ThreeScene /></div>
          <div className="container contact-inner">
            <div className="section-kicker">05 — CONNECT WITH THE CAMPUS</div>
            <h2>Your next chapter<br /><em>starts here.</em></h2>
            <p>Need campus information? Reach out through the official CTU Naga contact channels.</p>
            <div className="contact-actions"><a className="button button-light" href="mailto:cdnaga@ctu.edu.ph">cdnaga@ctu.edu.ph <Arrow /></a><a className="contact-phone" href="tel:+63324895509">(032) 489-5509 / 489-5510</a></div>
            <div className="contact-address">CENTRAL POBLACION, CITY OF NAGA, CEBU, PHILIPPINES</div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <a className="brand footer-brand" href="#home"><img src="/assets/ctu-logo.png" alt="" /><span><strong>CEBU TECHNOLOGICAL</strong><b>UNIVERSITY</b><small>NAGA EXTENSION CAMPUS</small></span></a>
          <p>Learn with purpose.<br />Lead with impact.</p>
          <div className="footer-links"><a href="https://www.ctu.edu.ph/naga/">Official Website</a><a href="https://www.ctu.edu.ph/naga/about/">About CTU Naga</a><a href="https://www.ctu.edu.ph/naga/about/all-offices/">Campus Directory</a></div>
        </div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} CTU Naga Campus Information Website</span><span>Student website concept · Not an official CTU publication</span></div>
      </footer>
      <a className="back-top" href="#home" aria-label="Back to top">↑</a>
    </div>
  );
}
