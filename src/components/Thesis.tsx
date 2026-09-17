import { useRef } from "react";
import { gsap, useGSAP } from "../lib/motion";
import { useDesktopPin, usePrefersReducedMotion } from "../hooks/useMedia";

const WORDS = "A clinician who ships tools families and clinicians actually use.".split(" ");

export default function Thesis() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const desktop = useDesktopPin();

  useGSAP(
    () => {
      if (reduced || !desktop || !pin.current) return;
      const words = pin.current.querySelectorAll("[data-word]");
      gsap.set(words, { yPercent: 110, opacity: 0, filter: "blur(10px)" });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "+=130%",
          pin: pin.current,
          scrub: 0.8,
        },
      });
      tl.to(words, {
        yPercent: 0,
        opacity: 1,
        filter: "blur(0px)",
        stagger: 0.05,
        ease: "power3.out",
      });
      return () => tl.scrollTrigger?.kill();
    },
    { dependencies: [reduced, desktop], scope: root }
  );

  return (
    <section
      id="thesis"
      data-reel="thesis"
      className="chapter thesis"
      aria-labelledby="thesis-title"
      ref={root}
    >
      <div className="thesis-pin" ref={pin}>
        <p className="chapter-index">02 — Thesis</p>
        <h2 id="thesis-title" className="thesis-line">
          {WORDS.map((word, i) => (
            <span key={`${word}-${i}`} className="word-clip">
              <span data-word>{word}</span>
            </span>
          ))}
        </h2>
        <p className="thesis-sting">Not a résumé. A short reel of work that left the shift.</p>
      </div>
    </section>
  );
}
