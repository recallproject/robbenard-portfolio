import { useRef, useState } from "react";
import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import { useCoarsePointer, usePrefersReducedMotion } from "../hooks/useMedia";

const CHIPS = [
  { label: "ICU NP", x: "8%", y: "22%" },
  { label: "Oakland", x: "78%", y: "18%" },
  { label: "Oversight", x: "72%", y: "72%" },
];

export default function Hero() {
  const stageRef = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();
  const coarse = useCoarsePointer();
  const [magnet, setMagnet] = useState({ x: 0, y: 0 });

  return (
    <section
      id="top"
      className="hero"
      aria-labelledby="hero-title"
      ref={stageRef}
      onPointerMove={(e) => {
        if (coarse || reduced || !stageRef.current) return;
        const rect = stageRef.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width - 0.5;
        const ny = (e.clientY - rect.top) / rect.height - 0.5;
        setMagnet({ x: nx, y: ny });
      }}
      onPointerLeave={() => setMagnet({ x: 0, y: 0 })}
    >
      <ParticleField />
      <div className="wrap hero-grid">
        <div className="hero-portrait">
          <motion.div
            className="portrait-frame"
            style={{
              x: reduced ? 0 : magnet.x * 14,
              y: reduced ? 0 : magnet.y * 10,
            }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
          >
            <img
              src="/images/hero-stethoscope.webp"
              alt="Robert Benard, nurse practitioner, in a white coat with a stethoscope"
              width={800}
              height={1204}
            />
          </motion.div>
          {CHIPS.map((chip) => (
            <motion.span
              key={chip.label}
              className="float-chip"
              style={{
                left: chip.x,
                top: chip.y,
                x: reduced ? 0 : magnet.x * 22,
                y: reduced ? 0 : magnet.y * 16,
              }}
              transition={{ type: "spring", stiffness: 60, damping: 16 }}
            >
              {chip.label}
            </motion.span>
          ))}
        </div>

        <div className="hero-copy">
          <p className="hero-meta">
            <span>
              Robert Benard
              <br />
              Nurse practitioner + builder
            </span>
            <span>
              Healthcare / public data
              <br />
              Oakland, California
            </span>
          </p>
          <h1 className="hero-title" id="hero-title">
            <span className="line">Clinical</span>
            <span className="line accent">Builder.</span>
            <span className="line underline">Human.</span>
          </h1>
          <p className="hero-deck">
            <strong>I turn bedside problems into working tools.</strong> ICU and
            addiction medicine by day.{" "}
            <em>Building the better way</em> whenever I can.
          </p>
          <a className="hero-scroll" href="#work">
            One scroll, the whole story
            <i aria-hidden="true">↓</i>
          </a>
        </div>
      </div>
    </section>
  );
}
