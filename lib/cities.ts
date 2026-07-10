export interface City {
  slug: string;
  name: string;
  region: "windsor-essex" | "ontario";
  /** One-line delivery promise shown on the city page. */
  delivery: string;
  /** Short local flavour for unique page copy. */
  blurb: string;
}

export const cities: City[] = [
  {
    slug: "windsor",
    name: "Windsor",
    region: "windsor-essex",
    delivery: "Free doorstep delivery across Windsor every week of the season.",
    blurb:
      "Our home base. From Walkerville to South Windsor, most boxes reach your door within days of the batch landing.",
  },
  {
    slug: "lasalle",
    name: "LaSalle",
    region: "windsor-essex",
    delivery: "Free doorstep delivery in LaSalle on our weekly Windsor–Essex route.",
    blurb:
      "LaSalle is minutes from our Windsor hub — your mangoes arrive at peak ripeness, never sitting in a warehouse.",
  },
  {
    slug: "tecumseh",
    name: "Tecumseh",
    region: "windsor-essex",
    delivery: "Free doorstep delivery in Tecumseh on our weekly Windsor–Essex route.",
    blurb:
      "From Riverside to St. Clair Beach, Tecumseh families are some of our most loyal Kesar lovers.",
  },
  {
    slug: "belle-river",
    name: "Belle River",
    region: "windsor-essex",
    delivery: "Doorstep delivery in Belle River with every seasonal batch.",
    blurb:
      "Lakeshore's mango fans don't need to drive to Windsor — we bring the season to Belle River.",
  },
  {
    slug: "kingsville",
    name: "Kingsville",
    region: "windsor-essex",
    delivery: "Doorstep delivery to Kingsville with every seasonal batch.",
    blurb:
      "The greenhouse capital of Canada deserves the king of fruit — delivered ripe to your door.",
  },
  {
    slug: "leamington",
    name: "Leamington",
    region: "windsor-essex",
    delivery: "Doorstep delivery to Leamington with every seasonal batch.",
    blurb:
      "We run Leamington drops alongside Kingsville on our Essex County route each batch.",
  },
  {
    slug: "london",
    name: "London",
    region: "ontario",
    delivery: "Scheduled delivery runs to London, Ontario when each batch lands.",
    blurb:
      "Pre-order and we'll coordinate a delivery date for London the week your mangoes arrive in Canada.",
  },
  {
    slug: "toronto",
    name: "Toronto",
    region: "ontario",
    delivery: "Scheduled seasonal delivery runs to the Greater Toronto Area.",
    blurb:
      "GTA orders are grouped into delivery runs so your Alphonso and Kesar boxes arrive fresh, not couriered and bruised.",
  },
  {
    slug: "brampton",
    name: "Brampton",
    region: "ontario",
    delivery: "Scheduled seasonal delivery runs to Brampton and Mississauga.",
    blurb:
      "Brampton knows real Indian mangoes. Pre-order early — GTA batches are the first to sell out.",
  },
];

export function getCity(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug);
}
