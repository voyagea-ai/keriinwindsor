import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProduct, products } from "@/lib/products";
import ProductDetail from "@/components/products/ProductDetail";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: { images: [product.image] },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = product.related
    .map((id) => getProduct(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Product",
          name: product.name,
          description: product.description,
          image: `${site.domain}${product.image}`,
          brand: { "@type": "Brand", name: site.name },
          offers: {
            "@type": "Offer",
            url: `${site.domain}/products/${product.slug}`,
            price: product.priceCad,
            priceCurrency: "CAD",
            availability:
              product.status === "preorder"
                ? "https://schema.org/PreOrder"
                : "https://schema.org/PreSale",
            areaServed: "Ontario, Canada",
          },
        }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
