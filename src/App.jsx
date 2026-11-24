import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { campus, officialLinks } from "./data/campus.js";
import SiteNav from "./components/SiteNav.jsx";
import Hero from "./components/Hero.jsx";
import NewsSection from "./components/NewsSection.jsx";
import ServicesSection from "./components/ServicesSection.jsx";
import EventsSection from "./components/EventsSection.jsx";
import Footer from "./components/Footer.jsx";

gsap.registerPlugin(ScrollTrigger, useGSAP);

function usePageMotion(scope) {
  useGSAP(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.from(".hero-copy > *", {
      y: 28,
      autoAlpha: 0,
      duration: 0.85,
      stagger: 0.12,
      ease: "power3.out",
      delay: 0.12
    });

    gsap.utils.toArray(".reveal", scope.current).forEach((element) => {
      gsap.fromTo(element, { y: 28, autoAlpha: 0 }, {
        y: 0,
        autoAlpha: 1,
        duration: 0.72,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 88%", once: true }
      });
    });
  }, { scope });
}

function AboutSection() {
  return (
    <section className="section about-section" id="about" aria-labelledby="about-title">
      <div className="page-width">
        <div className="about-top reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"></span> ROOTED IN NAGA, BUILT FOR WHAT'S NEXT</p>
            <h2 id="about-title">A campus with<br /><em>a story to tell.</em></h2>
          </div>
          <p className="section-intro">A local campus shaped by partnership, learning, and service to the City of Naga and its surrounding communities.</p>
        </div>
        <div className="about-story">
          <div className="about-story__visual reveal">
            <div className="about-story__image">
              <img src="https://www.ctu.edu.ph/naga/wp-content/uploads/sites/26/2026/07/c5027691-ea6b-4b63-8c7c-2210617a8e97-1-1024x768.jpg" alt="CTU Naga campus community" loading="lazy" />
            </div>
            <span className="about-story__caption">CENTRAL POBLACION · CITY OF NAGA</span>
          </div>
          <div className="about-story__copy reveal">
            <span className="story-index">A SHORT CAMPUS HISTORY</span>
            <p>{campus.history}</p>
            <a className="text-link" href={officialLinks.about} target="_blank" rel="noreferrer">Read the campus history <span aria-hidden="true">↗</span></a>
            <div className="campus-stats">
              <div><strong>{campus.established}</strong><span>Established</span></div>
              <div><strong>{campus.opened}</strong><span>Operations began</span></div>
              <div><strong>{campus.degreeCount}</strong><span>Bachelor's degrees</span></div>
            </div>
          </div>
        </div>
        <div className="academic-strip reveal">
          <div>
            <p className="eyebrow"><span className="eyebrow-dot"></span> LEARNING PATHWAYS</p>
            <h3>Find the path<br /><em>that moves you.</em></h3>
          </div>
          <p>CTU Naga's official academics page lists six undergraduate bachelor's degrees and one special program. Check the current program list and admission requirements before applying.</p>
          <div className="academic-strip__actions">
            <a className="button button--dark" href={officialLinks.programs} target="_blank" rel="noreferrer">Undergraduate programs <span aria-hidden="true">↗</span></a>
            <a className="text-link" href={officialLinks.academics} target="_blank" rel="noreferrer">Academic information <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactBand() {
  return (
    <section className="contact-band">
      <div className="page-width contact-band__inner reveal">
        <div>
          <p className="eyebrow eyebrow--light"><span className="eyebrow-dot"></span> NEED TO GET IN TOUCH?</p>
          <h2>Your campus.<br /><em>Your community.</em></h2>
        </div>
        <div className="contact-band__details">
          <address>{campus.address}</address>
          <a href={`tel:${campus.phone.replaceAll(" ", "")}`}>{campus.phone}</a>
          <a href={`mailto:${campus.email}`}>{campus.email}</a>
          <a className="button button--gold" href="https://www.ctu.edu.ph/naga/contact-us/" target="_blank" rel="noreferrer">Campus contact details <span aria-hidden="true">↗</span></a>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  const pageRef = useRef(null);
  usePageMotion(pageRef);

  return (
    <div className="app-shell" ref={pageRef}>
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <SiteNav />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <NewsSection />
        <ServicesSection />
        <EventsSection />
        <ContactBand />
      </main>
      <Footer />
      <a className="back-to-top" href="#home" aria-label="Back to top">↑</a>
    </div>
  );
}
