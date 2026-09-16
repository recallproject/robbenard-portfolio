import { useRef, useState } from "react";
import { BEDSIDE } from "../content";
import { gsap, useGSAP } from "../lib/motion";
import { useDesktopPin, usePrefersReducedMotion } from "../hooks/useMedia";
import Reveal from "./Reveal";

export default function Bedside() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const desktop = useDesktopPin();
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      if (reduced || !desktop || !pin.current) return;
      const st = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=200%",
          pin: pin.current,
          scrub: 0.7,
          onUpdate: (self) => {
            setActive(
              Math.min(BEDSIDE.length - 1, Math.floor(self.progress * BEDSIDE.length))
            );
          },
        },
      });
      return () => st.scrollTrigger?.kill();
    },
    { dependencies: [reduced, desktop], scope: root }
  );

  const scene = BEDSIDE[active];

  return (
    <section
      id="bedside"
      data-reel="bedside"
      className="chapter bedside"
      aria-labelledby="bedside-title"
      ref={root}
    >
      <div className="bedside-pin" ref={pin}>
        <Reveal>
          <p className="chapter-index">03 — Bedside</p>
          <h2 id="bedside-title">Clinical identity as a night, not a CV.</h2>
        </Reveal>
        <div className="timeline">
          <ol>
            {BEDSIDE.map((item, i) => (
              <li key={item.id}>
                <button
                  type="button"
                  className={i === active ? "on" : undefined}
                  onClick={() => setActive(i)}
                >
                  <em>{item.stamp}</em>
                  {item.kicker}
                </button>
              </li>
            ))}
          </ol>
          <article className="scene" key={scene.id}>
            <p className="scene-tag">{scene.tag}</p>
            <h3>
              {scene.title.split("\n").map((line) => (
                <span key={line}>{line}</span>
              ))}
            </h3>
            <p>{scene.body}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
