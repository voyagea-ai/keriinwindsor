const items = [
  "Kesar",
  "Alphonso",
  "Banganpalli",
  "Limited Batches",
  "Farm to Door",
  "Windsor & Essex",
  "Season 2026",
];

export default function Marquee() {
  const row = (
    <>
      {items.map((item) => (
        <span key={item} className="flex items-center">
          <span className="kicker px-8 py-5 text-[11px] text-cream/45">{item}</span>
          <span className="size-1 rounded-full bg-mango/60" />
        </span>
      ))}
    </>
  );

  return (
    <div className="overflow-hidden border-y border-cream/5 bg-ink-2" aria-hidden>
      <div className="marquee-track">
        {row}
        {row}
      </div>
    </div>
  );
}
