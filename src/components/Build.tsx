import { useState } from "react";
import Reveal from "./Reveal";

const PROTOCOLS = [
  {
    id: "vent",
    label: "Vent wean note",
    result: "Next clinician inherits the plan — not the folklore from night shift.",
  },
  {
    id: "bridge",
    label: "Buprenorphine bridge",
    result: "Induction steps and a clinic slot. The 24-hour window stays open.",
  },
  {
    id: "brief",
    label: "Family brief",
    result: "Inspections, staffing, fines — one page they can finish before the visit.",
  },
];

export default function Build() {
  const [armed, setArmed] = useState<(typeof PROTOCOLS)[number] | null>(null);
  const [nudge, setNudge] = useState({ hr: 78, map: 84 });

  return (
    <section id="build" data-reel="build" className="chapter build" aria-labelledby="build-title">
      <Reveal>
        <p className="chapter-index">04 — Build</p>
        <h2 id="build-title">A console you can actually use.</h2>
        <p className="lede">
          Drag the pad. Numbers follow. Arm a protocol. Same habit as the real
          work: smallest tool, tested with the person who would click it.
        </p>
      </Reveal>

      <Reveal delay={0.08} className="console-wrap">
        <div
          className="console"
          onPointerMove={(e) => {
            const box = e.currentTarget.getBoundingClientRect();
            const x = (e.clientX - box.left) / box.width;
            const y = (e.clientY - box.top) / box.height;
            setNudge({
              hr: Math.round(56 + x * 70),
              map: Math.round(62 + (1 - y) * 42),
            });
          }}
        >
          <header>
            <span>Night-shift toy · no PHI</span>
            <b>Responsive</b>
          </header>
          <dl>
            <div>
              <dt>HR</dt>
              <dd>{nudge.hr}</dd>
            </div>
            <div>
              <dt>MAP</dt>
              <dd>{nudge.map}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{armed ? "Armed" : "Idle"}</dd>
            </div>
          </dl>
          <div className="protocols">
            {PROTOCOLS.map((p) => (
              <button
                key={p.id}
                type="button"
                className={armed?.id === p.id ? "on" : undefined}
                onClick={() => setArmed(p)}
              >
                {p.label}
              </button>
            ))}
          </div>
          <p className="console-out">
            {armed
              ? armed.result
              : "Arm a protocol. The pad is a demo — the product is what leaves the room."}
          </p>
        </div>
      </Reveal>
    </section>
  );
}
