import Image from "next/image";
import Link from "next/link";
import { dishes } from "@/lib/site";

/** Three signature plates. Coffee has its own section below, so it's left out here. */
const featured = dishes.filter((d) => d.name !== "Jebana Coffee").slice(0, 3);

export function Dishes() {
  return (
    <section id="menu" aria-labelledby="menu-title" className="py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 id="menu-title" className="font-display text-center text-4xl text-espresso sm:text-5xl">
          On the Table
        </h2>

        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => (
            <li
              key={d.name}
              className="flex flex-col rounded-[1.5rem] bg-white p-4 shadow-[0_12px_40px_-24px_rgba(29,31,46,.35)] ring-1 ring-espresso/5 sm:last:col-span-2 sm:last:mx-auto sm:last:w-1/2 lg:last:col-span-1 lg:last:w-auto"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-2">
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes="(min-width:1024px) 22rem, (min-width:640px) 45vw, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col px-1 pt-5 pb-2">
                <span className="w-fit -rotate-3 rounded bg-primary/25 px-2 py-0.5 text-xs font-semibold text-secondary">
                  {d.tags[0]}
                </span>
                <h3 className="font-display mt-2 text-[1.75rem] leading-tight text-espresso">
                  {d.name}
                </h3>
                <p className="mt-2 flex-1 text-[0.95rem] leading-relaxed text-espresso/75">
                  {d.description}
                </p>
                <p className="mt-4 text-sm font-semibold text-secondary">
                  {d.price}
                  {d.unit && <span className="font-normal text-muted"> {d.unit}</span>}
                  {d.note && <span className="font-normal text-muted"> · {d.note}</span>}
                </p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-10 text-center">
          <Link
            href="/menu"
            className="inline-flex h-11 items-center rounded-full bg-espresso px-6 text-sm font-semibold text-cream transition-colors hover:bg-espresso-3"
          >
            See the full menu
          </Link>
        </div>
      </div>
    </section>
  );
}
