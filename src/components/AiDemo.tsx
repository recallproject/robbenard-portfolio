import { useState } from "react";

const STEPS = [
  {
    title: "The stall",
    body: "The protocol lives in one person’s head — dosing, follow-up, who to call. The bedside does not have time for another portal.",
  },
  {
    title: "The smallest build",
    body: "A knowledge bot, a tracker, a report a family can finish. Prototype it with the person who would actually click it.",
  },
  {
    title: "What changes",
    body: "The clinician keeps judgment. The tool keeps the checklist, the source, and the next step. Fewer dropped threads after discharge.",
  },
];

export default function AiDemo() {
  const [i, setI] = useState(0);
  const step = STEPS[i];

  return (
    <div className="lab">
      <p className="lab-label">AI build · scenario reel</p>
      <div className="stepper">
        <div className="step-tabs">
          {STEPS.map((s, idx) => (
            <button
              key={s.title}
              type="button"
              className={idx === i ? "on" : undefined}
              onClick={() => setI(idx)}
            >
              0{idx + 1}
            </button>
          ))}
        </div>
        <div className="step-panel">
          <h4>{step.title}</h4>
          <p>{step.body}</p>
        </div>
      </div>
    </div>
  );
}
