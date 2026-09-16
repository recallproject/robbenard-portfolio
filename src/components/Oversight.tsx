import { useRef, useState } from "react";
import { CONTACT, FACILITY } from "../content";
import { gsap, useGSAP } from "../lib/motion";
import { useDesktopPin, usePrefersReducedMotion } from "../hooks/useMedia";
import Magnetic from "./Magnetic";

const STAGES = ["signal", "lookup", "numbers", "brief", "ship"] as const;

export default function Oversight() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const desktop = useDesktopPin();
  const [stage, setStage] = useState(0);

  useGSAP(
    () => {
      if (!pin.current) return;
      pin.current.style.setProperty("--p", reduced || !desktop ? "1" : "0");
      if (reduced || !desktop) {
        setStage(4);
        return;
      }
      const tween = gsap.to(pin.current, {
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=320%",
          pin: pin.current,
          scrub: 0.85,
          onUpdate: (self) => {
            pin.current?.style.setProperty("--p", self.progress.toFixed(4));
            setStage(Math.min(4, Math.floor(self.progress * 5)));
          },
        },
      });
      return () => tween.scrollTrigger?.kill();
    },
    { dependencies: [reduced, desktop], scope: root }
  );

  return (
    <section
      id="oversight"
      data-reel="oversight"
      className="chapter oversight"
      aria-labelledby="oversight-title"
      ref={root}
    >
      <div className="oversight-pin" ref={pin} data-stage={STAGES[stage]}>
        <div className="oversight-copy">
          <p className="chapter-index invert">05 — Oversight</p>
          <h2 id="oversight-title">
            Public records
            <br />
            should help people.
          </h2>
          <p className="lede invert">
            Oversight Reports turns nursing-home and post-acute safety data into
            a lookup families, journalists, and clinicians can finish. Search a
            facility. See inspections, staffing, fines, ownership. Take a{" "}
            <strong>$29 Facility Brief</strong> on the visit.
          </p>
          <ul className="fact-rail">
            <li>
              <strong>Built</strong> Public product + CMS pipeline
            </li>
            <li>
              <strong>Role</strong> Product, clinical lens, implementation
            </li>
            <li>
              <strong>Covers</strong> SNF · hospice · home health · rehab
            </li>
          </ul>
          <div className="oversight-links">
            <Magnetic
              className="btn btn-glass-dark"
              href={CONTACT.oversight}
              target="_blank"
              rel="noreferrer"
            >
              oversightreports.com
            </Magnetic>
            <a className="btn btn-ghost-light" href="/docs/CRUSH_RFI_CMS-6098-NC_Benard_v3.pdf">
              CMS CRUSH
            </a>
            <a className="btn btn-ghost-light" href="/docs/HHS_OIG_Letter_Maxwell_March2026.pdf">
              HHS OIG
            </a>
          </div>
        </div>

        <div className="theater" aria-label="Facility Brief sequence">
          <div className="theater-chrome">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span>oversightreports.com / {FACILITY.ccn}</span>
            <b>Live</b>
          </div>
          <div className="theater-body">
            <p className="theater-kicker">Facility Brief · $29</p>
            <h3>{FACILITY.name}</h3>
            <p className="theater-meta">
              {FACILITY.city} · CCN {FACILITY.ccn} · {FACILITY.beds} beds
            </p>
            <div className="star-row">
              <strong>
                {FACILITY.stars}
                <em>/5</em>
              </strong>
              <span>CMS stars</span>
            </div>
            <dl className="stat-slam">
              <div>
                <dt>Deficiencies</dt>
                <dd>{FACILITY.deficiencies}</dd>
              </div>
              <div>
                <dt>Immediate jeopardy</dt>
                <dd>{FACILITY.jeopardy}</dd>
              </div>
              <div>
                <dt>Fines</dt>
                <dd>{FACILITY.fines}</dd>
              </div>
              <div>
                <dt>Composite risk</dt>
                <dd>{FACILITY.composite}</dd>
              </div>
            </dl>
            <div className="brief-sheet">
              <p>
                A printable family PDF for the visit — inspections, staffing,
                fines, ownership. Not a referral. Not a “best match.”
              </p>
              <p className="price">
                <b>$29</b> Facility Brief
              </p>
            </div>
            <a
              className="theater-cta"
              href={CONTACT.facilityExample}
              target="_blank"
              rel="noreferrer"
            >
              Open this facility live
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
