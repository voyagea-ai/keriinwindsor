import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Manrope } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CartProvider from "@/components/cart/CartContext";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

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
  metadataBase: new URL("https://keriinwindsor.com"),
  title: {
    default: "Keri In Windsor — Windsor's Mango Season Starts Here",
    template: "%s — Keri In Windsor",
  },
  description:
    "Fresh Indian mangoes — Kesar, Alphonso & more — premium quality, limited seasonal batches, delivered with love across Windsor and nearby areas.",
  openGraph: {
    title: "Keri In Windsor — Windsor's Mango Season Starts Here",
    description:
      "Fresh Indian mangoes in premium limited seasonal batches, delivered across Windsor and nearby areas.",
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
        <CartProvider>
          <SmoothScroll />
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
