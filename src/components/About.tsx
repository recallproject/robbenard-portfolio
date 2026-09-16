import { motion } from "framer-motion";

const ROLES = [
  { title: "ICU / Critical Care NP", place: "Sutter / CPMC" },
  {
    title: "Addiction Medicine Consult NP",
    place: "Highland Hospital / Alameda Health",
  },
  { title: "Builder, Oversight Reports", place: "Product + clinical lens" },
];

export default function About() {
  return (
    <section className="about wrap" id="about" aria-label="About Robert">
      <div className="about-grid">
        <div className="eyebrow">03 / About</div>
        <motion.p
          className="about-copy"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          I work as an ICU nurse practitioner in the Sutter / CPMC world and on
          the addiction medicine consult service at Highland Hospital.{" "}
          <em>I’m at my best where clinical judgment, curiosity, and building meet.</em>
        </motion.p>
        <div className="about-side">
          <figure className="portrait">
            <img
              src="/images/about-smile.jpg"
              alt="Close portrait of Robert Benard smiling in a white coat"
              width={1100}
              height={1100}
            />
            <figcaption>Oakland / Bay Area</figcaption>
          </figure>
          <ul className="roles" aria-label="Current roles">
            {ROLES.map((role) => (
              <li key={role.title}>
                <strong>{role.title}</strong>
                <small>{role.place}</small>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
