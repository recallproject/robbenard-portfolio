import { useState } from "react";

type Card = {
  id: string;
  label: string;
  note: string;
  status: "queue" | "connected";
};

const SEED: Card[] = [
  {
    id: "A",
    label: "ED discharge · higher-risk SUD",
    note: "Needs navigator follow-up within 24h",
    status: "queue",
  },
  {
    id: "B",
    label: "ED discharge · buprenorphine start",
    note: "Bridge prescription + clinic slot",
    status: "queue",
  },
  {
    id: "C",
    label: "ED discharge · housing unstable",
    note: "Warm handoff to community partner",
    status: "connected",
  },
];

export default function HandoffDemo() {
  const [cards, setCards] = useState(SEED);

  const move = (id: string) => {
    setCards((list) =>
      list.map((card) =>
        card.id === id
          ? {
              ...card,
              status: card.status === "queue" ? "connected" : "queue",
            }
          : card
      )
    );
  };

  return (
    <div className="demo">
      <p className="demo-label">Live-build mock · no PHI</p>
      <div className="handoff">
        {(["queue", "connected"] as const).map((col) => (
          <div key={col} className="handoff-col">
            <header>
              {col === "queue" ? "Navigator queue" : "Handed off"}
            </header>
            {cards
              .filter((c) => c.status === col)
              .map((card) => (
                <button
                  key={card.id}
                  type="button"
                  className="handoff-card"
                  onClick={() => move(card.id)}
                >
                  <strong>{card.label}</strong>
                  <span>{card.note}</span>
                  <em>{col === "queue" ? "Mark handed off" : "Return to queue"}</em>
                </button>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
