import { useEffect, useState } from "react";

const LINKS = [
  { href: "#work", label: "Work" },
  { href: "#life", label: "Life" },
  { href: "#about", label: "About" },
];

export default function Nav() {
  const [progress, setProgress] = useState(0);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const ids = ["work", "life", "about", "contact"];
    let ticking = false;

    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
      let next = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) next = id;
      }
      setCurrent(next);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const pct = Math.min(99, Math.round(progress * 100));

  return (
    <header className="topbar">
      <div className="wrap topbar-inner">
        <a className="brand" href="#top">
          <span className="brand-mark" aria-hidden="true" />
          Robert Benard
        </a>
        <nav aria-label="Primary">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={current === link.href.slice(1) ? "active" : undefined}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="topbar-end">
          <span className="scroll-pct" aria-hidden="true">
            {String(pct).padStart(2, "0")}
          </span>
          <a className="top-cta" href="#contact">
            Say hello ↗
          </a>
        </div>
      </div>
      <div
        className="progress"
        style={{ width: `${progress * 100}%` }}
        aria-hidden="true"
      />
    </header>
  );
}
