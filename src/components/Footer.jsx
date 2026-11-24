import { campus, officialLinks } from "../data/campus.js";

export default function Footer() {
  return (
    <footer className="site-footer" id="contact">
      <div className="page-width">
        <div className="footer-main">
          <div className="footer-brand">
            <img src="/assets/ctu-logo.png" alt="Cebu Technological University seal" loading="lazy" />
            <p>Learn with purpose.<br /><em>Lead with impact.</em></p>
          </div>
          <div className="footer-contact">
            <p className="eyebrow eyebrow--light">VISIT THE CAMPUS</p>
            <address>{campus.address}</address>
            <a href={`tel:${campus.phone.replaceAll(" ", "")}`}>{campus.phone}</a>
            <a href={`mailto:${campus.email}`}>{campus.email}</a>
          </div>
          <div className="footer-links">
            <p className="eyebrow eyebrow--light">EXPLORE CTU NAGA</p>
            <a href={officialLinks.about} target="_blank" rel="noreferrer">About the campus ↗</a>
            <a href={officialLinks.programs} target="_blank" rel="noreferrer">Academic programs ↗</a>
            <a href={officialLinks.news} target="_blank" rel="noreferrer">Campus news ↗</a>
            <a href={officialLinks.offices} target="_blank" rel="noreferrer">Campus offices ↗</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Cebu Technological University – Naga Extension Campus</span>
          <span>Student information website concept · Not an official CTU publication</span>
        </div>
      </div>
    </footer>
  );
}
