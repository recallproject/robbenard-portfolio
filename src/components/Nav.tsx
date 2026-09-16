import { CONTACT, PERSON } from "../content";
import Magnetic from "./Magnetic";

const LINKS = [
  { href: "#bedside", label: "Story" },
  { href: "#oversight", label: "Oversight" },
  { href: "#life", label: "Life" },
  { href: "#contact", label: "Hello" },
];

type Props = {
  active: string;
  progress: number;
};

export default function Nav({ active, progress }: Props) {
  const current =
    active === "hook" || active === "thesis"
      ? "story"
      : active === "oversight" || active === "build" || active === "experiments"
        ? "oversight"
        : active === "life"
          ? "life"
          : "hello";

  return (
    <header className="nav-glass">
      <Magnetic href="#hook" className="brand">
        {PERSON.name}
      </Magnetic>
      <nav aria-label="Primary">
        {LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={
              (link.label === "Story" && current === "story") ||
              (link.label === "Oversight" && current === "oversight") ||
              (link.label === "Life" && current === "life") ||
              (link.label === "Hello" && current === "hello")
                ? "on"
                : undefined
            }
          >
            {link.label}
          </a>
        ))}
      </nav>
      <Magnetic
        className="btn btn-glass btn-sm"
        href={CONTACT.oversight}
        target="_blank"
        rel="noreferrer"
      >
        Live product
      </Magnetic>
      <div className="nav-progress" aria-hidden="true">
        <b style={{ width: `${Math.round(progress * 100)}%` }} />
      </div>
    </header>
  );
}
