import { Star } from "lucide-react";
import { RevealLines } from "@/components/motion";
import { reviews } from "@/lib/site";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          aria-hidden
          className={i < n ? "size-4 fill-accent text-accent" : "size-4 text-espresso/20"}
        />
      ))}
    </div>
  );
}

export function Reviews() {
  const card = (r: (typeof reviews)[number], i: number, hidden: boolean) => (
    <li
      key={`${hidden}-${i}`}
      aria-hidden={hidden || undefined}
      className="w-[min(85vw,26rem)] shrink-0 px-3"
    >
      <figure className="flex h-full flex-col justify-between rounded-[1.75rem] bg-cream p-7 shadow-[0_20px_50px_-30px_rgba(34,21,15,.5)] ring-1 ring-espresso/10">
        <div>
          <Stars n={r.rating} />
          <blockquote className="font-display mt-5 text-xl leading-snug sm:text-[1.4rem]">
            &ldquo;{r.quote}&rdquo;
          </blockquote>
        </div>
        <figcaption className="mt-8 flex items-center justify-between text-sm">
          <span className="font-semibold">{r.name}</span>
          <span className="rounded-full bg-cream-2 px-3 py-1 text-xs text-muted">{r.source}</span>
        </figcaption>
      </figure>
    </li>
  );

  return (
    <section
      aria-labelledby="reviews-title"
      className="mesob-texture relative overflow-hidden bg-cream-2/70 py-24 sm:py-32"
    >
      <div className="mx-auto mb-14 flex max-w-7xl flex-wrap items-end justify-between gap-6 px-4 sm:px-8">
        <RevealLines
          id="reviews-title"
          className="font-display text-[clamp(2.4rem,5.5vw,4.5rem)] leading-[0.95] font-medium"
          lines={[
            "Kind words from",
            <span key="b" className="text-primary italic">
              our table.
            </span>,
          ]}
        />
        <div className="flex items-center gap-3">
          <Stars n={5} />
          <span className="text-sm text-muted">Hover or focus to pause</span>
        </div>
      </div>

      <div className="marquee-pause relative motion-reduce:overflow-x-auto">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-cream-2 to-transparent sm:w-40"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-cream-2 to-transparent sm:w-40"
        />
        <ul className="marquee-track animate-marquee-slow flex w-max py-4" tabIndex={0} aria-label="Guest reviews">
          {reviews.map((r, i) => card(r, i, false))}
          {reviews.map((r, i) => card(r, i, true))}
        </ul>
      </div>
    </section>
  );
}
