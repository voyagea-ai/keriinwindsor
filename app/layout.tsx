import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import SmoothScroll from "@/components/SmoothScroll";
import CartProvider from "@/components/cart/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";
import { cities } from "@/lib/cities";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://keriinwindsor.ca"),
  title: {
    default: "Keri In Windsor — Buy Fresh Indian Mangoes in Windsor, Ontario",
    template: "%s — Keri In Windsor",
  },
  description:
    "Buy premium Indian mangoes in Windsor, Ontario — Kesar & Alphonso boxes delivered to your door across Windsor–Essex, London, Toronto & Brampton. Limited seasonal batches.",
  keywords: [
    "Indian mangoes Windsor",
    "buy mangoes Windsor Ontario",
    "Alphonso mangoes Canada",
    "Kesar mangoes Ontario",
    "mango delivery Windsor",
    "Indian mangoes Toronto",
    "Indian mangoes Brampton",
    "mango delivery Ontario",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Keri In Windsor — Windsor's Mango Season Starts Here",
    description:
      "Fresh Indian mangoes in premium limited seasonal batches, delivered across Windsor–Essex and Ontario.",
    images: ["/images/hero.jpg"],
    locale: "en_CA",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#071009",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fraunces.variable} ${manrope.variable} ${plexMono.variable} h-full antialiased`}
    >
      <body className="grain flex min-h-full flex-col">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: site.name,
            url: site.domain,
            image: `${site.domain}/images/hero.jpg`,
            description:
              "Premium Indian mangoes — Kesar and Alphonso — imported in limited seasonal batches and delivered across Windsor–Essex and Ontario.",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Windsor",
              addressRegion: "ON",
              addressCountry: "CA",
            },
            areaServed: cities.map((c) => ({ "@type": "City", name: `${c.name}, Ontario` })),
            sameAs: [site.instagramUrl],
            priceRange: "$",
          }}
        />
        <CartProvider>
          <SmoothScroll />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  );
}
