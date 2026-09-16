const ITEMS = [
  "ICU",
  "Addiction medicine",
  "AI builder",
  "Public-interest data",
  "Gardener",
  "Bay paddler",
  "World Cup flag carrier",
];

export default function Ticker() {
  const sequence = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {sequence.map((item, i) => (
          <span key={`${item}-${i}`}>
            {item} <b>✦</b>
          </span>
        ))}
      </div>
    </div>
  );
}
