import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { CONTACT, FACILITY } from "../content";

type Tab = "snapshot" | "staffing" | "brief";

function Count({ value, active, decimals = 0 }: { value: number; active: boolean; decimals?: number }) {
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!active) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setN(value);
      return;
    }
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / 900);
      const eased = 1 - (1 - t) ** 3;
      setN(value * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, value]);

  return <>{n.toFixed(decimals)}</>;
}

export default function FacilityBrief() {
  const [tab, setTab] = useState<Tab>("snapshot");
  const [active, setActive] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setActive(true);
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="brief" ref={ref}>
      <div className="brief-chrome">
        <span className="brief-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span>oversightreports.com</span>
        <span className="brief-live">Live</span>
      </div>
      <div className="brief-sheet">
        <div className="scanline" aria-hidden="true" />
        <div className="brief-head">
          <p className="eyebrow">Facility Brief · $29</p>
          <h3>{FACILITY.name}</h3>
          <p className="brief-loc">
            {FACILITY.city} · CCN {FACILITY.ccn} · {FACILITY.beds} beds
          </p>
        </div>
        <div className="brief-tabs" role="tablist" aria-label="Facility brief views">
          {(
            [
              ["snapshot", "Snapshot"],
              ["staffing", "Staffing"],
              ["brief", "Brief"],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              type="button"
              role="tab"
              aria-selected={tab === id}
              className={tab === id ? "on" : undefined}
              onClick={() => setTab(id)}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "snapshot" && (
          <div className="brief-body">
            <div className="stars">
              <strong>
                <Count value={FACILITY.stars} active={active} />
                /5
              </strong>
              <span>CMS stars</span>
            </div>
            <dl className="brief-stats">
              <div>
                <dt>Deficiencies</dt>
                <dd>
                  <Count value={FACILITY.deficiencies} active={active} />
                </dd>
              </div>
              <div>
                <dt>Immediate jeopardy</dt>
                <dd>
                  <Count value={FACILITY.jeopardy} active={active} />
                </dd>
              </div>
              <div>
                <dt>Fines</dt>
                <dd>{FACILITY.fines}</dd>
              </div>
              <div>
                <dt>Composite risk</dt>
                <dd>
                  <Count value={FACILITY.composite} active={active} decimals={1} />
                </dd>
              </div>
            </dl>
          </div>
        )}

        {tab === "staffing" && (
          <div className="brief-body">
            <dl className="brief-stats">
              <div>
                <dt>RN hours / resident day</dt>
                <dd>{FACILITY.rnHprd}</dd>
              </div>
              <div>
                <dt>Total staffing HPRD</dt>
                <dd>{FACILITY.staffing}</dd>
              </div>
              <div>
                <dt>Zero-RN days</dt>
                <dd>0.0%</dd>
              </div>
              <div>
                <dt>Beds</dt>
                <dd>{FACILITY.beds}</dd>
              </div>
            </dl>
            <p className="brief-note">
              Staffing and inspection figures are CMS public data, shown as-of
              the live facility page.
            </p>
          </div>
        )}

        {tab === "brief" && (
          <div className="brief-body brief-copy">
            <p>
              A printable family PDF for the visit: inspections, staffing,
              fines, and ownership in one place — not a referral, not a “best
              match.”
            </p>
            <p className="price">
              <b>$29</b> Facility Brief
            </p>
          </div>
        )}

        <motion.a
          className="brief-cta"
          href={CONTACT.facilityExample}
          target="_blank"
          rel="noreferrer"
          whileHover={{ x: 4 }}
        >
          Open this facility live ↗
        </motion.a>
      </div>
    </div>
  );
}
