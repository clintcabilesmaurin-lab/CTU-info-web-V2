import { campus } from "../data/campus.js";
import ThreeScene from "./ThreeScene.jsx";

export default function Hero() {
  return (
    <section className="hero" id="home" aria-labelledby="hero-title">
      <div className="hero__grain" aria-hidden="true"></div>
      <div className="hero__inner page-width">
        <div className="hero-copy">
          <p className="eyebrow eyebrow--light"><span className="eyebrow-dot"></span> CEBU TECHNOLOGICAL UNIVERSITY · NAGA</p>
          <h1 id="hero-title">Learn with purpose.<br /><em>Lead with impact.</em></h1>
          <p className="hero-copy__lead">A place for curiosity, practical learning, and ideas that move communities forward. Welcome to the CTU Naga Extension Campus.</p>
          <div className="hero-actions">
            <a className="button button--gold" href="#services">Explore student services <span aria-hidden="true">↗</span></a>
            <a className="button button--line" href="#news">Discover campus stories <span aria-hidden="true">↓</span></a>
          </div>
          <div className="hero-foot">
            <span>KNOWLEDGE</span><i></i><span>INNOVATION</span><i></i><span>SERVICE</span>
          </div>
        </div>

        <div className="hero-visual" aria-label="CTU Naga campus seal surrounded by a 3D orbital sculpture">
          <ThreeScene />
          <div className="hero-visual__grid" aria-hidden="true"></div>
          <div className="hero-seal">
            <span className="hero-seal__orbit" aria-hidden="true"></span>
            <img src="/assets/ctu-logo.png" alt="Cebu Technological University seal" />
          </div>
          <div className="hero-note hero-note--top"><span>01</span> A CAMPUS OF POSSIBILITY</div>
          <div className="hero-note hero-note--bottom"><strong>{campus.established}</strong><span>ESTABLISHED IN NAGA</span></div>
          <span className="hero-visual__cross hero-visual__cross--one" aria-hidden="true">+</span>
          <span className="hero-visual__cross hero-visual__cross--two" aria-hidden="true">+</span>
        </div>
      </div>
      <div className="hero-bottom">
        <span>CTU NAGA EXTENSION CAMPUS</span>
        <span>CITY OF NAGA · CEBU · PHILIPPINES</span>
      </div>
    </section>
  );
}
