import Image from "next/image";
import { Reveal, RevealLines } from "@/components/motion";
import { crafts } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Craft() {
  return (
    <section aria-labelledby="craft-title" className="overflow-hidden py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-8 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="mb-6 text-xs font-semibold tracking-[0.25em] text-gold-ink uppercase">
              Jewellery &amp; craft · ጌጣጌጥ
            </p>
          </Reveal>
          <RevealLines
            id="craft-title"
            className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] font-medium"
            lines={[
              "Where it",
              <span key="b" className="text-primary italic">
                all began.
              </span>,
            ]}
          />
        </div>
        <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
          <p className="text-lg leading-relaxed text-espresso/80">
            Before the café there was the shop: handmade Ethiopian jewellery, woven mesob baskets,
            jebenas and spice. Browse a few pieces while your coffee roasts.
          </p>
        </Reveal>
      </div>

      {/* Horizontal gallery: native scroll + snap, keyboard-scrollable */}
      <Reveal className="mt-14">
        <ul
          tabIndex={0}
          aria-label="Jewellery and craft gallery, scroll sideways"
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:thin] sm:gap-6 sm:px-8 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]"
        >
          {crafts.map((c, i) => (
            <li key={c.src} className="group shrink-0 snap-start">
              <figure>
                <div
                  className={cn(
                    "relative overflow-hidden bg-cream-2",
                    i % 3 === 0 && "h-80 w-60 rounded-t-full rounded-b-3xl sm:h-[26rem] sm:w-72",
                    i % 3 === 1 && "mt-10 h-64 w-64 rounded-full sm:h-80 sm:w-80",
                    i % 3 === 2 && "h-80 w-56 rounded-3xl sm:h-[24rem] sm:w-64",
                  )}
                >
                  <Image
                    src={c.src}
                    alt={c.alt}
                    fill
                    sizes="320px"
                    className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                </div>
                <figcaption className="mt-3 text-sm font-medium text-espresso/75">
                  <span className="mr-2 text-gold-ink">{String(i + 1).padStart(2, "0")}</span>
                  {c.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}
