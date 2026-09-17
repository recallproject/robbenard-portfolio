import { motion } from "framer-motion";
import HeroGradient from "./HeroGradient";
import Magnetic from "./Magnetic";

const ease = [0.22, 1, 0.36, 1] as const;
const TITLE = ["I build", "what the", "shift needs."];

export default function Hook() {
  return (
    <section id="hook" data-reel="hook" className="chapter hook" aria-labelledby="hook-title">
      <HeroGradient />
      <div className="hook-veil" aria-hidden="true" />

      <div className="hook-layout">
        <div className="hook-copy">
          <motion.p
            className="hook-meta"
            initial={{ opacity: 0, y: 12, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, ease }}
          >
            <span>01 — Hook</span>
            Robert Benard · NP · Oakland
          </motion.p>
          <h1 id="hook-title" className="hook-title">
            {TITLE.map((line, i) => (
              <span key={line} className="line">
                <motion.span
                  initial={{ y: "115%", opacity: 0, filter: "blur(12px)" }}
                  animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.9, delay: 0.12 + i * 0.1, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p
            className="hook-deck"
            initial={{ opacity: 0, y: 16, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.48, ease }}
          >
            ICU and addiction-medicine nurse practitioner. I turn bedside
            problems into tools families and clinicians can actually finish.
          </motion.p>
          <motion.div
            className="hook-actions"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.62, ease }}
          >
            <Magnetic className="btn btn-glass" href="#oversight">
              See Oversight
            </Magnetic>
            <Magnetic className="btn btn-ghost-dark" href="#contact">
              Say hello
            </Magnetic>
          </motion.div>
        </div>

        <motion.figure
          className="hook-portrait"
          initial={{ opacity: 0, y: 28, filter: "blur(16px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1.05, delay: 0.2, ease }}
        >
          <img
            src="/images/hook-portrait.jpg"
            alt="Robert Benard, nurse practitioner, in a white coat with a stethoscope"
            width={1200}
            height={1200}
          />
          <figcaption>
            <span>ICU / consult NP</span>
            <span>Builder, Oversight Reports</span>
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
