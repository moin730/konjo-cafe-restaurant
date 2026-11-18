import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Yellowtail } from "next/font/google";
import { Download } from "lucide-react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { featured, glossary, howToEat, sections, type Featured, type MenuItem, type Tag } from "@/lib/menu";
import { hoursSummary, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const script = Yellowtail({ subsets: ["latin"], weight: "400", display: "swap" });

export const metadata: Metadata = {
  title: "Menu · Konjo Cafe & Restaurant",
  description:
    "Ethiopian breakfasts, vegan and halal mains, shared platters on injera and jebana coffee at Konjo, 89 Irving St, Footscray.",
  alternates: { canonical: "/menu" },
};

/** Alternating accents per featured row, all from the Konjo palette. */
const accents = [
  { ring: "ring-espresso", border: "border-primary", name: "text-secondary" },
  { ring: "ring-primary", border: "border-espresso", name: "text-espresso" },
  { ring: "ring-secondary", border: "border-primary", name: "text-secondary" },
  { ring: "ring-espresso", border: "border-secondary", name: "text-espresso" },
];

const tagStyle: Partial<Record<Tag, string>> = {
  Vegan: "bg-secondary/10 text-secondary",
  "Vegetarian or vegan": "bg-secondary/10 text-secondary",
  Vegetarian: "bg-secondary/10 text-secondary",
  "Most popular": "bg-primary text-espresso",
  "National dish": "bg-primary text-espresso",
  Recommended: "bg-primary/30 text-espresso",
  New: "bg-espresso text-cream",
};

/** Words that curve over the top of a round photo. */
function CurvedLabel({ text, id }: { text: string; id: string }) {
  return (
    <svg
      viewBox="0 0 200 200"
      aria-hidden
      className="pointer-events-none absolute inset-0 size-full overflow-visible"
    >
      <defs>
        {/* Arc just outside the photo, from upper-left to upper-right */}
        <path id={id} d="M -10.9 59.6 A 118 118 0 0 1 210.9 59.6" />
      </defs>
      <text className="fill-espresso text-[11px] font-semibold tracking-[0.06em]">
        <textPath href={`#${id}`} startOffset="50%" textAnchor="middle">
          {text}
        </textPath>
      </text>
    </svg>
  );
}

/** Starburst sticker like a price-tag stamp. */
function Sticker({ label, className }: { label: string; className?: string }) {
  const pts = Array.from({ length: 24 }, (_, i) => {
    const r = i % 2 ? 41 : 50;
    const a = (i / 24) * Math.PI * 2;
    return `${(50 + Math.cos(a) * r).toFixed(1)},${(50 + Math.sin(a) * r).toFixed(1)}`;
  }).join(" ");
  return (
    <div className={cn("absolute size-24 -rotate-12 drop-shadow-md", className)}>
      <svg viewBox="0 0 100 100" aria-hidden className="size-full">
        <polygon points={pts} fill="var(--primary)" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-[0.65rem] leading-tight font-extrabold tracking-wide text-espresso uppercase">
        {label}
      </span>
    </div>
  );
}

function FeaturedRow({ dish, index }: { dish: Featured; index: number }) {
  const flip = index % 2 === 1;
  const a = accents[index % accents.length];

  return (
    <li
      className={cn(
        "flex flex-col items-center gap-6 md:gap-0",
        flip ? "md:flex-row-reverse md:pl-10" : "md:flex-row md:pr-10",
      )}
    >
      <div className="relative z-10 size-52 shrink-0 sm:size-56">
        <div
          className={cn(
            "relative size-full overflow-hidden rounded-full border-4 border-white shadow-xl ring-[10px]",
            a.ring,
          )}
        >
          <Image src={dish.image.src} alt={dish.image.alt} fill sizes="14rem" className="object-cover" />
        </div>
        <CurvedLabel text={dish.flavours} id={`curve-${index}`} />
        {dish.sticker && (
          <Sticker label={dish.sticker} className={flip ? "-bottom-4 -left-6" : "-right-6 -bottom-4"} />
        )}
      </div>

      <div className={cn("w-full md:flex-1", flip ? "md:-mr-16" : "md:-ml-16")}>
        <div
          className={cn(
            "rounded-[2rem] border-2 px-6 py-6 text-center md:rounded-[3rem] md:py-7 md:text-left",
            a.border,
            flip ? "md:pr-24 md:pl-10" : "md:pr-10 md:pl-24",
          )}
        >
          <h3 className={cn("font-display text-3xl tracking-wide uppercase sm:text-4xl", a.name)}>
            {dish.name}
          </h3>
          <p lang="am" className="ethiopic mt-1 text-sm text-espresso/60">
            {dish.amharic}
          </p>
          <p className="mx-auto mt-3 max-w-md text-xs leading-relaxed font-semibold tracking-wide text-espresso/80 uppercase md:mx-0">
            {dish.description}
          </p>
        </div>
        <p
          className={cn(
            "mt-3 flex items-baseline justify-center gap-2 md:justify-start",
            flip ? "md:pr-24 md:pl-10" : "md:pl-24",
          )}
        >
          <span className="font-display text-3xl text-espresso">{dish.price}</span>
          {dish.unit && (
            <span className="text-xs font-semibold tracking-wide text-muted uppercase">{dish.unit}</span>
          )}
        </p>
      </div>
    </li>
  );
}

function Item({ item }: { item: MenuItem }) {
  return (
    <li className="py-3">
      <div className="flex items-baseline gap-3">
        <h4 className="font-semibold text-espresso">{item.name}</h4>
        <span aria-hidden className="mb-1 min-w-6 flex-1 border-b-2 border-dotted border-espresso/20" />
        <span className="font-display text-xl whitespace-nowrap text-espresso">{item.price}</span>
      </div>
      {(item.description || item.unit) && (
        <p className="mt-1 pr-14 text-sm leading-relaxed text-espresso/70">
          {item.unit && <span className="font-semibold text-espresso/80">{item.unit}. </span>}
          {item.description}
        </p>
      )}
      {item.tags && (
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tags">
          {item.tags.map((t) => (
            <li
              key={t}
              className={cn(
                "rounded-full px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide uppercase",
                tagStyle[t] ?? "bg-espresso/10 text-espresso",
              )}
            >
              {t}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

export default function MenuPage() {
  return (
    <>
      <Nav />
      <main id="main">
        <section id="top" className="bg-primary px-3 pb-4 sm:px-4 sm:pb-5">
          <div className="mx-auto max-w-5xl rounded-[2rem] bg-cream-2 px-5 pt-12 pb-14 sm:px-10 sm:pt-16 lg:px-16">
            {/* Title */}
            <h1 className="relative text-center">
              <span className="font-display block text-[clamp(5.5rem,22vw,13rem)] leading-[0.85] tracking-wide text-espresso">
                MENU
              </span>
              <span
                className={cn(
                  script.className,
                  "relative -mt-[0.35em] block -rotate-3 text-[clamp(3.25rem,11vw,6.5rem)] leading-none text-primary-hover [text-shadow:0_2px_0_var(--cream-2)]",
                )}
              >
                Ethiopian
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-md text-center text-sm font-semibold tracking-[0.15em] text-espresso/70 uppercase">
              At Konjo, we don&apos;t just serve food, we are passionate about it.
            </p>

            {/* Jump links */}
            <nav aria-label="Menu sections" className="mt-8 flex flex-wrap justify-center gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-espresso ring-1 ring-espresso/10 transition-colors hover:bg-primary"
                >
                  {s.title}
                </a>
              ))}
            </nav>

            {/* Signature dishes */}
            <h2 className="sr-only">Signature dishes</h2>
            <ol className="mt-20 space-y-16 md:space-y-12">
              {featured.map((d, i) => (
                <FeaturedRow key={d.name} dish={d} index={i} />
              ))}
            </ol>

            {/* Full menu */}
            <div className="mt-24 space-y-8">
              {sections.map((s, si) => (
                <section
                  key={s.id}
                  id={s.id}
                  aria-labelledby={`${s.id}-title`}
                  className={cn(
                    "scroll-mt-6 rounded-[2rem] border-2 bg-cream-2 p-6 sm:p-10",
                    si % 2 ? "border-espresso" : "border-primary",
                  )}
                >
                  <div className="flex flex-wrap items-end gap-x-4">
                    <h2
                      id={`${s.id}-title`}
                      className="font-display text-5xl tracking-wide text-espresso uppercase sm:text-6xl"
                    >
                      {s.title}
                    </h2>
                    <span
                      className={cn(script.className, "-rotate-3 pb-1 text-4xl text-primary-hover sm:text-5xl")}
                    >
                      {s.script}
                    </span>
                  </div>
                  {s.note && <p className="mt-3 max-w-2xl text-sm text-espresso/70">{s.note}</p>}

                  <div className={cn("mt-6 grid gap-x-12 gap-y-6", s.groups.length > 1 && "lg:grid-cols-2")}>
                    {s.groups.map((g, gi) => (
                      <div key={g.title ?? gi}>
                        {g.title && (
                          <h3 className="mb-1 border-b-2 border-espresso pb-2 text-xs font-bold tracking-[0.2em] text-secondary uppercase">
                            {g.title}
                          </h3>
                        )}
                        <ul
                          className={cn(
                            "divide-y divide-espresso/10",
                            s.groups.length === 1 && g.items.length > 4 && "md:columns-2 md:gap-12 md:divide-y-0 [&>li]:break-inside-avoid",
                          )}
                        >
                          {g.items.map((it) => (
                            <Item key={it.name} item={it} />
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>

            {/* Glossary + how to eat */}
            <div className="mt-8 grid gap-8 lg:grid-cols-2">
              <section aria-labelledby="glossary-title" className="rounded-[2rem] bg-espresso p-6 text-cream sm:p-10">
                <h2 id="glossary-title" className="font-display text-4xl tracking-wide uppercase">
                  Glossary
                </h2>
                <dl className="mt-5 space-y-4">
                  {glossary.map((g) => (
                    <div key={g.term}>
                      <dt className="font-display text-xl text-primary">{g.term}</dt>
                      <dd className="text-sm leading-relaxed text-cream/80">{g.def}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section aria-labelledby="eat-title" className="rounded-[2rem] bg-primary p-6 text-espresso sm:p-10">
                <h2 id="eat-title" className="font-display text-4xl leading-none tracking-wide uppercase">
                  The Art of Eating{" "}
                  <span className={cn(script.className, "block -rotate-3 pt-2 text-5xl normal-case text-cream")}>
                    Ethiopian
                  </span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-espresso/85">
                  You share from a communal tray, and everyone eats with their hands.
                </p>
                <ol className="mt-5 space-y-3">
                  {howToEat.map((step, i) => (
                    <li key={step} className="flex gap-3">
                      <span className="font-display flex size-9 shrink-0 items-center justify-center rounded-full bg-espresso text-lg text-primary">
                        {i + 1}
                      </span>
                      <span className="pt-1.5 text-sm font-medium">{step}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-6 rounded-2xl bg-cream/90 p-5">
                  <h3 className="font-display text-2xl tracking-wide uppercase">Gursha</h3>
                  <p className="mt-1 text-sm leading-relaxed text-espresso/80">
                    Don&apos;t be alarmed if your host feeds you the tastiest morsel by hand. It&apos;s
                    called gursha, a mark of great friendship, and it&apos;s usually given at least
                    twice (once is considered unlucky). Refusing it is a terrible slight!
                  </p>
                </div>
              </section>
            </div>

            {/* Footnote */}
            <div className="mt-16 flex flex-col items-center gap-6 border-t-2 border-dashed border-espresso/15 pt-10 text-center">
              <p className="max-w-lg text-sm text-espresso/75">
                Please let us know about any allergies or dietary needs. Ask our team about
                today&apos;s specials.
              </p>
              <dl className="flex flex-wrap justify-center gap-x-6 gap-y-1 text-sm">
                {hoursSummary.map((h) => (
                  <div key={h.label} className="flex gap-2">
                    <dt className="text-muted">{h.label}</dt>
                    <dd className="font-semibold text-espresso">{h.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href="/#book"
                  className="inline-flex h-11 items-center rounded-full bg-primary px-6 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                >
                  Book a table
                </Link>
                <a
                  href={site.menuPdf}
                  download
                  className="inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold text-espresso ring-1 ring-espresso/25 transition-colors hover:bg-espresso/5"
                >
                  <Download aria-hidden className="size-4" /> Download PDF
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
