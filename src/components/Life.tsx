import { CONTACT } from "../content";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";

const SNAPS = [
  { src: "/images/life-kayak.jpg", alt: "Robert smiling from a kayak on the Bay", cap: "Paddle" },
  { src: "/images/life-corn.jpg", alt: "Freshly harvested ears of corn in front of tall stalks", cap: "Corn" },
  { src: "/images/life-dogs.jpg", alt: "Oscar and Gizmo sitting together by the front door", cap: "Household" },
  { src: "/images/life-patio.jpg", alt: "Garden patio with sunflowers, bougainvillea, and bright blue chairs", cap: "Garden" },
];

export default function Life() {
  return (
    <section id="life" data-reel="life" className="chapter life" aria-labelledby="life-title">
      <Reveal>
        <p className="chapter-index">07 — Life</p>
        <h2 id="life-title">Garden. Paddle. Flag.</h2>
        <p className="lede">
          Corn, tomatillos, titan sunflowers, software, ideas. I like starting
          with possibility and getting my hands dirty. Also: paddling the Bay,
          and once carrying a World Cup flag onto the pitch.
        </p>
      </Reveal>
      <div className="life-grid" aria-label="Life outside work">
        {SNAPS.map((snap, i) => (
          <Reveal key={snap.src} delay={i * 0.05} className="life-shot">
            <figure>
              <img src={snap.src} alt={snap.alt} />
              <figcaption>{snap.cap}</figcaption>
            </figure>
          </Reveal>
        ))}
      </div>

      <div className="contact-block" id="contact">
        <Reveal>
          <p className="chapter-index">Hello</p>
          <h2>Make something useful.</h2>
          <p className="lede">
            Clinical AI, healthcare product, public-data ideas that should not
            stay in a deck. Thoughtful conversations only.
          </p>
          <div className="contact-row">
            <Magnetic className="btn btn-ink" href={`mailto:${CONTACT.email}`}>
              {CONTACT.email}
            </Magnetic>
            <Magnetic
              className="btn btn-ghost-dark"
              href={CONTACT.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </Magnetic>
            <Magnetic
              className="btn btn-ghost-dark"
              href={CONTACT.oversight}
              target="_blank"
              rel="noreferrer"
            >
              Oversight
            </Magnetic>
          </div>
          <footer className="site-foot">
            <span>Robert Benard / NP + builder</span>
            <span>Oakland · Bay Area</span>
            <span>Email / LinkedIn TODOs in src/content.ts</span>
          </footer>
        </Reveal>
      </div>
    </section>
  );
}
