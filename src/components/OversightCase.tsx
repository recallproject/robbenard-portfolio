import { motion } from "framer-motion";
import FacilityBrief from "./FacilityBrief";
import { CONTACT } from "../content";

const fade = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function OversightCase() {
  return (
    <section className="work wrap" id="work" aria-labelledby="work-title">
      <motion.div
        className="section-head"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={fade}
      >
        <div className="eyebrow">01 / Marquee</div>
        <div>
          <h2 id="work-title">Proof over pitch decks.</h2>
          <p className="section-lede">
            Selected work, built from the problem out. The headline is a live
            product families can actually use.
          </p>
        </div>
      </motion.div>

      <motion.article
        className="case"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={fade}
      >
        <div className="case-copy">
          <p className="case-kicker">Oversight Reports</p>
          <h3>Public records should help people, not bury them.</h3>
          <p>
            Oversight Reports turns fragmented nursing-home and post-acute
            safety data into a lookup families, journalists, and clinicians can
            actually finish. Search a facility. See inspections, staffing,
            fines, and ownership. Take a{" "}
            <strong>$29 Facility Brief</strong> on the visit.
          </p>
          <ul className="project-facts">
            <li>
              <strong>Built</strong>
              Public product + CMS data pipeline
            </li>
            <li>
              <strong>Role</strong>
              Product, clinical lens, implementation
            </li>
            <li>
              <strong>Covers</strong>
              Skilled nursing, hospice, home health, rehab
            </li>
            <li>
              <strong>Status</strong>
              Live — oversightreports.com
            </li>
          </ul>
          <div className="case-links">
            <a
              className="btn btn-ink"
              href={CONTACT.oversight}
              target="_blank"
              rel="noreferrer"
            >
              oversightreports.com ↗
            </a>
            <a className="btn" href="/docs/CRUSH_RFI_CMS-6098-NC_Benard_v3.pdf">
              CMS CRUSH comment
            </a>
            <a className="btn" href="/docs/HHS_OIG_Letter_Maxwell_March2026.pdf">
              HHS OIG letter
            </a>
          </div>
        </div>
        <FacilityBrief />
      </motion.article>
    </section>
  );
}
