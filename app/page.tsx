import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { QuickMenu } from "@/components/quick-menu";
import { Dishes } from "@/components/dishes";
import { About } from "@/components/about";
import { Ceremony } from "@/components/ceremony";
import { Book } from "@/components/book";
import { Footer } from "@/components/footer";
import { hours, site } from "@/lib/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Restaurant",
  name: site.name,
  url: site.url,
  servesCuisine: ["Ethiopian", "Coffee"],
  priceRange: "$$",
  telephone: "+61 3 9529 1680",
  email: site.email,
  acceptsReservations: true,
  menu: `${site.url}${site.menuPdf}`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.suburb,
    addressRegion: site.address.state,
    postalCode: site.address.postcode,
    addressCountry: "AU",
  },
  openingHoursSpecification: hours
    .filter((h) => h.open)
    .map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.day,
      opens: h.open,
      closes: h.close,
    })),
  sameAs: [site.instagram.href, site.facebook.href],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Nav />
      <main id="main">
        <Hero />
        <QuickMenu />
        <Dishes />
        <About />
        <Ceremony />
        <Book />
      </main>
      <Footer />
    </>
  );
}
