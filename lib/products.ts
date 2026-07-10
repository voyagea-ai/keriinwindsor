export type ProductId = "kesar-box" | "alphonso-box" | "mango-pulp";

export interface Product {
  id: ProductId;
  slug: ProductId;
  name: string;
  shortName: string;
  unit: string;
  tagline: string;
  priceCad: number;
  priceLabel: string;
  status: "preorder" | "coming-soon";
  badge?: string;
  image: string;
  /** "contain" for transparent packshots that float on a dark glow panel. */
  imageFit?: "contain";
  gallery: string[];
  features: string[];
  description: string;
  origin: { region: string; note: string };
  included: string[];
  storage: string[];
  delivery: string[];
  availability: string;
  related: ProductId[];
}

export const products: Product[] = [
  {
    id: "kesar-box",
    slug: "kesar-box",
    name: "Kesar Mango Box",
    shortName: "Kesar Box",
    unit: "12 Premium Mangoes",
    tagline: "The Queen of Mangoes — honey-sweet with a warmth of saffron.",
    priceCad: 45,
    priceLabel: "$45 CAD",
    status: "preorder",
    image: "/images/product-kesar.jpg",
    gallery: [
      "/images/product-kesar.jpg",
      "/images/scene-closeup.jpg",
      "/images/scene-packing.jpg",
    ],
    features: [
      "12 Handpicked Premium Kesar Mangoes",
      "Directly Imported from India",
      "Naturally Sweet & Juicy",
      "Limited Seasonal Availability",
    ],
    description:
      "Grown in the red soil of the Gir foothills, Kesar is prized across India for its saffron-hued flesh and honeyed fragrance. Each box carries twelve hand-selected mangoes, graded for size and ripeness, packed the premium way — nested, breathable, and ready to ripen on your counter.",
    origin: {
      region: "Gir–Talala, Gujarat, India",
      note: "GI-tagged growing region famed for saffron-coloured pulp and intense natural aroma.",
    },
    included: [
      "12 premium Kesar mangoes (approx. 2.5–3 kg)",
      "Keri In Windsor rigid gift box with protective nesting",
      "Ripening guide card",
    ],
    storage: [
      "Keep at room temperature until aromatic and slightly soft to the touch.",
      "Never refrigerate unripe mangoes — cold stops the ripening.",
      "Once ripe, refrigerate up to 4–5 days for a chilled, dessert-like bite.",
    ],
    delivery: [
      "Local delivery across Windsor & Essex County.",
      "We contact you to schedule a delivery window once your batch lands.",
      "Pay on confirmation — no online payment required today.",
    ],
    availability: "Season runs May–July. Batches land every 2–3 weeks and sell out fast.",
    related: ["alphonso-box", "mango-pulp"],
  },
  {
    id: "alphonso-box",
    slug: "alphonso-box",
    name: "Alphonso Mango Box",
    shortName: "Alphonso Box",
    unit: "12 Premium Mangoes",
    tagline: "The King of Mangoes — rich, creamy, unforgettable.",
    priceCad: 50,
    priceLabel: "$50 CAD",
    status: "preorder",
    image: "/images/product-alphonso.jpg",
    gallery: [
      "/images/product-alphonso.jpg",
      "/images/scene-slice.jpg",
      "/images/scene-orchard.jpg",
    ],
    features: [
      "12 Premium Alphonso Mangoes",
      "Ratnagiri Origin",
      "Rich Aroma & Exceptional Sweetness",
      "Limited Seasonal Availability",
    ],
    description:
      "From the laterite cliffs of Ratnagiri comes the mango every other mango is measured against. Alphonso — Hapus to those who grew up on it — is dense, fibreless, and almost custard-like, with an aroma that fills the room before the box is fully open.",
    origin: {
      region: "Ratnagiri, Maharashtra, India",
      note: "The coastal belt whose Alphonso holds a GI tag and a global reputation.",
    },
    included: [
      "12 premium Alphonso mangoes (approx. 2.5–3 kg)",
      "Keri In Windsor rigid gift box with protective nesting",
      "Ripening guide card",
    ],
    storage: [
      "Ripen at room temperature, ideally wrapped in paper or in hay.",
      "Ready when the skin turns deep gold and yields gently at the stem.",
      "Refrigerate only once fully ripe; best enjoyed within 4 days.",
    ],
    delivery: [
      "Local delivery across Windsor & Essex County.",
      "We contact you to schedule a delivery window once your batch lands.",
      "Pay on confirmation — no online payment required today.",
    ],
    availability: "Peak season April–June. The most requested box — reserve early.",
    related: ["kesar-box", "mango-pulp"],
  },
  {
    id: "mango-pulp",
    slug: "mango-pulp",
    name: "Mango Pulp",
    shortName: "Mango Pulp",
    unit: "850g Can",
    tagline: "Season in a can — silky, rich, ready to pour.",
    priceCad: 4.99,
    priceLabel: "$4.99 CAD",
    status: "coming-soon",
    badge: "Launching Soon",
    image: "/images/product-pulp.png",
    imageFit: "contain",
    gallery: ["/images/product-pulp.png"],
    features: [
      "Made from Premium Indian Mangoes",
      "Rich Flavour, Smooth Texture",
      "850g Can",
      "Perfect for Lassi, Shakes & Desserts",
    ],
    description:
      "Made using premium Indian mangoes with rich flavour and smooth texture. Perfect for milkshakes, desserts, smoothies, ice cream, mango lassi, and more — mango season, long after the season ends.",
    origin: {
      region: "Gujarat & Maharashtra, India",
      note: "Pressed from the same premium varieties we deliver fresh.",
    },
    included: ["1 × 850g can of premium mango pulp"],
    storage: [
      "Store unopened in a cool, dry place.",
      "Once opened, refrigerate in a sealed container and use within 5 days.",
    ],
    delivery: [
      "Will ship alongside mango box deliveries across Windsor.",
      "Join the notify list and we'll message you the moment it lands.",
    ],
    availability: "Launching soon — join the list to be notified first.",
    related: ["kesar-box", "alphonso-box"],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export const orderableProducts = products.filter((p) => p.status === "preorder");

export function formatCad(amount: number): string {
  return `$${amount % 1 === 0 ? amount : amount.toFixed(2)} CAD`;
}
