import Reveal from "./Reveal";
import HandoffDemo from "./HandoffDemo";
import AiDemo from "./AiDemo";

export default function Experiments() {
  return (
    <section
      id="experiments"
      data-reel="experiments"
      className="chapter experiments"
      aria-labelledby="labs-title"
    >
      <Reveal>
        <p className="chapter-index">06 — Labs</p>
        <h2 id="labs-title">Same habit. Smaller rooms.</h2>
      </Reveal>
      <div className="labs-grid">
        <Reveal delay={0.05} className="lab-card">
          <header>
            <span>06.A</span>
            <h3>SUD warm-handoff</h3>
          </header>
          <p>
            Knowledge bot + navigator tracker for ED discharges — so higher-risk
            patients stay connected after they leave. Sutter pilot.
          </p>
          <HandoffDemo />
        </Reveal>
        <Reveal delay={0.12} className="lab-card">
          <header>
            <span>06.B</span>
            <h3>AI build demos</h3>
          </header>
          <p>
            No keynote. Problem → smallest tool → what changes for the person
            using it.
          </p>
          <AiDemo />
        </Reveal>
      </div>
    </section>
  );
}
