export interface PostSection {
  heading: string;
  paragraphs: string[];
  list?: string[];
}

export interface Post {
  slug: string;
  title: string;
  metaTitle: string;
  description: string;
  date: string;
  readMinutes: number;
  intro: string[];
  sections: PostSection[];
  faq?: { q: string; a: string }[];
}

export const posts: Post[] = [
  {
    slug: "where-to-buy-indian-mangoes-in-windsor",
    title: "Where to Buy Indian Mangoes in Windsor, Ontario",
    metaTitle: "Where to Buy Indian Mangoes in Windsor, Ontario (2026 Guide)",
    description:
      "Looking for real Kesar or Alphonso mangoes in Windsor? Here's where to buy fresh Indian mangoes in Windsor–Essex, what they cost, and how doorstep delivery works.",
    date: "2026-07-10",
    readMinutes: 4,
    intro: [
      "If you grew up eating mangoes in India, you already know the truth: the mangoes in most Canadian grocery stores are not the same fruit. Tommy Atkins and Ataulfo have their place, but they are not a Kesar from the Gir foothills or a Ratnagiri Alphonso.",
      "The good news: you no longer need a trip to Brampton or Devon Road to get the real thing. Here's exactly how to buy authentic Indian mangoes in Windsor, Ontario — delivered to your door.",
    ],
    sections: [
      {
        heading: "The short answer: order from Keri In Windsor",
        paragraphs: [
          "Keri In Windsor imports premium Kesar and Alphonso mangoes directly from India in small seasonal batches, then delivers them across Windsor, LaSalle, Tecumseh, Belle River, Kingsville and the rest of Essex County — free, to your doorstep.",
          "Because batches are flown in at peak season and delivered within days of landing, the fruit ripens on your counter the way it would back home — with the aroma filling the kitchen before the box is even open.",
        ],
        list: [
          "Kesar Mango Box — 12 premium mangoes, $45 CAD",
          "Alphonso Mango Box — 12 premium mangoes, $50 CAD",
          "Free local delivery across Windsor–Essex",
          "No payment online — you pay when your box is confirmed and delivered",
        ],
      },
      {
        heading: "Why grocery-store mangoes disappoint",
        paragraphs: [
          "Supermarket mangoes are picked hard and green so they can survive weeks of shipping and cold storage. Chilling a mango before it ripens permanently damages its flavour enzymes — which is why store-bought fruit often tastes flat, fibrous or sour no matter how long you wait.",
          "Indian varieties like Kesar and Alphonso are treated differently: harvested at maturity, air-freighted during the season, and never cold-stored. That's the difference you can smell.",
        ],
      },
      {
        heading: "When can you buy Indian mangoes in Windsor?",
        paragraphs: [
          "The Indian mango season is short. Alphonso peaks from April to June; Kesar runs from May into early July. Batches land every two to three weeks during the season and routinely sell out before the next arrival.",
          "The best strategy is to pre-order: reserve your box, and you'll be contacted to confirm delivery the week your batch lands in Canada.",
        ],
      },
    ],
    faq: [
      {
        q: "Where can I buy real Alphonso mangoes in Windsor?",
        a: "Keri In Windsor delivers Ratnagiri Alphonso mangoes by the box ($50 CAD for 12) across Windsor and Essex County during the season. Pre-order online and pay only when your box is confirmed.",
      },
      {
        q: "How much do Indian mangoes cost in Windsor?",
        a: "A box of 12 premium Kesar mangoes is $45 CAD; a box of 12 Alphonso mangoes is $50 CAD. Local delivery across Windsor–Essex is free.",
      },
      {
        q: "Do you deliver Indian mangoes outside Windsor?",
        a: "Yes — weekly doorstep delivery covers Windsor, LaSalle, Tecumseh, Belle River, Kingsville and Leamington, with scheduled seasonal delivery runs to London, Toronto and Brampton.",
      },
    ],
  },
  {
    slug: "kesar-vs-alphonso-which-mango-to-buy",
    title: "Kesar vs Alphonso: Which Indian Mango Should You Buy?",
    metaTitle: "Kesar vs Alphonso Mangoes: Taste, Price & Which to Buy (2026)",
    description:
      "Kesar or Alphonso? Compare taste, texture, aroma, price and best uses of India's two most famous mangoes — and find out which box to order first.",
    date: "2026-07-10",
    readMinutes: 5,
    intro: [
      "Ask two Indian families which mango is best and you'll start a debate that outlasts the season. In one corner: Alphonso, the 'King of Mangoes' from Ratnagiri. In the other: Kesar, the 'Queen', from the Gir foothills of Gujarat.",
      "Both are extraordinary. Here's how they actually differ — and how to choose your first box.",
    ],
    sections: [
      {
        heading: "Alphonso: the king",
        paragraphs: [
          "Alphonso (Hapus) is dense, completely fibreless and almost custard-like, with a rich apricot-honey depth and a room-filling aroma. It's the mango by which every other mango is measured, and the reason Ratnagiri holds a GI tag.",
          "Choose Alphonso if you eat mangoes sliced and unadorned, or you're gifting a box to someone who knows their mangoes. Peak season: April to June.",
        ],
      },
      {
        heading: "Kesar: the queen",
        paragraphs: [
          "Kesar is named for saffron — the colour of its flesh. It's honey-sweet with a warm, spiced note, smooth and juicy, and it holds its character beautifully in aamras, lassi, kulfi and desserts.",
          "Choose Kesar if you love pulp-based dishes, want a slightly gentler price, or you're buying several boxes for a family that goes through mangoes fast. Peak season: May to early July.",
        ],
      },
      {
        heading: "Side by side",
        paragraphs: ["The honest comparison, box to box:"],
        list: [
          "Sweetness: both exceptional — Alphonso is richer, Kesar is brighter",
          "Texture: Alphonso is creamier; Kesar is smooth and juicy",
          "Aroma: Alphonso wins the room; Kesar wins the kitchen",
          "Best for aamras & desserts: Kesar",
          "Best for eating straight: Alphonso",
          "Price at Keri In Windsor: Kesar $45 / Alphonso $50 for a box of 12",
        ],
      },
      {
        heading: "The real answer",
        paragraphs: [
          "Order one of each. The season is short, the varieties peak weeks apart, and the debate is far more fun when it's happening at your own kitchen counter — in Windsor, Toronto or anywhere in Ontario we deliver.",
        ],
      },
    ],
  },
  {
    slug: "indian-mango-season-canada",
    title: "When Is Indian Mango Season in Canada?",
    metaTitle: "Indian Mango Season in Canada: 2026 Dates for Kesar & Alphonso",
    description:
      "Indian mango season in Canada runs roughly April to July. See exact 2026 timing for Alphonso and Kesar, why batches sell out, and how to reserve a box in Ontario.",
    date: "2026-07-10",
    readMinutes: 4,
    intro: [
      "Unlike the year-round mangoes in grocery stores, real Indian mangoes follow the Indian summer. In Canada, that means a short, glorious window — and if you miss it, you wait a year.",
    ],
    sections: [
      {
        heading: "The 2026 season at a glance",
        paragraphs: ["Timing shifts a little with each harvest, but the pattern holds:"],
        list: [
          "April — first Alphonso batches land; the earliest, most sought-after fruit",
          "May — Alphonso peaks; first Kesar batches arrive",
          "June — Kesar peaks; Alphonso winds down",
          "Early July — final Kesar batches; season closes",
        ],
      },
      {
        heading: "Why batches sell out",
        paragraphs: [
          "Air-freighted mangoes arrive in limited quantities — a batch is whatever ripened that week in Gujarat or Maharashtra, not whatever a warehouse has stockpiled. Importers like Keri In Windsor deliberately keep batches small so fruit is delivered within days of landing.",
          "In practice, that means each arrival is spoken for quickly — GTA delivery runs especially. Pre-ordering is less a marketing line than a survival strategy.",
        ],
      },
      {
        heading: "How to make sure you don't miss it",
        paragraphs: [
          "Place a pre-order any time — even off-season. You'll be first in line when the new season's batches are confirmed, and you pay nothing until your box is scheduled for delivery.",
        ],
      },
    ],
    faq: [
      {
        q: "Can you get Alphonso mangoes in Canada?",
        a: "Yes. Genuine Ratnagiri Alphonso mangoes are air-freighted to Canada from April to June. Keri In Windsor delivers them by the box across Windsor–Essex and on scheduled runs to London, Toronto and Brampton.",
      },
      {
        q: "What months are Indian mangoes available in Ontario?",
        a: "Roughly April through early July. Alphonso peaks April–June and Kesar peaks May–July, arriving in small batches every 2–3 weeks.",
      },
    ],
  },
  {
    slug: "indian-mango-delivery-ontario",
    title: "Indian Mango Delivery Across Ontario: Windsor to Toronto",
    metaTitle: "Indian Mango Delivery in Ontario — Windsor, London, Toronto, Brampton",
    description:
      "Keri In Windsor delivers premium Kesar and Alphonso mangoes across Ontario: free weekly delivery in Windsor–Essex, plus seasonal runs to London, Toronto and Brampton.",
    date: "2026-07-10",
    readMinutes: 3,
    intro: [
      "Great mangoes shouldn't depend on your postal code. Keri In Windsor started with doorstep delivery across Windsor–Essex — and now runs scheduled seasonal deliveries across Southwestern Ontario and the GTA.",
    ],
    sections: [
      {
        heading: "Where we deliver",
        paragraphs: ["Two kinds of delivery, one standard of fruit:"],
        list: [
          "Weekly free delivery: Windsor, LaSalle, Tecumseh, Belle River, Kingsville, Leamington and across Essex County",
          "Scheduled seasonal runs: London, Toronto, Brampton and the surrounding GTA",
        ],
      },
      {
        heading: "How out-of-town delivery works",
        paragraphs: [
          "Pre-order your boxes online — no payment is taken. When a batch lands in Canada, we group orders by region and contact you with a delivery date for your city. Fruit travels once, directly to you, instead of sitting in courier depots.",
          "GTA and London runs fill fastest, so early pre-orders get priority on the first batches of the season.",
        ],
      },
      {
        heading: "Why not just courier a box?",
        paragraphs: [
          "Mangoes bruise, and ripening fruit hates being thrown around. Grouped delivery runs let us hand your box over the way it left the orchard — nested, cushioned and ready to ripen on your counter, not battered in transit.",
        ],
      },
    ],
    faq: [
      {
        q: "Do you deliver Indian mangoes to Toronto or Brampton?",
        a: "Yes — pre-order online and your boxes are included in scheduled GTA delivery runs when each seasonal batch lands. You'll be contacted to confirm the delivery date.",
      },
      {
        q: "Is delivery free?",
        a: "Delivery is free across Windsor–Essex. For scheduled runs to London and the GTA, any delivery contribution is confirmed with you before your order is finalized — never charged online.",
      },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
