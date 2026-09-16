import { CONTACT } from "../content";

export default function Contact() {
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <div className="wrap">
        <div className="contact-grid">
          <div className="eyebrow">04 / Say hello</div>
          <h2 id="contact-title">
            Let’s make
            <br />
            something
            <br />
            useful.
          </h2>
        </div>
        <p className="contact-copy">
          Clinical AI, healthcare product work, weirdly ambitious public-data
          ideas: I’m always up for a thoughtful conversation.
        </p>
        <div className="contact-links">
          <a className="contact-card" href={`mailto:${CONTACT.email}`}>
            <strong>Email</strong>
            <span>{CONTACT.email} ↗</span>
          </a>
          <a
            className="contact-card"
            href={CONTACT.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <strong>LinkedIn</strong>
            <span>robertbenard ↗</span>
          </a>
          <a
            className="contact-card"
            href={CONTACT.oversight}
            target="_blank"
            rel="noreferrer"
          >
            <strong>Oversight</strong>
            <span>oversightreports.com ↗</span>
          </a>
        </div>
        <footer>
          <span>Robert Benard / NP + builder</span>
          <span>Bay Area, California</span>
        </footer>
      </div>
    </section>
  );
}
