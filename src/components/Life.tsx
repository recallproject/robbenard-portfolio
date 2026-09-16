import { motion } from "framer-motion";

const SNAPS = [
  {
    src: "/images/life-kayak.jpg",
    alt: "Robert smiling from a kayak on the Bay",
    cap: "Paddles the Bay",
  },
  {
    src: "/images/life-corn.jpg",
    alt: "Freshly harvested ears of corn in front of tall stalks",
    cap: "Grew this",
  },
  {
    src: "/images/life-dogs.jpg",
    alt: "Oscar and Gizmo sitting together by the front door",
    cap: "They run the household",
  },
  {
    src: "/images/life-patio.jpg",
    alt: "Garden patio with sunflowers, bougainvillea, and bright blue chairs",
    cap: "Always growing",
  },
];

const SEEDS = ["Corn", "Tomatillos", "Titan sunflowers", "Software", "Ideas"];

export default function Life() {
  return (
    <section className="grow" id="life" aria-labelledby="life-title">
      <div className="wrap">
        <motion.div
          className="grow-head"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
        >
          <div className="eyebrow">02 / Off the clock</div>
          <div>
            <h2 id="life-title">
              I grow
              <br />
              things.
            </h2>
            <p className="grow-intro">
              <strong>Corn, tomatillos, titan sunflowers, software, ideas.</strong>{" "}
              I like starting with possibility, getting my hands dirty, and
              seeing what happens. Also: paddling the Bay, and once carrying a
              World Cup flag onto the pitch.
            </p>
          </div>
        </motion.div>

        <div className="photo-strip" aria-label="Life outside work">
          {SNAPS.map((snap, i) => (
            <motion.figure
              className="snap"
              key={snap.src}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06 }}
            >
              <div className="snap-media parallax">
                <img src={snap.src} alt={snap.alt} />
              </div>
              <figcaption>{snap.cap}</figcaption>
            </motion.figure>
          ))}
        </div>

        <div className="seed-line" aria-label="Things Robert grows">
          {SEEDS.map((seed) => (
            <span key={seed}>{seed}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
