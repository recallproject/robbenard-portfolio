import { useEffect, useRef, useState } from "react";
import { useCoarsePointer, usePrefersReducedMotion } from "../hooks/useMedia";
import HandoffDemo from "./HandoffDemo";
import AiDemo from "./AiDemo";

type Project = {
  num: string;
  title: string;
  preview: string;
  kind: "2" | "3";
  copy: string;
  facts: { k: string; v: string }[];
  demo: "handoff" | "ai";
};

const PROJECTS: Project[] = [
  {
    num: "02",
    title: "SUD warm-handoff pilot",
    preview: "Warm Handoff",
    kind: "2",
    copy: "A knowledge bot and follow-up tracker for emergency department discharges — built so substance-use navigators can keep higher-risk patients connected after they leave the hospital.",
    facts: [
      { k: "Setting", v: "Sutter" },
      { k: "Built", v: "Knowledge bot + navigator tracker" },
      { k: "Status", v: "Pilot in progress" },
    ],
    demo: "handoff",
  },
  {
    num: "03",
    title: "AI build demos",
    preview: "AI Build Demos",
    kind: "3",
    copy: "No grand keynote. Short, direct walkthroughs of tools built for clinical workflows: the problem, the build, and what changes for the person using it.",
    facts: [
      { k: "Format", v: "Interactive scenarios" },
      { k: "Approach", v: "Prototype, test, explain" },
      { k: "Status", v: "Working prototypes" },
    ],
    demo: "ai",
  },
];

export default function WorkIndex() {
  const coarse = useCoarsePointer();
  const reduced = usePrefersReducedMotion();
  const [hover, setHover] = useState<Project | null>(null);
  const pos = useRef({ x: 0, y: 0 });
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (coarse || reduced) return;
    let raf = 0;
    const loop = () => {
      const el = previewRef.current;
      if (el) {
        el.style.left = `${pos.current.x}px`;
        el.style.top = `${pos.current.y}px`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [coarse, reduced]);

  return (
    <section className="index wrap" aria-labelledby="index-title">
      <div className="section-head tight">
        <div className="eyebrow">Also in motion</div>
        <h2 id="index-title">Other builds, same habit.</h2>
      </div>
      <div className="work-index">
        {PROJECTS.map((project) => (
          <article
            key={project.num}
            className="project"
            onMouseEnter={() => {
              if (!coarse) setHover(project);
            }}
            onMouseMove={(e) => {
              pos.current = { x: e.clientX, y: e.clientY };
            }}
            onMouseLeave={() => setHover(null)}
          >
            <div className="project-num">{project.num}</div>
            <h3>{project.title}</h3>
            <div className="project-body">
              <p className="project-copy">{project.copy}</p>
              <ul className="project-facts">
                {project.facts.map((f) => (
                  <li key={f.k}>
                    <strong>{f.k}</strong>
                    {f.v}
                  </li>
                ))}
              </ul>
            </div>
            <span className="project-arrow" aria-hidden="true">
              →
            </span>
            {project.demo === "handoff" ? <HandoffDemo /> : <AiDemo />}
          </article>
        ))}
      </div>
      <div className="work-note">
        <span>Built from the problem out.</span>
        <span>More experiments are always in motion.</span>
      </div>
      {!coarse && (
        <div
          ref={previewRef}
          className={`preview ${hover ? "show" : ""}`}
          data-kind={hover?.kind}
          aria-hidden="true"
        >
          <small>Selected work</small>
          <strong>{hover?.preview}</strong>
          <small>Problem → Prototype → Product</small>
        </div>
      )}
    </section>
  );
}
